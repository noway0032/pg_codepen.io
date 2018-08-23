const wrapperEl = document.querySelector('.ring');
const numberOfEls = 180;
const duration = 5000;
const delay = duration / numberOfEls;
let tl = anime.timeline({
  duration: delay,
  complete: function() {
    tl.restart();
  }
});
function createEl(i) {
  let el = document.createElement('div');
  const rotate = (360 / numberOfEls) * i;
  const translateY = -290;
  const hue = Math.round(360 / numberOfEls * i);
  el.classList.add('el');
  el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
  el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
  tl.add({
    begin: function() {
      anime({
        targets: el,
        backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
        rotate: [rotate + 'deg', rotate + 5 +'deg'],
        translateY: [translateY + '%', translateY + 10 + '%'],
        scale: [1, 1.25],
        easing: 'easeInOutSine',
        direction: 'alternate',
        duration: duration * .06
      });
    }
  });
  wrapperEl.appendChild(el);
};
for (let i = 0; i < numberOfEls; i++)
  createEl(i);