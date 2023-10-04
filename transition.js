const $img2 = document.querySelector('.image2');
const $logo = document.querySelector('.transition__logo');
const $frameBlack = document.querySelector('.page-transition__black');
const $frameRed = document.querySelector('.page-transition__red');
const $button = document.querySelector('#transition');

let tltransition = new TimelineMax({paused:true})
  .fromTo($frameRed , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},)
  .fromTo($frameBlack , 2.2, {scaleX: 0},{scaleX: 1, transformOrigin:'left', ease: Power4.easeInOut},.2)
  .fromTo($logo , 1.6, {xPercent: -100, autoAlpha:0 },{xPercent: 0, autoAlpha:1, ease: Power4.easeInOut},.7)
  .set($frameRed, {scaleX:0})
  .set($img2, {autoAlpha:0})
  .to($frameBlack , 2.2, {scaleX: 0, transformOrigin:'right', ease: Power4.easeInOut})
  .to($logo , .2, {autoAlpha:0 },'-=1.2')



$button.addEventListener('click', () => {
  tltransition.play(0);
});
