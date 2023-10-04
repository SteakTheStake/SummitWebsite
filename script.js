const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Imagination", "Possibilities", "Building", "Textures"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});



const mountainLeft = document.querySelector('#mountain_left');
const mountainRight = document.querySelector('#mountain_right');
const cloud1 = document.querySelector('#clouds_1');
const cloud2 = document.querySelector('#clouds_2');
const text = document.querySelector('#text');
const man = document.querySelector('#man');

window.addEventListener('scroll',()=>{
  let value = scrollY;
  mountainLeft.style.left = `-${value/0.7}px`
  cloud2.style.left = `-${value*2}px`
  mountainRight.style.left = `${value/0.7}px`
  cloud1.style.left = `${value*2}px`
  text.style.bottom = `-${value}px`;
  man.style.height = `${window.innerHeight - value}px`
})

var buttons = document.querySelectorAll('.soundButton');

buttons.forEach(function(button) {
  button.addEventListener('click1', function() {
    var soundFile = button.getAttribute('data-sound');
    var audio = new Audio(soundFile);
    audio.play();
  });
});
buttons.forEach(function(button) {
  button.addEventListener('click2', function() {
    var soundFile = button.getAttribute('data-sound');
    var audio = new Audio(soundFile);
    audio.play();
  });
});
buttons.forEach(function(button) {
  button.addEventListener('click3', function() {
    var soundFile = button.getAttribute('data-sound');
    var audio = new Audio(soundFile);
    audio.play();
  });
});
buttons.forEach(function(button) {
  button.addEventListener('click4', function() {
    var soundFile = button.getAttribute('data-sound');
    var audio = new Audio(soundFile);
    audio.play();
  });
});
