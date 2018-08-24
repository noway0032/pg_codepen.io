var localsript = "uniform vec2 u_resolution; uniform vec2 u_mouse; uniform float u_time; uniform sampler2D u_noise; uniform sampler2D u_buffer; uniform bool u_renderpass; uniform int u_frame; #define PI 3.141592653589793 #define TAU 6.283185307179586 const float adder = 0.5; const float movementThreshold = .3; const float distanceThreshold = 4.; vec2 hash2(vec2 p) { vec2 n = p; return vec2(fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453), fract(sin(dot(n, vec2(52.9898, -3.1414))) * 43758.5453)); vec2 o = texture2D( u_noise, (p+0.5)/256.0, -100.0 ).xy; return o; } #define pow2(x) (x * x) const int samples = 8; const float sigma = float(samples) * 0.25; float gaussian(vec2 i) { return 1.0 / (2.0 * PI * pow2(sigma)) * exp(-((pow2(i.x) + pow2(i.y)) / (2.0 * pow2(sigma)))); } vec3 hash33(vec3 p){ float n = sin(dot(p, vec3(7, 157, 113)));  return fract(vec3(2097152, 262144, 32768)*n);  } vec3 blur(sampler2D sp, vec2 uv, vec2 scale) { vec3 col = vec3(0.0); float accum = 0.0; float weight; vec2 offset; for (int x = -samples / 2; x < samples / 2; ++x) { for (int y = -samples / 2; y < samples / 2; ++y) { offset = vec2(x, y); weight = gaussian(offset); col += texture2D(sp, uv + scale * offset).rgb * weight; accum += weight; } } return col / accum; } vec3 hsb2rgb( in vec3 c ){ vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0), 6.0)-3.0)-1.0, 0.0, 1.0 ); rgb = rgb*rgb*(3.0-2.0*rgb); return c.z * mix( vec3(1.0), rgb, c.y); } vec3 domain(vec2 z){ return vec3(hsb2rgb(vec3(atan(z.y,z.x)/TAU,1.,1.))); } vec3 colour(vec2 z) { return domain(z); } void main() { vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x); vec2 sample = gl_FragCoord.xy / u_resolution.xy; vec2 texStep = 1. / u_resolution.xy; vec2 mouse = u_mouse.xy - uv; float shade = smoothstep(.1, .15, length(mouse)); vec4 fragcolour = vec4(shade); if(u_renderpass == true) { fragcolour = texture2D(u_buffer, sample); vec2 hash = hash2(uv*512.); if(u_frame < 2) { fragcolour = vec4(hash.x >= .999, hash.y, 0., 0.); } else { vec4 t = texture2D(u_buffer, sample + (vec2(0., 1.) * texStep)); vec4 r = texture2D(u_buffer, sample + (vec2(1., 0.) * texStep)); vec4 b = texture2D(u_buffer, sample + (vec2(0., -1.) * texStep)); vec4 l = texture2D(u_buffer, sample + (vec2(-1., 0.) * texStep)); if(fragcolour.x < 1.) { if(t.x >= movementThreshold && t.y < 0.25) { fragcolour.x += adder; b = texture2D(u_buffer, sample + vec2(0., -distanceThreshold) * texStep); if(b.x >= 0.2) { fragcolour.y = 0.25; } else { fragcolour.y = 0.; } fragcolour.z = 0.; } else if(r.x >= movementThreshold && floor(r.y * 4.) == 1.) { fragcolour.x += adder; l = texture2D(u_buffer, sample + vec2(-distanceThreshold, 0.) * texStep); if(l.x >= 0.2) { fragcolour.y = 0.51; } else { fragcolour.y = 0.26; } fragcolour.z = 0.25; } else if(b.x >= movementThreshold && floor(b.y * 4.) == 2.) { fragcolour.x += adder; t = texture2D(u_buffer, sample + vec2(0., distanceThreshold) * texStep); if(t.x >= 0.2) { fragcolour.y = .76; } else { fragcolour.y = 0.51; } fragcolour.z = .5; } else if(l.x >= movementThreshold && floor(l.y * 4.) == 3.) { fragcolour.x += adder; r = texture2D(u_buffer, sample + vec2(distanceThreshold, 0.) * texStep); if(r.x >= 0.2) { fragcolour.y = 0.; } else { fragcolour.y = 0.76; } fragcolour.z = 0.75; } } } } else { vec4 _fragcolour = texture2D(u_buffer, sample); fragcolour = vec4(_fragcolour.x); } gl_FragColor = fragcolour; }";
let container;
let camera, scene, renderer;
let uniforms;
let divisor = 1 / 8;
let textureFraction = 1 * window.devicePixelRatio;
let newmouse = {
  x: 0,
  y: 0
};
let loader=new THREE.TextureLoader();
let texture, rtTexture, rtTexture2;
loader.setCrossOrigin("anonymous");
loader.load(
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/982762/noise.png',
  function do_something_with_texture(tex) {
    texture = tex;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearFilter;
    init();
    animate();
  }
);
function init() {
  container = document.getElementById( 'container' );
  camera = new THREE.Camera();
  camera.position.z = 1;
  scene = new THREE.Scene();
  var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
  rtTexture = new THREE.WebGLRenderTarget(window.innerWidth * textureFraction, window.innerHeight * textureFraction);
  rtTexture2 = new THREE.WebGLRenderTarget(window.innerWidth * textureFraction, window.innerHeight * textureFraction);
  uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_noise: { type: "t", value: texture },
    u_buffer: { type: "t", value: rtTexture.texture },
    u_mouse: { type: "v3", value: new THREE.Vector3() },
    u_frame: { type: "i", value: -1. },
    u_renderpass: { type: 'b', value: false }
  };
  var material = new THREE.ShaderMaterial( {
    uniforms: uniforms,
    vertexShader: "void main(){gl_Position=vec4(position,1.0);}",
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent
  } );
  material.extensions.derivatives = true;
  var mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  container.appendChild( renderer.domElement );
  onWindowResize();
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener('pointermove', (e)=> {
    let ratio = window.innerHeight / window.innerWidth;
    if(window.innerHeight > window.innerWidth) {
      newmouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth;
      newmouse.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1 * ratio;
    } else {
      newmouse.x = (e.pageX - window.innerWidth / 2) / window.innerWidth / ratio;
      newmouse.y = (e.pageY - window.innerHeight / 2) / window.innerHeight * -1;
    }
    document.addEventListener('pointerdown', ()=> {
      uniforms.u_mouse.value.z = 1;
      console.log();
    });
    document.addEventListener('pointerup', ()=> {
      uniforms.u_mouse.value.z = 0;
    });
    e.preventDefault();
  });
}
function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
  uniforms.u_resolution.value.x = renderer.domElement.width;
  uniforms.u_resolution.value.y = renderer.domElement.height;
  uniforms.u_frame.value = 0;
  rtTexture = new THREE.WebGLRenderTarget(
    window.innerWidth * textureFraction,
    window.innerHeight * textureFraction);
  rtTexture2 = new THREE.WebGLRenderTarget(
    window.innerWidth * textureFraction,
    window.innerHeight * textureFraction);
}
function animate(delta) {
  requestAnimationFrame( animate );
  render(delta);
}
let capturer = new CCapture( { 
  verbose: true, 
  framerate: 60,
  quality: 90,
  format: 'webm',
  workersPath: 'js/'
 } );
let capturing = false;
isCapturing = function(val) {
  if(val === false && window.capturing === true) {
    capturer.stop();
    capturer.save();
  } else if(val === true && window.capturing === false) {
    capturer.start();
  }
  capturing = val;
}
toggleCapture = function() {
  isCapturing(!capturing);
}
window.addEventListener('keyup', function(e) { if(e.keyCode == 68) toggleCapture(); });
let then = 0;
function renderTexture(delta) {
  let odims = uniforms.u_resolution.value.clone();
  uniforms.u_buffer.value = rtTexture2.texture;
  uniforms.u_renderpass.value = true;
  window.rtTexture = rtTexture;
  renderer.setRenderTarget(rtTexture);
  renderer.render( scene, camera, rtTexture, true );
  let buffer = rtTexture
  rtTexture = rtTexture2;
  rtTexture2 = buffer;
  uniforms.u_buffer.value = rtTexture.texture;
  uniforms.u_resolution.value = odims;
  uniforms.u_renderpass.value = false;
}
function render(delta) {
  uniforms.u_frame.value++;
  uniforms.u_mouse.value.x += ( newmouse.x - uniforms.u_mouse.value.x ) * divisor;
  uniforms.u_mouse.value.y += ( newmouse.y - uniforms.u_mouse.value.y ) * divisor;
  uniforms.u_time.value = delta * 0.0005;
  renderer.render( scene, camera );
  renderTexture();
  if(capturing) {
    capturer.capture( renderer.domElement );
  }
}