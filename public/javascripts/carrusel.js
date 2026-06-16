  (function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let current = 0;
    const total = slides.length;

    function goTo(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      slides[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
    }

    setInterval(() => { goTo(current + 1); }, 3800);
  })();