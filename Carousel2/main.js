const slides = document.querySelectorAll(".slide");
var counter = 0;
// console.log(slides);
slides.forEach(
    (slide, index) => {
        slide.style.left = `${index * 100}%`
    }
)

function slideButton(n) {
    if(n == -1) {counter -= 2}
    slideImage()
}

const slideImage = () => {
    counter++;
    slides.forEach(
        (slide) => {
            slide.style.transform = `translateX(-${counter * 100}%)`
        }
    )
}

// let autoLoop = setInterval(slideImage, 4000);