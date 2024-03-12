//-----------------------------------------------------------------
// Импорт необходимых DOM элементов и функций
import { imageModal, errorModal, cardTemplate, setErrorText } from "./index";

import { openModal } from "./modal";
//-----------------------------------------------------------------
// Вспомогательные функции

// Функция отрисовки лайков
function showLikesInformation(data, currUserData, likeButton, likeAmount) {
  if (
    data["likes"].some((value) => {
      return value["_id"] === currUserData;
    })
  ) {
    likeButton.classList.add("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  } else {
    likeButton.classList.remove("card__like-button_is-active");
    likeAmount.textContent = data["likes"].length;
  }
}

//-----------------------------------------------------------------
// Функция создания карточки
export function createCard(data, functions, currUserData) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  const likeAmount = cardElement.querySelector(".card__like-amount");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardElement.querySelector(".card__title").textContent = data["name"];
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;

  //Отрисовка элемента лайк
  showLikesInformation(data, currUserData, likeButton, likeAmount);

  //Открытие модального окна с увеличенной картинкой
  imageCardElement.addEventListener("click", () => {
    functions.zoom(imageModal, data);
  });

  //Работа счетчика лайков
  likeButton.addEventListener("click", () => {
    functions
      .like(
        data["_id"],
        likeButton.classList.contains("card__like-button_is-active")
      )
      .then((response) => {
        showLikesInformation(response, currUserData, likeButton, likeAmount);
      })
      .catch((err) => {
        setErrorText(err);
        openModal(errorModal);
      });
  });

  //Наличие и работа иконки удаления карточки
  if (data.owner["_id"] === currUserData) {
    deleteButton.addEventListener("click", () => {
      functions.delete(data["_id"], cardElement);
    });
  } else {
    deleteButton.style.visibility = "hidden";
  }

  return cardElement;
}
