import Swiper, { Keyboard, Navigation, Pagination } from "swiper";

Swiper.use([Navigation, Pagination, Keyboard]);
function initSwiper() {
  new Swiper(".banner__slider", {
    spaceBetween: 16,
    autoHeight: !0,
    slidesPerView: "auto",
    centeredSlides: !0,
    loop: !0,
    autoplay: { delay: 2500, disableOnInteraction: !1 },
    pagination: { el: ".banner__pagination", clickable: !0 },
    navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
  });
}
function bannerSlider() {
  new Swiper(".banner-bonuses__slider", {
    spaceBetween: 16,
    slidesPerView: 3,
    navigation: { nextEl: ".button-next", prevEl: ".button-prev" },
  });
}
var dateTimer = function (e, t, a, r) {
    var e = e - new Date(),
      i = Math.floor(e / 36e5 + 1),
      n = Math.floor((e % 36e5) / 6e4),
      e = Math.floor((e % 6e4) / 1e3);
    (t.innerText = String(e).slice(1) ? String(e).slice(1) : 0),
      (a.innerText = String(n).slice(1) ? String(n).slice(1) : 0),
      (r.innerText = String(i).slice(1) ? String(i).slice(1) : 0);
  },
  toggleWrap = function (e) {
    var t = e.getAttribute("data-id");
    e.classList.toggle("active"),
      document
        .querySelector(".toggle-wrap[data-id=".concat(t, "]"))
        .classList.toggle("active");
  },
  changeTab = function (e) {
    var t = e.target.closest(".tabs-block");
    t.querySelectorAll(".tab-item").forEach(function (e) {
      return e.classList.remove("tab-item--active");
    }),
      e.target.classList.add("tab-item--active"),
      t.querySelectorAll(".tab-wrap").forEach(function (e) {
        return e.classList.remove("tab-wrap--active");
      }),
      e.target.hasAttribute("data-id") &&
        ((t = e.target.getAttribute("data-id")),
        document
          .querySelector('.tab-wrap[data-id="'.concat(t, '"]'))
          .classList.add("tab-wrap--active"));
  };
window.addEventListener("load", function () {
  this.document.querySelector(".banner__slider") && initSwiper(),
    this.document.querySelector(".banner-bonuses") && bannerSlider(),
    this.document.addEventListener("click", function (e) {
      e.target.closest(".tab-item") && changeTab(e);
      var t = e.target.closest(".js-toggle");
      t && toggleWrap(t),
        e.target.closest(".toggle-wrap") ||
          e.target.closest(".js-toggle") ||
          e.target.closest(".filter__tabs") ||
          document.querySelectorAll(".toggle-wrap").forEach(function (e) {
            return e.classList.remove("active");
          });
    });
  var e,
    t,
    a,
    r,
    i = this.document.querySelector(".publish-date");
  i &&
    ((e = new Date(i.getAttribute("data-date"))),
    (t = this.document.querySelector(".publish-date__seconds")),
    (a = this.document.querySelector(".publish-date__hours")),
    (r = this.document.querySelector(".publish-date__minuts")),
    setInterval(function () {
      dateTimer(e, t, r, a);
    }, 1e3));
});
