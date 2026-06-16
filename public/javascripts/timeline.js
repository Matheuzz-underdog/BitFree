const frame = document.getElementById('timelineFrame');
    let isDown = false;
    let startX, startY, scrollLeft, scrollTop;

    frame.addEventListener('mousedown', (e) => {
      isDown = true;
      frame.style.cursor = 'grabbing';
      startX = e.pageX - frame.offsetLeft;
      startY = e.pageY - frame.offsetTop;
      scrollLeft = frame.scrollLeft;
      scrollTop  = frame.scrollTop;
    });

    frame.addEventListener('mouseleave', () => {
      isDown = false;
      frame.style.cursor = 'grab';
    });

    frame.addEventListener('mouseup', () => {
      isDown = false;
      frame.style.cursor = 'grab';
    });

    frame.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - frame.offsetLeft;
      const y = e.pageY - frame.offsetTop;
      const walkX = (x - startX) * 1.5;
      const walkY = (y - startY) * 1.5;
      frame.scrollLeft = scrollLeft - walkX;
      frame.scrollTop  = scrollTop  - walkY;
    });