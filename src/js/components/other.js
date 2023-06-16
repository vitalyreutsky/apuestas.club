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
