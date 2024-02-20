// Объявление DOM всех модальных окон + константа время анимации окон
export const profileEditModal = document.querySelector(".popup_type_edit");
export const addCardModal = document.querySelector(".popup_type_new-card");
export const imageModal = document.querySelector(".popup_type_image");
export const timeModalAnimation = "600";

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с добавлением, работой с карточками
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export const listForCards = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = addCardModal.querySelector(".popup__close");

export const addCardForm = document.forms["new-place"];
export const addCardFormTitle = addCardForm.elements["place-name"];
export const addCardFormLink = addCardForm.elements["link"];

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с профилем
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
const profileClosedButton = profileEditModal.querySelector(".popup__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
const profileForm = document.forms["edit-profile"];
export const profileFormTitle = profileForm.elements["name"];
export const profileFormDescription = profileForm.elements["description"];

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с картинкой карточки
export const imageModalSource = imageModal.querySelector(".popup__image");
export const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageCloseButton = imageModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Импорт CSS и других JS модулей
import "./pages/index.css";
import { closeModal, openModal } from "./components/modal";
import "./components/profile.js";
import cardsForRender from "./components/cards.js";
import {
  renderInitialCards,
  handleCardAddFormSubmit,
} from "./components/card.js";
import { handleProfileFormSubmit } from "./components/profile.js";

//-----------------------------------------------------------------
// Отрисовка изначальных карточек
renderInitialCards(cardsForRender);

//-----------------------------------------------------------------
// Назначение Listener-ов на основные кнопки и модальные окна
//-----------------------------------------------------------------
// Назначения для профиля
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileFormTitle.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
});

profileClosedButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

//-----------------------------------------------------------------
// Назначения для обработки работы с карточками
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
});

closeCardButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleCardAddFormSubmit);

//-----------------------------------------------------------------
// Назначения для обработки работы с картинками
imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});
