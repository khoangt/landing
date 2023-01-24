import './styles/main.scss';
import anime from 'animejs/lib/anime.es.js';

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
  // Animate on scroll
  const animateOnScroll = function (div, speed = 100, offset = 0) {
    const scrollPercent = window.pageYOffset - div.offsetTop;
    return (scrollPercent + offset) / speed;
  };

  // Introduction
  anime({
    targets: ".introduction-appear",
    opacity: 1,
    duration: 2500,
    autoplay: true,
  });

  // Animation
  const animation = anime({
    targets: ".text-animate",
    scale: 2,
    duration: 4000,
    autoplay: false,
  });

  const featuresSection = document.querySelector(".section__features");

  // Scroll listener
  window.onscroll = function () {
    animation.seek(animateOnScroll(featuresSection, 1000, 200) * animation.duration);
  };
}
