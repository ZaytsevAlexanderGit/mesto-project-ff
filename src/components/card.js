//-----------------------------------------------------------------
// Импорт необходимых DOM элементов и функций
import {
  addCardModal,
  imageModal,
  imageModalSource,
  imageModalCaption,
  addCardForm,
  addCardFormTitle,
  addCardFormLink,
  listForCards,
  cardTemplate,
  timeModalAnimation,
} from "../index";
import { openModal, closeModal } from "./modal";

//-----------------------------------------------------------------
// Функция создания карточки + функции необходимые для этого (удаление, лайк, zoom)
function createCard(data, deleteFunction, likeFunction, zoomFunction) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = data["name"];

  imageCardElement.addEventListener("click", () => {
    zoomFunction(imageModal, data);
  });

  likeButton.addEventListener("click", () => {
    likeFunction(likeButton);
  });

  deleteButton.addEventListener("click", () => {
    deleteFunction(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(card) {
  card.remove();
}

// Функция лайка карточки
function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

// Функция zoom-а карточки
function imageZoomFunction(element, data) {
  openModal(element);
  imageModalSource.src = data["link"];
  imageModalCaption.textContent = data["name"];
}

//-----------------------------------------------------------------
// Функция первичного рендера карточек
export function renderInitialCards(dataList) {
  dataList.forEach((element) => {
    listForCards.append(
      createCard(element, deleteCard, likeCard, imageZoomFunction)
    );
  });
}

//-----------------------------------------------------------------
// Функция работы формы с добавлением карточки
export function handleCardAddFormSubmit(evt) {
  evt.preventDefault();
  let element = {
    name: addCardFormTitle.value,
    link: addCardFormLink.value,
  };
  closeModal(addCardModal);
  listForCards.prepend(
    createCard(element, deleteCard, likeCard, imageZoomFunction)
  );
  setTimeout(() => addCardForm.reset(), timeModalAnimation);
}
