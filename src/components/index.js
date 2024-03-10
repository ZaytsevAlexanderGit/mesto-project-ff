// Импорт CSS и других JS модулей
import "../pages/index.css";
import { closeModal, openModal, overlayClickModalClose } from "./modal.js";
// import cardsForRender from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  addNewCardOnServer,
  loadDataFromServer,
  updateProfile,
  deleteOwncardFromServer,
} from "./api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//-----------------------------------------------------------------
// Объявление DOM всех модальных окон + константа время анимации окон
export const profileEditModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");
export const imageModal = document.querySelector(".popup_type_image");
// const timeModalAnimation = "600";

enableValidation(validationConfig);

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с добавлением, работой с карточками
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const listForCards = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = addCardModal.querySelector(".popup__close");

const addCardForm = document.forms["new-place"];
const addCardFormTitle = addCardForm.elements["place-name"];
const addCardFormLink = addCardForm.elements["link"];

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с профилем
const profileEditButton = document.querySelector(".profile__edit-button");
const profileClosedButton = profileEditModal.querySelector(".popup__close");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileAvatar = document.querySelector(".profile__image");
export const profileForm = document.forms["edit-profile"];
export const profileFormTitle = profileForm.elements["name"];
export const profileFormDescription = profileForm.elements["description"];

let userDataFields = {
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatar,
};

//---НОВОЕ!!!------------------------------------------------------
loadDataFromServer(userDataFields, renderInitialCards);
//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с картинкой карточки
const imageModalSource = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageCloseButton = imageModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Определение функции первичного рендера карточек и их отрисовка
function renderInitialCards(dataList, userData) {
  dataList.forEach((element) => {
    listForCards.append(
      createCard(
        element,
        {
          // delete: deleteCard,
          delete: deleteOwncardFromServer,
          like: likeCard,
          zoom: imageZoomFunction,
        },
        userData
      )
    );
  });
}

// Отрисовка изначальных карточек
// renderInitialCards(cardsForRender);

//-----------------------------------------------------------------
// Назначение Listener-ов на основные кнопки и модальные окна
//-----------------------------------------------------------------
// Назначения для профиля

profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  profileFormTitle.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

profileEditModal.addEventListener("click", overlayClickModalClose);

profileClosedButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

//-----------------------------------------------------------------
// Функция работы формы с редактированием профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  updateProfile(
    {
      name: profileFormTitle.value,
      about: profileFormDescription.value,
    },
    userDataFields
  );
  closeModal(profileEditModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

//-----------------------------------------------------------------
// Назначения для обработки работы с карточками
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
});

addCardForm.addEventListener("submit", handleCardAddFormSubmit);

// Функция работы формы с добавлением карточки
function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  let element = {
    name: addCardFormTitle.value,
    link: addCardFormLink.value,
  };
  addNewCardOnServer(element, createCard, {
    // delete: deleteCard,
    delete: deleteOwncardFromServer,
    like: likeCard,
    zoom: imageZoomFunction,
  }).then((card) => listForCards.prepend(card));
  closeModal(addCardModal);
}

addCardModal.addEventListener("click", overlayClickModalClose);

closeCardButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

//-----------------------------------------------------------------
// Назначения для обработки работы с картинками
imageModal.addEventListener("click", overlayClickModalClose);

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

// Функция zoom-а карточки
export function imageZoomFunction(element, data) {
  openModal(element);
  imageModalSource.src = data["link"];
  imageModalSource.alt = `Фото - ${data["name"]}`;
  imageModalCaption.textContent = data["name"];
}
