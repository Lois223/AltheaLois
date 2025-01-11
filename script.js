
if (window.innerWidth > 375) {
    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray(".slide");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".slides",
            start: "-20px top",
            end: () => `+=${(slides.length - 1) * window.innerWidth}`,
            scrub: true,
            pin: true,               
        }
    });

    tl.to(".slides", { xPercent: -100 * (slides.length - 1), ease: "power1.inOut" });
} else {
    document.querySelector('.slides').style.display = 'block'; // Ensure slides stack vertically

    // Disable GSAP ScrollTrigger 
    if (ScrollTrigger.getAll()) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}