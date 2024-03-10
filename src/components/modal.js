//-----------------------------------------------------------------
// Определение открытого модального окна
function findOpenedModal() {
  return document.querySelector(".popup_is-opened");
}

//-----------------------------------------------------------------
// Функции открытия и закрытия модального окна
export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", escModalClose);  
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escModalClose);
}

export function overlayClickModalClose(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

function escModalClose(evt) {
  if (evt.key === "Escape") {
    closeModal(findOpenedModal());
  }
}
