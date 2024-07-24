//Query selectors for the carousel containter and carousel images
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .Containers');


//Counter 

let counter = 1;


//Carousel width responsiveness when loading and when resizing tab
let scrollWidth 

window.addEventListener('load', () => {
    scrollWidth = carouselImages[0].getBoundingClientRect().width; 
    //in order to start at the first image and not the lastImageCopy when the page loads
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
})

window.addEventListener('resize', () => {
    const newScrollWidth = carouselImages[0].getBoundingClientRect().width;
    if (newScrollWidth !== scrollWidth) {
        scrollWidth = newScrollWidth;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
    };
});


//Transition functions

const transitionSlideForward = () => {
    if (document.hidden) return; //preventing function from running when tab is in the background 
    carouselSlide.style.transition = 'transform 0.6s ease-in-out';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
}

const transitionSlideBack = () => {
    if (document.hidden) return;
    carouselSlide.style.transition = 'transform 0.6s ease-in-out';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
}


//Toggle automatically looping through all images with play/pause functions

let autoLoop = setInterval(transitionSlideForward, 4000);   

const startLoop = () => {
    autoLoop = setInterval(transitionSlideForward, 4000);
}

const stopLoop = () => {
    clearInterval(autoLoop);
}


//Stop the autoLoop from going forward at its normal interval times when the back/forward buttons are clicked
//in case the autoLoop is about to go forward and it jumps two images 
//Reset the interval instead and ensure smooth transition

let acceptNavigationInput = true;

function buttonResetTimer(i) { 
    if (!acceptNavigationInput) return;
    
    clearInterval(autoLoop); //on this line to prevent a very rare case in which the function is called and the 
                             //code below has time to execute calling trasitionSlideBack, jumping two pictures

    acceptNavigationInput = false;

    setTimeout(() => {
        acceptNavigationInput = true;
    }, 1050); //prevent user from clicking multiple times before the transition has had time to execute 
              //therefore not triggering transitionend-event-listener at the end of the carousel 
    (i == 1) ? transitionSlideForward(): transitionSlideBack();
    autoLoop = setInterval(transitionSlideForward, 4000);
}


//Keyboard navigation

const keyboardNav = (e) => {
    if (e.keyCode == "37") {
        buttonResetTimer(-1);
        
    } else if (e.keyCode == "39") {
        buttonResetTimer(1);
    }
}

window.addEventListener("keydown", keyboardNav);


//Jumping from image clones to the original image and removing the the transition, thus creating the illusion of an infinite loop

carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id == "firstImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; 
    }

    if (carouselImages[counter].id == "lastImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
    }
});


//Buttons with related functions

// document.getElementById("play-button").addEventListener("click", startLoop); //if clicked, restarts loop
// document.getElementById("pause-button").addEventListener("click", stopLoop); //if clicked, clears interval and pauses carousel
// document.getElementById("next-button").addEventListener("click", forwardResetTimer);
// document.getElementById("back-button").addEventListener("click", backwardResetTimer);