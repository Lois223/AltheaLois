let isInitialized = false;

function initializeGSAP() {
    const slides = document.querySelector(".slides");

    if (window.innerWidth > 1024) {
        // Desktop: Horizontal Scrolling
        if (!isInitialized) {
            gsap.registerPlugin(ScrollTrigger);

            const slideElements = gsap.utils.toArray(".slide");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".slides",
                    start: "top top",
                    end: () => `+=${slideElements.length * window.innerWidth}`,
                    scrub: true,
                    pin: true,
                },
            });

            tl.to(".slides", { xPercent: -100 * (slideElements.length - 1), ease: "none" });

            // Ensure slides have horizontal layout
            slides.style.display = "flex";
            slides.style.flexDirection = "row";

            isInitialized = true;
        }
    } else {
        // Mobile & Tablet: Vertical Layout
        slides.style.display = "block";

        // Kill all ScrollTrigger instances to prevent conflicts
        const scrollTriggers = ScrollTrigger.getAll();
        if (scrollTriggers) {
            scrollTriggers.forEach((trigger) => trigger.kill());
        }

        // Reset any leftover GSAP animations
        gsap.set(".slides", { xPercent: 0 });

        isInitialized = false;
    }
}

// Initialize GSAP on page load
initializeGSAP();

// Reinitialize on window resize
window.addEventListener("resize", () => {
    initializeGSAP();
});
