let isInitialized = false;

function initializeGSAP() {
    const slides = document.querySelector(".slides");

    if (window.innerWidth > 1024) { 
        // Desktop: Horizontal Scrolling
        if (!isInitialized) {
            gsap.registerPlugin(ScrollTrigger);

            const slideElements = gsap.utils.toArray(".slide");

            // Calculate the total width dynamically
            const totalWidth = slideElements.reduce((acc, slide) => {
                return acc + slide.offsetWidth + parseInt(getComputedStyle(slides).gap || "0");
            }, 0);

            // Add 100vw extra space at the end (buffer)
            const buffer = window.innerWidth;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".slides",
                    start: "top top",
                    end: () => `+=${totalWidth + buffer}`, // End scroll with buffer added
                    scrub: true,
                    pin: true,
                },
            });

            // Smooth horizontal slide animation
            tl.to(".slides", {
                x: -(totalWidth + buffer), // Move slides to the left including the buffer
                ease: "none",
            });

            // Ensure slides have a horizontal layout
            slides.style.display = "flex";
            slides.style.flexDirection = "row";

            isInitialized = true;
        }
    } else {
        // Mobile & Tablet: Vertical Layout (<=1024px)
        slides.style.display = "block";

        // Kill all ScrollTrigger instances to prevent conflicts
        const scrollTriggers = ScrollTrigger.getAll();
        if (scrollTriggers) {
            scrollTriggers.forEach((trigger) => trigger.kill());
        }

        // Reset any leftover GSAP animations
        gsap.set(".slides", { x: 0 });

        isInitialized = false;
    }
}

// Initialize GSAP on page load
initializeGSAP();

// Reinitialize on window resize
window.addEventListener("resize", () => {
    initializeGSAP();
});
