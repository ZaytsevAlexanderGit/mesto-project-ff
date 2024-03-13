//-----------------------------------------------------------------

// Определение открытого модального окна
function findOpenedModal() {
  return document.querySelector(".popup_is-opened");
}

//-----------------------------------------------------------------
// Функции открытия и закрытия модального окна
export function openModal(element) {
  element.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalOnEscPress);
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalOnEscPress);
}

export function closeModalOnOverlayClick(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(evt.target);
  }
}

function closeModalOnEscPress(evt) {
  if (evt.key === "Escape") {
    closeModal(findOpenedModal());
  }
}
