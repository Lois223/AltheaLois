if (window.innerWidth > 475) {
    gsap.registerPlugin(ScrollTrigger);

    const slides = gsap.utils.toArray(".slide");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".slides",
            start: "top top",
            end: () => `+=${slides.length * window.innerWidth}`,
            scrub: true,
            pin: true,
        },
    });

    tl.to(".slides", { xPercent: -100 * (slides.length - 1), ease: "none" });
} else {
    document.querySelector(".slides").style.display = "block";

    if (ScrollTrigger.getAll()) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    }
}