// main banner arrow scroll function
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('btn-scroll');

  if (btn) {
    btn.addEventListener('click', function () {
      let wrapper = btn.closest('.main-wrapper');
      let nextSection = wrapper?.nextElementSibling;

      if (nextSection) {
        const offsetTop = nextSection.offsetTop - 170;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      } else {
        console.warn('Next section not found.');
      }
    });
  }
});

// Sticky header fuction
window.history.scrollRestoration = 'manual';

window.addEventListener('load', () => {
	window.scrollTo(0, 0);
});

window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  if (window.scrollY > 100) {
    header.classList.add("header-sticky");
  } else {
    header.classList.remove("header-sticky");
  }
});

const eventListener = (className) => {
  const element = document.querySelectorAll(`${className}`);
  for (var i = 0; i < element.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = element[i].getBoundingClientRect().top;
      var elementVisible = 70;
      if (elementTop < windowHeight - elementVisible) {
          element[i].classList.add("active");
      } 
      // else {
      //     element[i].classList.remove("active");
      // }
  }
}
window.addEventListener("scroll", () => { eventListener('.bottom-animation') }); 

// Client logo auto slider
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.client-logos-track');

  if (!track) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    return;
  }

  const wrapper = track.closest('.client-logos-slider');
  let autoSlideId = null;
  let isAnimating = false;

  const getSlideDistance = () => {
    const firstItem = track.querySelector('.client-logo-item');
    if (!firstItem) {
      return 0;
    }
    const itemWidth = firstItem.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const gap =
      parseFloat(styles.columnGap || styles.gap || '0') || 0;
    return itemWidth + gap;
  };

  const performSlide = () => {
    if (isAnimating) {
      return;
    }
    const firstItem = track.querySelector('.client-logo-item');
    if (!firstItem) {
      return;
    }

    const distance = getSlideDistance();
    if (distance === 0) {
      return;
    }

    isAnimating = true;
    track.classList.add('is-animating');
    track.style.transform = `translateX(-${distance}px)`;

    const handleTransitionEnd = () => {
      track.classList.remove('is-animating');
      track.style.transition = 'none';
      track.appendChild(firstItem);
      track.style.transform = 'translateX(0)';
      track.getBoundingClientRect();
      track.style.transition = '';
      track.removeEventListener('transitionend', handleTransitionEnd);
      isAnimating = false;
    };

    track.addEventListener('transitionend', handleTransitionEnd);
  };

  const startAutoSlide = () => {
    if (autoSlideId !== null) {
      return;
    }
    autoSlideId = window.setInterval(performSlide, 2000);
  };

  const stopAutoSlide = () => {
    if (autoSlideId === null) {
      return;
    }
    window.clearInterval(autoSlideId);
    autoSlideId = null;
  };

  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoSlide);
    wrapper.addEventListener('mouseleave', startAutoSlide);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  prefersReducedMotion.addEventListener('change', (event) => {
    if (event.matches) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });

  startAutoSlide();
});

