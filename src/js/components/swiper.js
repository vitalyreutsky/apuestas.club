// license-swiper
import Swiper, { Keyboard, Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination, Keyboard]);

const servicesSwiper = new Swiper(".licenses-slider", {
  slidesPerGroup: 1,
  slidesPerView: 4,
  spaceBetween: 20,
  loop: true,
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  speed: 1000,
  navigation: {
    nextEl: ".licenses-slider--next",
    prevEl: ".licenses-slider--prev",
  },
});

const banner = new Swiper(".banner-bonuses__slider", {
  spaceBetween: 16,
  slidesPerView: 3,
  loop: true,
  // autoplay: {
  //     delay: 2500,
  //     disableOnInteraction: false,
  // },
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },
});
