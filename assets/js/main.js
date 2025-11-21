document.addEventListener("DOMContentLoaded", function () {
  // Set footer year
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // PARALLAX
  var parallaxElems = document.querySelectorAll("[data-parallax]");

  function handleParallax() {
    var scrollY = window.scrollY || window.pageYOffset || 0;
    parallaxElems.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0;
      el.style.transform = "translateY(" + scrollY * speed * -1 + "px)";
    });
  }

  if (parallaxElems.length) {
    handleParallax();
    window.addEventListener("scroll", handleParallax, { passive: true });
  }

  // REVEAL ON SCROLL
  var revealEls = document.querySelectorAll(".reveal");
  var prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15
      }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
});
