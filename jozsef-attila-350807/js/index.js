setTimeout(function(){

  var tl = new TimelineMax({
    repeatDelay: .5,
    repeat: -1,
    yoyo: true
  });

  var wave = new TimelineMax();
  wave.staggerFrom('.wave tspan', 1, {
    fontSize: '70px',
    ease: 'Power3.easeInOut'
  }, 0.1)

  
  var small = new TimelineLite();
  small.from('.small', 1, {
    scaleY: 1.6,
    scaleX: 1.4,
    xPercent: -20,
    yPercent: -20,
    ease: 'Power3.easeInOut',
  });
  
  var underline = new TimelineLite();
  underline.from('.underline', 1, {
    scaleX: 0,
    ease: 'Power3.easeInOut'
  }, 0.5);


  
  var verticalMirroring = new TimelineLite();
  verticalMirroring.fromTo('.verticalMirroring', 1, {
    scaleX: 1,
  }, {
    scaleX: -1,
    xPercent: 100,
    ease: 'Power3.easeInOut'
  });
  
  var rr10 = new TimelineLite();
  rr10.fromTo('.rr10', 1, {
    rotation: 0,
  }, {
    rotation: 10,
    xPercent: -5,
    ease: 'Power3.easeInOut'
  }, 0);



  var pressure = new TimelineLite();
  pressure.from('.pressure', 1, {
    scaleX: 1.35,
    x: 3,
    ease: 'Power3.easeInOut'
  });
  
  var offer = new TimelineLite();
  offer.from('.offer', 1, {
    scaleX: 0.2,
    transformOrigin: 'right center',
    ease: 'Power3.easeInOut'
  }, 0);

  tl.add([wave, small, underline, verticalMirroring, rr10, pressure, offer], 0, 'start', 0.5);

}, 100);