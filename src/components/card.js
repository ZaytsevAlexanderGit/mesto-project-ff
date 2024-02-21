//-----------------------------------------------------------------
// Импорт необходимых DOM элементов и функций
import { imageModal, cardTemplate } from "./index";

//-----------------------------------------------------------------
// Функция создания карточки + функции необходимые для этого (удаление, лайк, zoom)
export function createCard(data, functions){
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = data["name"];

  imageCardElement.addEventListener("click", () => {
    functions.zoom(imageModal,data);
  });

  likeButton.addEventListener("click", () => {
    functions.like(likeButton);
  });

  deleteButton.addEventListener("click", () => {
    functions.delete(cardElement);
  });

  return cardElement;
}

// Функция удаления карточки
export function deleteCard(card) {
  card.remove();
}

// Функция лайка карточки
export function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}
