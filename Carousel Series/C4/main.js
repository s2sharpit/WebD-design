const carousel = document.querySelector('.carousel');
const slider = document.querySelector('.slider');

const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
let direction;

let sectionIndex = 0;

function reset() {
  for(var i = 0; i < slider.children.length; i++) {
    slider.children[i].style.opacity = 0;
    slider.children[i].style.zIndex = 0;
  }
}

var intervalId = 0;

function startShow() {
  intervalId = setInterval(function() {
  reset();
  sectionIndex = sectionIndex < 4 ? sectionIndex + 1 : 0;
  setSection();
}, 5000);  
}
startShow();

carousel.addEventListener('mouseover', function() {
  clearInterval(intervalId);
});
carousel.addEventListener('mouseout', function() {
  startShow();
});

function setSection() {
  slider.children[sectionIndex].style.zIndex = 2;
  slider.children[sectionIndex].style.opacity = 1;
}

next.addEventListener('click', function(e) {
  reset();
  sectionIndex = (sectionIndex < 4) ? sectionIndex + 1 : 4;
  
  slider.children[sectionIndex].style.zIndex = 2;
  slider.children[sectionIndex].style.opacity = 1;
});

prev.addEventListener('click', function() {
  reset();
  sectionIndex = (sectionIndex > 0 ) ? sectionIndex - 1 : 0;
  slider.children[sectionIndex].style.zIndex = 2;
  slider.children[sectionIndex].style.opacity = 1;
});