let projectsShown = 3;
const projectsToAdd = projectsShown;

const showMore = document.getElementById("show-more");
const projectCards = document.getElementsByClassName("projectCard");

const handleCarousel = () => {
    const carousel = document.getElementById("carousel");
    const items = document.querySelectorAll(".carousel-item");
    
    let position = 0;
    const speed = 1;
    const blockWidth = carousel.scrollWidth/2;
    let isPaused = false;
    
    const moveCarousel = () => {
        if(!isPaused){
            position -= speed;
            if(Math.abs(position) >= blockWidth + 4){
                position = 0;
            }
            carousel.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(moveCarousel);
    }
    
    moveCarousel();
    
    // Pausar quando o mouse estiver sobre um item
    items.forEach(item => {
        item.addEventListener("mouseenter", () => isPaused = true);
        item.addEventListener("mouseleave", () => isPaused = false);
    });
}

const handleProjectsDisplay = () => {
    for(let i = 0; i < projectCards.length; i++){
        if(i >= projectsShown){
            projectCards[i].style.display = "none";
        }else{
            projectCards[i].style.display = "flex";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    handleCarousel();
    handleProjectsDisplay();

    showMore.addEventListener("click", () => {
        projectsShown+=projectsToAdd;
        handleProjectsDisplay();
        if(projectsShown >= projectCards.length){
            showMore.style.display = "none";
        }
    })
})