const singleBonus = document.querySelector(".single-bonus__wrapper");

const bonusRedirect = (el) => {
  let link = el[0].dataset.external_link;
  if (link) {
    // window.location.href = link;
  }
};

const preloader = (percent) => {
  const preloaderBox = document.querySelector(".preloader-percent");
  const preloaderActive = document.querySelector(".preloader-subline");
  if (preloaderBox && preloaderActive) {
    preloaderActive.style.width = `${percent}%`;
    preloaderBox.innerText = `${percent}%`;
  }
};

let percent = 0;
const debugPreloader = () => {
  percent += 1;
  if (percent > 100) {
    if (singleBonus && singleBonus.length > 0) {
      bonusRedirect(singleBonus);
    }
    return;
  }
  preloader(percent);
  setTimeout(() => debugPreloader(), 30);
};

debugPreloader();
