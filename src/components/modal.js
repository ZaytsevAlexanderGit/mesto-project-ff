//-----------------------------------------------------------------
// Импорт DOM модальных окон
import { profileEditModal, addCardModal, imageModal } from "../index";

//-----------------------------------------------------------------
// Определение открытого модального окна
function findOpenedModal() {
  let element = "";
  if (imageModal.classList.contains("popup_is-opened")) element = imageModal;
  else if (addCardModal.classList.contains("popup_is-opened"))
    element = addCardModal;
  else element = profileEditModal;
  return element;
}

//-----------------------------------------------------------------
// Функции открытия и закрытия модального окна
export function openModal(element) {
  element.classList.add("popup_is-opened");
  element.addEventListener("click", overlayClickModalClose);
  document.addEventListener("keydown", escModalClose);
}

export function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("click", overlayClickModalClose);
  document.removeEventListener("keydown", escModalClose);
}

function overlayClickModalClose(evt) {
  if (evt.target.classList.contains("popup_is-opened")) {
    closeModal(findOpenedModal());
  }
}

function escModalClose(evt) {
  if (evt.key === "Escape") {
    closeModal(findOpenedModal());
  }
}
