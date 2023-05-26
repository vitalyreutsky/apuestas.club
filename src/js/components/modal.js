import GraphModal from "graph-modal";
// открытие модального окна
const modal = new GraphModal();
const modalEl = document.querySelectorAll(".modal");

const modalAsideClose = document.querySelectorAll(".modal-close");
modalAsideClose.forEach((btnClose) => {
  const btnCloseParent = btnClose.closest(".modal-aside");
  btnClose.addEventListener("click", () => {
    if (btnCloseParent) {
      btnClose.closest(".modal-aside").style.display = "none";
    }
  });
});

modalEl.forEach((el) => {
  if (el) {
    setTimeout(() => {
      // modal.open("modal-bonus");
    }, 2000);
  }
});
