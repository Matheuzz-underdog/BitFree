(function () {
  "use strict";

  var hamburger = document.querySelector(".nav-hamburger");
  var navbar = document.querySelector(".navbar");
  if (hamburger && navbar) {
    hamburger.addEventListener("click", function () {
      navbar.classList.toggle("nav-open");
    });
  }

  var parallax = document.querySelector(".parallax");
  if (parallax) {
    parallax.addEventListener("click", function (e) {
      e.stopPropagation();
      this.classList.toggle("parallax-open");
    });
  }

  document.addEventListener("click", function () {
    if (parallax) {
      parallax.classList.remove("parallax-open");
    }
  });

  document.querySelectorAll(".accordion-hitarea").forEach(function(el) {
    el.addEventListener("click", function() {
      if (window.innerWidth > 480) return;
      var col = this.closest(".content-col");
      col.classList.toggle("accordion-open");
      var expanded = col.classList.contains("accordion-open");
      this.setAttribute("aria-expanded", expanded);
    });
  });
})();
