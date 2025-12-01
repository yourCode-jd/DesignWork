// ======================
// Mobile nav toggle
// ======================
const btn = document.getElementById("mobileNavBtn");
const menu = document.getElementById("mobileNav");
btn &&
  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

// ======================
// Page loader + Hero animation
// ======================
document.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const loader = document.getElementById("page-loader");
  const hero = document.querySelector(".hero-preloader");

  window.onload = () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    // Step 1: Animate loader out (fade + scale)
    tl.to(loader, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
    })

      // Step 2: Remove loader from DOM
      .add(() => loader.remove())

      // Step 3: Reveal hero section before animation
      .add(() => gsap.set(hero, { opacity: 1, pointerEvents: "auto" }))

      // Step 4: Start hero animation
      .add(initHeroAnimation);
  };
});

// ======================
// Hero animation function
// ======================
function initHeroAnimation() {
  const hero = document.querySelector("section");
  if (!hero) return;

  const title = hero.querySelector("h1");
  const ctas = hero.querySelectorAll("a, button");
  const location = hero.querySelector("h2");
  const image = hero.querySelector("img");

  // Initial states
  gsap.set([title, ctas, location, image], { opacity: 0, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Title
  tl.to(title, { y: 0, opacity: 1, duration: 1.2 })

    // CTA links/buttons, staggered slightly after title
    .to(ctas, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.5")

    // Location text, overlaps slightly with last CTA
    .to(location, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")

    // Hero image, appears last smoothly
    .to(image, { scale: 1, y: 0, opacity: 1, duration: 1 }, "-=0.7");
}

// Animate name
gsap.fromTo(
  ".Name h2",
  {
    scale: 2,
    color: "#000000",
  },
  {
    scale: 1,
    color: "#ffffff",
    scrollTrigger: {
      trigger: "section",
      start: "top top",
      end: "bottom 30%",
      scrub: true,
    },
  }
);

// ========== Counter ===========

gsap.utils.toArray(".counter").forEach((counter) => {
  const target = +counter.dataset.count;

  gsap.fromTo(
    counter,
    { innerText: 0 },
    {
      innerText: target,
      duration: 1.8,
      ease: "power1.out",
      snap: { innerText: 1 },

      scrollTrigger: {
        trigger: counter,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        toggleActions: "play reverse play reverse",
      },

      onUpdate() {
        counter.innerText = Math.floor(counter.innerText) + "+";
      },
    }
  );
});

// ======= Grid section ==========
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector(".work-section");

// ---------------- Separator animation (full window)
gsap.from(".saprator", {
  scaleX: 0,
  transformOrigin: "center center",
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom", // section enters bottom of viewport
    end: "bottom top", // section leaves top of viewport
    scrub: true,
    // markers: true
  },
});

gsap.from(".gridContent", {
  scaleX: 1.5,
  transformOrigin: "center center",
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom", // section enters bottom of viewport
    end: "bottom top", // section leaves top of viewport
    scrub: true,
    // markers: true
  },
});

// ---------------- Text + Button animation
gsap.from(section.querySelectorAll(".workCTA"), {
  y: 60,
  opacity: 0,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    // markers: true
  },
});

// ---------------- Images animation
gsap.utils.toArray(".gridImg").forEach((img) => {
  gsap.from(img, {
    scale: 1.2,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img,
      start: "top 95%", // image enters viewport
      end: "bottom 20%", // image exits viewport
      scrub: true,
      // markers: true
    },
  });
});

// =========== About ============
gsap.registerPlugin(ScrollTrigger);

const heading = document.querySelector("h2.text-[250px]");

// wrap text (JS only — HTML unchanged)
const html = heading.innerHTML;

heading.classList.add("text-reveal");

heading.innerHTML = `
  <span class="reveal-base">${html}</span>
  <span class="reveal-fill-wrap">
    <span class="reveal-fill">${html}</span>
  </span>
`;

const fillWrap = heading.querySelector(".reveal-fill-wrap");

// reveal animation
gsap.fromTo(
  fillWrap,
  { scaleX: 0 },
  {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: heading,
      start: "top 80%",
      end: "top 20%",
      scrub: true, // smooth + reverse
    },
  }
);
