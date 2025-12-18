// ======================
// GSAP Plugins (register once)
// ======================
gsap.registerPlugin(ScrollTrigger);

// ======================
// Custom cursor (optimized & relaxed)
// ======================
const cursor = document.querySelector(".custom-cursor");

if (cursor && window.innerWidth > 1024) {
  let mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0,
    lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastTime < 16) return; // ~60fps
    lastTime = now;

    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursor.classList.add("cursor-hover")
    );
    el.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor-hover")
    );
  });
}

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
    requestIdleCallback(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.to(loader, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
      })
        .add(() => loader && loader.remove())
        .add(() => gsap.set(hero, { opacity: 1, pointerEvents: "auto" }))
        .add(initHeroAnimation);
    });
  };
});

// ======================
// Hero animation function
// ======================
function initHeroAnimation() {
  const hero =
    document.querySelector(".hero-preloader") ||
    document.querySelector("section");

  if (!hero) return;

  const title = hero.querySelector("h1");
  const ctas = hero.querySelectorAll("a, button");
  const location = hero.querySelector("h2");
  const image = hero.querySelector("img");

  gsap.set([title, ctas, location, image], { opacity: 0, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(title, { y: 0, opacity: 1, duration: 1.2 })
    .to(ctas, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "-=0.5")
    .to(location, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
    .to(image, { scale: 1, y: 0, opacity: 1, duration: 1 }, "-=0.7");
}

// ======================
// Name animation
// ======================
gsap.fromTo(
  ".Name h2,.Name p",
  { scale: 2, color: "#000000" },
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

// ======================
// Counter
// ======================
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
        once: true,
      },
      onUpdate() {
        counter.innerText = Math.floor(counter.innerText) + "+";
      },
    }
  );
});

// ======================
// Work / Grid Section
// ======================
const section = document.querySelector(".work-section");

// Separator
gsap.from(".saprator", {
  scaleX: 0,
  transformOrigin: "center center",
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.from(".gridContent", {
  scaleX: 1.5,
  transformOrigin: "center center",
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

gsap.from(section?.querySelectorAll(".workCTA"), {
  y: 60,
  opacity: 0,
  stagger: 0.15,
  ease: "power2.out",
  scrollTrigger: {
    trigger: section,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

// Images
gsap.utils.toArray(".gridImg").forEach((img) => {
  gsap.from(img, {
    scale: 1.2,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: img,
      start: "top 70%",
      end: "bottom 50%",
      scrub: true,
    },
  });
});

// ======================
// About text reveal
// ======================
gsap.utils.toArray(".text-reveal").forEach((section) => {
  const texts = section.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span");

  texts.forEach((el) => {
    gsap.set(el, { backgroundSize: "0% 100%" });

    gsap.to(el, {
      backgroundSize: "100% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom 50%",
        scrub: true,
      },
    });
  });
});

// ======================
// Portfolio cards
// ======================
gsap.utils.toArray(".featureWrapper").forEach((card) => {
  gsap.set(card, {
    opacity: 0,
    y: 40,
    scale: 1.08,
    willChange: "transform, opacity",
  });

  gsap.to(card, {
    opacity: 1,
    y: 0,
    scale: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      end: "top 55%",
      scrub: true,
    },
    onComplete: () => {
      gsap.set(card, { willChange: "auto" });
    },
  });
});

// ======================
// Contact form (Formspree)
// ======================
const form = document.getElementById("contact-form");

form &&
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const message = form.querySelector('[name="message"]');

    const nameError = form.querySelector(".name-error");
    const emailError = form.querySelector(".email-error");
    const messageError = form.querySelector(".message-error");

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (!name.value.trim()) {
      nameError.textContent = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      emailError.textContent = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(email.value)) {
      emailError.textContent = "Enter a valid email";
      isValid = false;
    }

    if (!message.value.trim()) {
      messageError.textContent = "Message is required";
      isValid = false;
    }

    if (!isValid) return;

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          form.reset();
          console.log("Message sent successfully");
        } else {
          console.log("Form submission failed");
        }
      })
      .catch(() => {
        console.log("Network error");
      });
  });
