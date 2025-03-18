document.addEventListener("DOMContentLoaded", () => {
    let projectsShown = 3;
    const projectsToAdd = projectsShown;

    const showMore = document.getElementById("show-more");
    const projectCards = document.getElementsByClassName("projectCard");
    
    // Variáveis para controle do carrossel
    let carouselInstance = null;
    
    const handleCarousel = () => {
        // Se já existe uma instância, limpar para evitar duplicação
        if (carouselInstance) {
            cancelAnimationFrame(carouselInstance.animationId);
        }
        
        const carousel = document.getElementById("carousel");
        
        // Resetar o carrossel ao estado inicial
        if(carousel){
            carousel.style.transform = "translateX(0)";
        }
        
        // Remover clones existentes para evitar duplicação
        const originalItems = document.querySelectorAll(".carousel-item:not(.clone)");
        const allItems = document.querySelectorAll(".carousel-item");
        
        // Remover todos os clones
        allItems.forEach(item => {
            if (item.classList.contains("clone")) {
                carousel.removeChild(item);
            }
        });
        
        // Converter NodeList para array
        const items = [...originalItems];
        
        // Importante: declarar antes de usar
        let isPaused = false;
        
        // Criar clones com a classe "clone" para identificação
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add("clone");
            clone.addEventListener("mouseenter", () => isPaused = true);
            clone.addEventListener("mouseleave", () => isPaused = false);
            carousel.appendChild(clone);
        });
        
        let position = 0;
        const speed = 1;
        let animationId = null;

        const getItemWidth = () => {
            if (items.length === 0) return 0;
            
            const firstItem = items[0];
            const style = window.getComputedStyle(carousel);
            const gap = parseFloat(style.gap) || 8; // Valor de gap do elemento pai
            
            return firstItem.offsetWidth + gap;
        };
        
        const moveCarousel = () => {
            if (!isPaused) {
                position -= speed;
                
                const itemWidth = getItemWidth();
                
                if (itemWidth > 0 && Math.abs(position) >= itemWidth) {
                    const firstItem = carousel.children[0];
                    carousel.appendChild(firstItem);
                    
                    // Ajustar a posição para compensar a remoção do item
                    position += itemWidth;
                }
                
                carousel.style.transform = `translateX(${position}px)`;
            }
            animationId = requestAnimationFrame(moveCarousel);
        };

        // Configurar eventos de mouse para todos os itens
        const setupMouseEvents = () => {
            const allItems = document.querySelectorAll(".carousel-item");
            allItems.forEach(item => {
                item.addEventListener("mouseenter", () => isPaused = true);
                item.addEventListener("mouseleave", () => isPaused = false);
            });
        };
        
        setupMouseEvents();
        animationId = requestAnimationFrame(moveCarousel);
        
        // Retornar objeto com referência ao animationId para poder cancelar depois
        carouselInstance = {
            animationId,
            cleanup: () => {
                cancelAnimationFrame(animationId);
            }
        };
    };

    const handleProjectsDisplay = () => {
        for (let i = 0; i < projectCards.length; i++) {
            if (i >= projectsShown) {
                projectCards[i].style.display = "none";
            } else {
                projectCards[i].style.display = "flex";
            }
        }
    };

    const handleComets = () => {
        const comets = document.getElementsByClassName("comet");
        let screenHeight = window.innerHeight;

        let speeds = [Math.random()*2 + 1, Math.random()*2 + 1, Math.random()*2 + 1];
        let positions = Array(comets.length).fill(-comets[0].offsetHeight);

        const moveComets = () => {
            Array.from(comets).forEach((comet, index) => {
                comet.style.top = `${positions[index]}px`
                positions[index] += speeds[index];
                if(positions[index] >= screenHeight){
                    speeds[index] = Math.random()*2 + 1;
                    positions[index] = -comets[0].offsetHeight;
                }
            })

            requestAnimationFrame(moveComets);
        }
        requestAnimationFrame(moveComets);
    }

    // Inicializar
    handleCarousel();
    handleProjectsDisplay();
    handleComets();

    showMore.addEventListener("click", () => {
        projectsShown += projectsToAdd;
        handleProjectsDisplay();
        if (projectsShown >= projectCards.length) {
            showMore.style.display = "none";
        }
    });

    // Otimizar o redimensionamento com debounce
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (carouselInstance) {
                carouselInstance.cleanup();
            }
            handleCarousel();
        }, 250); // Esperar 250ms após o último evento de redimensionamento
    });
});