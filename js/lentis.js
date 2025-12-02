// ===============================
// GSAP + LENIS SETUP
// ===============================
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => 1 - Math.pow(1 - t, 3),
  smoothWheel: true,
  smoothTouch: false,
});

// Lenis RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync Lenis with GSAP
lenis.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: innerWidth, height: innerHeight };
  },
  pinType: document.body.style.transform ? "transform" : "fixed",
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

// ===============================
// MOBILE NAV
// ===============================
const btn = document.getElementById("mobileNavBtn");
const menu = document.getElementById("mobileNav");

btn?.addEventListener("click", () => {
  menu?.classList.toggle("hidden");
});

// ===============================
// PAGE LOADER + HERO
// ===============================
window.addEventListener("load", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const loader = document.getElementById("page-loader");
  const hero = document.querySelector(".hero-preloader");

  if (!loader || !hero) return;

  gsap
    .timeline({ defaults: { ease: "power3.inOut" } })
    .to(loader, { opacity: 0, scale: 0.9, duration: 0.8 })
    .add(() => loader.remove())
    .set(hero, { opacity: 1, pointerEvents: "auto" })
    .add(initHeroAnimation);
});

function initHeroAnimation() {
  const hero = document.querySelector("section");
  if (!hero) return;

  const title = hero.querySelector("h1");
  const ctas = hero.querySelectorAll("a, button");
  const location = hero.querySelector("h2");
  const image = hero.querySelector("img");

  gsap.set([title, ctas, location, image], { opacity: 0, y: 20 });

  gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .to(title, { opacity: 1, y: 0, duration: 1.2 })
    .to(ctas, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.6")
    .to(location, { opacity: 1, y: 0 }, "-=0.5")
    .to(image, { opacity: 1, scale: 1, y: 0 }, "-=0.6");
}

// ===============================
// NAME SCROLL EFFECT
// ===============================
gsap.fromTo(
  ".Name h2",
  { scale: 1.5, color: "#000" },
  {
    scale: 1,
    color: "#fff",
    scrollTrigger: {
      trigger: ".Name",
      start: "top 80%",
      end: "bottom 30%",
      scrub: true,
    },
  }
);

// ===============================
// COUNTERS
// ===============================
gsap.utils.toArray(".counter").forEach((counter) => {
  const target = +counter.dataset.count;

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: target,
      snap: { innerText: 1 },
      ease: "power1.out",
      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
      onUpdate() {
        counter.innerText = Math.floor(counter.innerText) + "+";
      },
    }
  );
});

// ===============================
// WORK / GRID SECTION
// ===============================
const workSection = document.querySelector(".work-section");

if (workSection) {
  gsap.from(".saprator", {
    scaleX: 0,
    transformOrigin: "center",
    scrollTrigger: {
      trigger: workSection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.from(".gridContent", {
    scale: 1.2,
    scrollTrigger: {
      trigger: workSection,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.from(workSection.querySelectorAll(".workCTA"), {
    y: 60,
    opacity: 0,
    stagger: 0.15,
    scrollTrigger: {
      trigger: workSection,
      start: "top 80%",
      end: "center 60%",
      scrub: true,
    },
  });
}

// ===============================
// GRID IMAGES (EVEN / ODD SAFE)
// ===============================
gsap.utils.toArray(".gridImg").forEach((img) => {
  gsap.from(img, {
    scale: 1.15,
    opacity: 0,
    y: 50,
    scrollTrigger: {
      trigger: img,
      start: "top 75%",
      end: "bottom 50%",
      scrub: true,
    },
  });
});

// ===============================
// TEXT REVEAL (HEADINGS + PARAGRAPH)
// ===============================
gsap.utils.toArray(".text-reveal").forEach((block) => {
  const elements = block.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span");

  elements.forEach((el) => {
    gsap.set(el, { backgroundSize: "0% 100%" });

    gsap.to(el, {
      backgroundSize: "100% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: block,
        start: "top 75%",
        end: "bottom 40%",
        scrub: true,
      },
    });
  });
});

// ===============================
// PORTFOLIO IMAGE ANIMATION
// ===============================
gsap.utils.toArray(".portfolio-items > div").forEach((row) => {
  const imageWrapper = row.querySelector(".relative");
  if (!imageWrapper) return;

  gsap.from(imageWrapper, {
    scale: 1.3,
    opacity: 0,
    y: 80,
    scrollTrigger: {
      trigger: row,
      start: "top 80%",
      end: "top 45%",
      scrub: true,
      invalidateOnRefresh: true,
    },
  });
});
