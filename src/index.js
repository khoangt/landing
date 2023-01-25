import './styles/main.scss';
import anime from 'animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
  const animations = [];

  const makeAnimation = (props, section, speed, offset) => {
    animations.push({
      value: anime({
        ...props,
        autoplay: !section,
      }),
      speed,
      offset,
      section,
    });
  }

  // Animate on scroll
  const animateOnScroll = function (div, speed = 100, offset = 0) {
    const scrollPercent = window.pageYOffset - div.offsetTop;
    return (scrollPercent + offset) / speed;
  };

  const introductionSection = document.querySelector(".section__introduction");

  makeAnimation({
    targets: '.introduction__img',
    opacity: 1,
    duration: 1400,
    easing: 'easeInOutExpo'
  });

  makeAnimation({
    targets: '.introduction__title',
    opacity: 1,
    translateX: 0,
    duration: 1500,
    easing: 'easeInOutExpo'
  });

  makeAnimation({
    targets: '.introduction__subtitle',
    opacity: 1,
    translateX: 30,
    duration: 1500,
    easing: 'easeInOutExpo'
  });

  makeAnimation({
    targets: '.socials',
    opacity: 1,
    translateY: 0,
    duration: 3000,
    easing: 'easeInOutExpo'
  });

  const featuresSection = document.querySelector(".section__features");

  makeAnimation({
    targets: ".text-animate",
    scale: 2,
    duration: 4000,
  }, featuresSection, 100, 200);

  window.onscroll = function () {
    animations.forEach((animation) => {
      animation.section && animation.value.seek(
        animateOnScroll(
          animation.section,
          animation.speed,
          animation.offset
        ) * animation.value.duration
      );
    });
  };
}
