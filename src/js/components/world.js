// установка cursor: pointer для активных стран
const worldMap = document.querySelector(".world__map");
const countries = document.querySelectorAll(".world__map path");
const colorActiveMap = "#00B073";

countries.forEach((country) => {
  if (country) {
    if (country.getAttribute("fill") == colorActiveMap) {
      country.style.cursor = "pointer";
    }
  }
});

// открыть/закрыть больше стран
const countriesMore = document.querySelectorAll(".countries--more");
const closeCountries = document.querySelectorAll(".countries--close");

countriesMore.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    btn.parentElement.nextElementSibling.style.display = "block";
  });
});

closeCountries.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.parentElement.style.display = "none";
  });
});

// смена лого карты на кнопке
const countryBtnLogo = document.querySelector(".world__btn-flag img");
const countryBtnTitle = document.querySelector(".country--active");

countries.forEach((country) => {
  country.addEventListener("click", () => {
    if (country) {
      if (country.getAttribute("id")) {
        countryBtnLogo.setAttribute(
          "src",
          "./img/flag/" + country.getAttribute("id").toLowerCase() + ".png"
        );

        countryBtnTitle.textContent = country.getAttribute("data-local");
      }
    }
  });
});
