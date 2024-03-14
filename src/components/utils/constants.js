//-----------------------------------------------------------------
// Объявление констант

// Объект карточки вызывающей подтверждение
export const cardInCharge = {
  id: "",
  domElement: "",
};

// Текст ошибки проверки URL
export const urlErrorMessage =
  "Введенный URL не является картинкой. Введите валидный адрес.";

// Объект с классами для валидации
export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//-----------------------------------------------------------------
// Объявление DOM всех модальных окон
export const popups = document.querySelectorAll(".popup");

export const profileEditModal = document.querySelector(".popup_type_edit");
export const addCardModal = document.querySelector(".popup_type_new-card");
export const imageModal = document.querySelector(".popup_type_image");
export const avatarEditModal = document.querySelector(".popup_type_avatar");
export const errorModal = document.querySelector(".popup_type_error");
export const deleteModal = document.querySelector(".popup_type_delete");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с добавлением и работой с карточками + модальное окно подтверждения удаления
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export const listForCards = document.querySelector(".places__list");
export const addCardButton = document.querySelector(".profile__add-button");
export const closeCardButton = addCardModal.querySelector(".popup__close");

export const addCardForm = document.forms["new-place"];
export const addCardFormTitle = addCardForm.elements["place-name"];
export const addCardFormLink = addCardForm.elements["link"];

export const deleteCardForm = document.forms["delete"];
export const closeDeleteConfirm = deleteModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с профилем и аватаром
export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profileClosedButton =
  profileEditModal.querySelector(".popup__close");

export const avatarEditButton = document.querySelector(".profile__edit-avatar");
export const avatarClosedButton =
  avatarEditModal.querySelector(".popup__close");

export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileAvatarPlace = document.querySelector(".profile__image");

export const avatarForm = document.forms["new-avatar"];
export const avatarFormLink = avatarForm.elements["avatar"];

export const profileForm = document.forms["edit-profile"];
export const profileFormTitle = profileForm.elements["name"];
export const profileFormDescription = profileForm.elements["description"];

// Объект с ссылками на DOM элементы данных профиля
export const userDataFields = {
  name: profileTitle,
  about: profileDescription,
  avatar: profileAvatarPlace,
};

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с модальным окном увеличения карточки
export const imageModalSource = imageModal.querySelector(".popup__image");
export const imageModalCaption = imageModal.querySelector(".popup__caption");
export const imageCloseButton = imageModal.querySelector(".popup__close");

//-----------------------------------------------------------------
// Объявление DOM элементов связанных с модальным окном ошибки
export const errorCloseButton = errorModal.querySelector(".popup__close");
export const errorMessageText = errorModal.querySelector(".popup__title");
