// Импорт CSS и других JS модулей
import "../pages/index.css";
import { closeModal, openModal, closeModalOnOverlayClick } from "./modal.js";
import { createCard } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  addNewCardOnServer,
  loadDataFromServer,
  updateProfile,
  likeCardOnServer,
  deleteOwnCardFromServer,
  updateProfileAvatar,
} from "./api.js";

// Переменная с хранением ID пользователя
let myGlobalID;

// Объект карточки вызывающей подтверждение
let cardInCharge = {
  id: "",
  domElement: "",
};

// Текст ошибки проверки URL
const urlErrorMessage =
  "Введенный URL не является картинкой. Введите валидный адрес.";

// Объект с классами для валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//-----------------------------------------------------------------
// Объявление Вспомогательных функций
// Проверка URL на картинку.
// Для обхода CORS используется cors-proxy, найти бесплатный нормально работающий не получилось. Используется работающий на момент сдачи работы.
function isURLisPicture(data) {
  return fetch("https://proxy.cors.sh/" + data, {
    method: "HEAD",
    headers: {
      "x-cors-api-key": "temp_6093f581654842f76b43b8b2ab403cf2",
    },
  })
    .then((res) => res.headers.get("Content-type").includes("image"))
    .catch(() => false);
}

// Установка текста на кнопку, во вреся работы с сервером.
function setButtonText(domElement, text) {
  domElement.elements["button"].textContent = text;
}

// Установка текста в попап ошибки.
export function setErrorText(text) {
  errorMessageText.textContent = text;
}

// Открытие попапа подтверждения удаления карточки
function deleteConfirm(id, element) {
  setButtonText(deleteCardForm, "Да");
  openModal(deleteModal);
  cardInCharge.id = id;
  cardInCharge.domElement = element;
}

// Функция zoom-а карточки
function imageZoomFunction(element, data) {
  openModal(element);
  imageModalSource.src = data["link"];
  imageModalSource.alt = `Фото - ${data["name"]}`;
  imageModalCaption.textContent = data["name"];
}

//-----------------------------------------------------------------
// Объявление DOM всех модальных окон

const profileEditModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_new-card");
export const imageModal = document.querySelector(".popup_type_image");
const avatarEditModal = document.querySelector(".popup_type_avatar");
export const errorModal = document.querySelector(".popup_type_error");
const deleteModal = document.querySelector(".popup_type_delete");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с добавлением и работой с карточками + модальное окно подтверждения удаления
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const listForCards = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");
const closeCardButton = addCardModal.querySelector(".popup__close");

const addCardForm = document.forms["new-place"];
const addCardFormTitle = addCardForm.elements["place-name"];
const addCardFormLink = addCardForm.elements["link"];

const deleteCardForm = document.forms["delete"];
const closeDeleteConfirm = deleteModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с профилем и аватаром
const profileEditButton = document.querySelector(".profile__edit-button");
const profileClosedButton = profileEditModal.querySelector(".popup__close");

const avatarEditButton = document.querySelector(".profile__edit-avatar");
const avatarClosedButton = avatarEditModal.querySelector(".popup__close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatarPlace = document.querySelector(".profile__image");

const avatarForm = document.forms["new-avatar"];
const avatarFormLink = avatarForm.elements["avatar"];

const profileForm = document.forms["edit-profile"];
const profileFormTitle = profileForm.elements["name"];
const profileFormDescription = profileForm.elements["description"];

// Объект с ссылками на DOM элементы данных профиля
let userDataFields = {
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatarPlace,
};

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с модальным окном увеличения карточки
const imageModalSource = imageModal.querySelector(".popup__image");
const imageModalCaption = imageModal.querySelector(".popup__caption");
const imageCloseButton = imageModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с модальным окном ошибки
const errorCloseButton = errorModal.querySelector(".popup__close");
const errorMessageText = errorModal.querySelector(".popup__title");

//-----------------------------------------------------------------
// Определение функции первичного рендера карточек и их отрисовка
function renderInitialCards(dataList, userData) {
  dataList.forEach((element) => {
    listForCards.append(
      createCard(
        element,
        {
          delete: deleteConfirm,
          like: likeCardOnServer,
          zoom: imageZoomFunction,
        },
        userData
      )
    );
  });
}
//-----------------------------------------------------------------
// Начальная загрузка всех данных и инициализация валидации всех форм

// Инициализация валидации всех форм
enableValidation(validationConfig);

//Загрузка всех данных с сервера.
loadDataFromServer(userDataFields, renderInitialCards)
  .then((result) => {
    myGlobalID = result["_id"];
  })
  .catch((err) => {
    setErrorText(err);
    openModal(errorModal);
  });

//-----------------------------------------------------------------


//-----------------------------------------------------------------
// Назначение Listener-ов на основные кнопки и модальные окна
//-----------------------------------------------------------------
// Назначения для редактирования данных профиля и аватара

// Данныые профиля
profileEditButton.addEventListener("click", () => {
  setButtonText(profileForm, "Сохранить");
  openModal(profileEditModal);
  profileForm.reset();
  profileFormTitle.value = profileTitle.textContent;
  profileFormDescription.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
});

profileEditModal.addEventListener("click", closeModalOnOverlayClick);

profileClosedButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

// Данныые аватара
avatarEditButton.addEventListener("click", () => {
  setButtonText(avatarForm, "Сохранить");
  avatarForm.reset();
  clearValidation(avatarEditModal, validationConfig);
  openModal(avatarEditModal);
});

avatarEditModal.addEventListener("click", closeModalOnOverlayClick);

avatarClosedButton.addEventListener("click", () => {
  closeModal(avatarEditModal);
});

//-----------------------------------------------------------------
// Функция работы формы с редактированием профиля и аватара

// Данныые профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.target, "Сохранение...");
  updateProfile(
    {
      name: profileFormTitle.value,
      about: profileFormDescription.value,
    },
    userDataFields
  ).catch((err) => {
    setErrorText(err);
    openModal(errorModal);
  });
  closeModal(profileEditModal);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Данныые аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.target, "Сохранение...");
  isURLisPicture(avatarFormLink.value).then((isValidURL) => {
    if (isValidURL) {
      updateProfileAvatar(
        {
          avatar: avatarFormLink.value,
        },
        userDataFields
      ).catch((err) => {
        setErrorText(err);
        openModal(errorModal);
      });
      closeModal(avatarEditModal);
    } else {
      closeModal(avatarEditModal);
      setErrorText(urlErrorMessage);
      openModal(errorModal);
    }
  });
}

avatarForm.addEventListener("submit", handleAvatarFormSubmit);

//-----------------------------------------------------------------
// Назначения для обработки работы с карточками
addCardButton.addEventListener("click", () => {
  setButtonText(addCardForm, "Сохранить");
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardModal);
});

addCardForm.addEventListener("submit", handleCardAddFormSubmit);

// Функция работы формы с добавлением карточки
function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.target, "Сохранение...");
  let element = {
    name: addCardFormTitle.value,
    link: addCardFormLink.value,
  };
  isURLisPicture(element.link).then((isValidURL) => {
    if (isValidURL) {
      addNewCardOnServer(
        element,
        createCard,
        {
          delete: deleteConfirm,
          like: likeCardOnServer,
          zoom: imageZoomFunction,
        },
        myGlobalID
      )
        .then((card) => listForCards.prepend(card))
        .catch((err) => {
          setErrorText(err);
          openModal(errorModal);
        });
      closeModal(addCardModal);
    } else {
      closeModal(addCardModal);
      setErrorText(urlErrorMessage);
      openModal(errorModal);
    }
  });
}

addCardModal.addEventListener("click", closeModalOnOverlayClick);

closeCardButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Работа с окном и формой ошибки работы с сервером
errorModal.addEventListener("click", closeModalOnOverlayClick);

errorCloseButton.addEventListener("click", () => {
  closeModal(errorModal);
});

// Работа с окном и формой подтверждения удаления карточки
deleteModal.addEventListener("click", closeModalOnOverlayClick);

closeDeleteConfirm.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCardForm.addEventListener("submit", handleCardDeleteFormSubmit);

// Функция работы формы подтверждения удаления карточки
function handleCardDeleteFormSubmit(evt) {
  evt.preventDefault();
  setButtonText(evt.target, "Обработка запроса...");
  deleteOwnCardFromServer(cardInCharge.id)
    .then(() => {
      cardInCharge.domElement.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      closeModal(deleteModal);
      setErrorText(err);
      openModal(errorModal);
    });
}

//-----------------------------------------------------------------
// Назначения для обработки работы с модальным окном увеличения карточки
imageModal.addEventListener("click", closeModalOnOverlayClick);

imageCloseButton.addEventListener("click", () => {
  closeModal(imageModal);
});

