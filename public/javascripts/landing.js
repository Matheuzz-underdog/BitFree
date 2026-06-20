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
})();
