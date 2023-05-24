const mobileIcons = document.querySelectorAll(".mobile-grid__icon svg");

mobileIcons.forEach((icon) => {
  if (icon.hasAttribute("id")) {
    if (icon.getAttribute("id") == "true") {
      icon.parentElement.style.background = "#00B073";
    }
    if (icon.getAttribute("id") == "false") {
      icon.parentElement.style.background = "#F32657";
    }
  }
});
