//-----------------------------------------------------------------
// Импорт необходимых DOM элементов и функций
import { imageModal, cardTemplate } from "./index";

//-----------------------------------------------------------------
// Функция создания карточки + функции необходимые для этого (удаление, лайк, zoom)
export function createCard(data, functions, currUserData) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const likeAmount = cardElement.querySelector(".card__like-amount");
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardElement.querySelector(".card__title").textContent = data["name"];

  showLikesInformation(data, currUserData, likeButton, likeAmount);

  imageCardElement.addEventListener("click", () => {
    functions.zoom(imageModal, data);
  });
  
  likeButton.addEventListener("click", () => {
    functions
      .like(
        data["_id"],
        likeButton.classList.contains("card__like-button_is-active")
      )
      .then((response) => {
        showLikesInformation(response, currUserData, likeButton, likeAmount);
      });
  });

  if (data.owner["_id"] === currUserData) {
    deleteButton.addEventListener("click", () => {
      functions.delete(data["_id"]).then(() => {
        cardElement.remove();
      });
    });
  } else {
    deleteButton.style.visibility = "hidden";
  }

  return cardElement;
}

// Функция отрисовки лайков
function showLikesInformation(data, currUserData, likeButton, likeAmount) {
  if (
    data["likes"].some((value) => {
      return (value["_id"]) === (currUserData);
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  } else {
    likeButton.classList.remove("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  }
}

// // Функция удаления карточки
// export function deleteCard(card) {
//   card.remove();
// }

// // Функция лайка карточки
// export function likeCard(button) {
//   button.classList.toggle("card__like-button_is-active");
// }
