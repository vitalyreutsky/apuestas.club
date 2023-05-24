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
