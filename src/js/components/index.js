import Swiper, { Keyboard, Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination, Keyboard]);

function initSwiper() {
  const swiper = new Swiper(".banner__slider", {
    spaceBetween: 16,
    autoHeight: true,
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".banner__pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
  });
}

function bannerSlider() {
  const banner = new Swiper(".banner-bonuses__slider", {
    spaceBetween: 16,
    slidesPerView: 3,
    // loop: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
    navigation: {
      nextEl: ".button-next",
      prevEl: ".button-prev",
    },
  });
}

const dateTimer = (oldDate, secIn, minIn, HoursIn) => {
  const currentDate = new Date();
  const diff = oldDate - currentDate;

  const hours = Math.floor(diff / 3600000 + 1);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);

  secIn.innerText = String(seconds).slice(1) ? String(seconds).slice(1) : 0;
  minIn.innerText = String(minutes).slice(1) ? String(minutes).slice(1) : 0;
  HoursIn.innerText = String(hours).slice(1) ? String(hours).slice(1) : 0;
};

const toggleWrap = (e) => {
  const id = e.getAttribute("data-id");
  e.classList.toggle("active");
  document
    .querySelector(`.toggle-wrap[data-id=${id}]`)
    .classList.toggle("active");
};

const changeTab = (e) => {
  const parent = e.target.closest(".tabs-block");
  parent
    .querySelectorAll(".tab-item")
    .forEach((tab) => tab.classList.remove("tab-item--active"));
  e.target.classList.add("tab-item--active");
  parent
    .querySelectorAll(".tab-wrap")
    .forEach((tab) => tab.classList.remove("tab-wrap--active"));

  if (e.target.hasAttribute("data-id")) {
    const id = e.target.getAttribute("data-id");
    document
      .querySelector(`.tab-wrap[data-id="${id}"]`)
      .classList.add("tab-wrap--active");
  }
};

window.addEventListener("load", function () {
  // if (this.document.querySelector(".banner__slider")) initSwiper();
  // if (this.document.querySelector(".banner-bonuses")) bannerSlider();

  this.document.addEventListener("click", function (e) {
    const target = e.target.closest(".tab-item");
    if (target) changeTab(e);
    const jsToggle = e.target.closest(".js-toggle");
    if (jsToggle) toggleWrap(jsToggle);
    if (
      !e.target.closest(".toggle-wrap") &&
      !e.target.closest(".js-toggle") &&
      !e.target.closest(".filter__tabs")
    )
      document
        .querySelectorAll(".toggle-wrap")
        .forEach((el) => el.classList.remove("active"));
  });

  const publicationDate = this.document.querySelector(".publish-date");
  if (publicationDate) {
    const oldDate = new Date(publicationDate.getAttribute("data-date"));
    const secIn = this.document.querySelector(".publish-date__seconds");
    const hoursIn = this.document.querySelector(".publish-date__hours");
    const minIn = this.document.querySelector(".publish-date__minuts");
    setInterval(() => {
      dateTimer(oldDate, secIn, minIn, hoursIn);
    }, 1000);
  }
});

class CountdownTimer {
  constructor(deadline, cbChange, cbComplete) {
    this._deadline = deadline;
    this._cbChange = cbChange;
    this._cbComplete = cbComplete;
    this._timerId = null;
    this._out = {
      minutes: "",
      seconds: "",
    };
    this._start();
  }
  _start() {
    this._calc();
    this._timerId = setInterval(this._calc.bind(this), 1000);
  }
  _calc() {
    const diff = this._deadline - new Date();
    const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
    const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
    this._out.minutes = minutes < 10 ? "0" + minutes : minutes;
    this._out.seconds = seconds < 10 ? "0" + seconds : seconds;
    this._cbChange ? this._cbChange(this._out) : null;
    if (diff <= 0) {
      clearInterval(this._timerId);
      this._cbComplete ? this._cbComplete() : null;
    }
  }
}

let itemMainFirst = document.querySelector(".banner-bonuses__slider");
if (itemMainFirst !== null) {
  itemMainFirst = itemMainFirst.querySelectorAll(".card");
  let deadline;
  let date = new Date(Date.now());
  for (let i = 0, k = 1; i < itemMainFirst.length; i++, k++) {
    let activeSlide = itemMainFirst[i].querySelector(".active--slide");

    let elMinutesMainFirst = itemMainFirst[i].querySelector(".minutes");
    let elSecondsMainFirst = itemMainFirst[i].querySelector(".seconds");

    let durationTime = itemMainFirst[i].getAttribute("data-delay");

    let nextTime = Number((k - 1) * 6000 + (k * 6000 - durationTime));
    if (i == 0) {
      nextTime = Number(6000 - durationTime);
      deadline = new Date(Number(date.valueOf()) + nextTime);
    } else {
      deadline = new Date(Number(date.valueOf()) + nextTime);
    }

    new CountdownTimer(
      deadline,
      (timer) => {
        if (elMinutesMainFirst || elSecondsMainFirst) {
          elMinutesMainFirst.textContent = timer.minutes;
          elSecondsMainFirst.textContent = timer.seconds;
        }
      },
      () => {
        activeSlide.textContent = "Passing Now";
        elMinutesMainFirst.parentElement.parentElement
          .querySelector("svg")
          .remove();
        elMinutesMainFirst.parentElement.remove();
        elSecondsMainFirst.parentElement.remove();
        itemMainFirst[i].parentElement.parentElement.nextElementSibling.click();
      }
    );
    // durationTime = Number(durationTime);
  }

  bannerSlider();
}
