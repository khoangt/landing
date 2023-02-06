import './styles/main.scss';
import anime from 'animejs/lib/anime.es.js';
import { tns } from 'tiny-slider/src/tiny-slider';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', initPage);

const apiBaseURL = 'http://localhost:3005/api/v1';

function initPage() {
  // Subscriptions
  axios.get(`${apiBaseURL}/subscriptions/list`)
    .then(({ data }) => {
      const subscriptions = data.filter((item) => item.price > 0);
      console.log('subscriptions', subscriptions)

      const variants = document.querySelectorAll('.variant');
      variants.forEach((variant, index) => {
        variant.addEventListener('click', () => {
          window.open('https://lk.browser-profiles.com/auth/sign-up', '_blank');
        });

        const subscription = subscriptions[index];
        if (!subscription) {
          console.error('not found subscription', index, subscriptions, subscriptions[index])
        }
        console.log('index', index)
        const title = variant.querySelector('.variant__title');
        title.textContent = subscription.name;

        const priceValue = variant.querySelector('.price__value');
        priceValue.textContent = `${subscription.price}$ / месяц`;

        const profilesCount = variant.querySelector('.privileges__item_profiles');
        profilesCount.textContent = `До ${subscription.maxProfiles} браузерных профилей`;

        const support = variant.querySelector('.privileges__item_support');
        if (subscription.maxProfiles > 25) {
          support.textContent = `Приоритетная поддержка`;
        } else if (subscription.maxProfiles > 3) {
          support.textContent = `Базовая поддержка`;
        } else {
          support.textContent = '';
        }
      });
    })
    .catch((err) => {
      console.error(err)
    })

  // Slider
  const slider = tns({
    container: '.my-slider',
    items: 1,
    slideBy: 'page',
    autoplay: true
  });

  // Animations
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

  // Features

  const featuresSection = document.querySelector(".section__features");

  makeAnimation({
    targets: '.features__title',
    opacity: 1,
    translateX: 0,
    duration: 5000,
    easing: 'easeInOutExpo',
  }, featuresSection, 650, 500);

  makeAnimation({
    targets: '.feature',
    opacity: 1,
    translateX: 0,
    duration: 5000,
    easing: 'easeInOutExpo',
  }, featuresSection, 650, 500);

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
