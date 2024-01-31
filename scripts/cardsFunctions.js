const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardAddButton = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup_type_new-card");

////------------------------------ Добавление новой карточки

cardAddButton.addEventListener("click", () => {
  cardAddPopup.classList.add("popup_is-opened", "popup_is-animated");
  const popupClose = cardAddPopup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    cardAddPopup.classList.remove("popup_is-opened", "popup_is-animated");
  });
});

const addPlaceBtn = cardAddPopup.querySelector(".popup__button");
addPlaceBtn.addEventListener("click", (event) => {
  let placeName = cardAddPopup.querySelector(".popup__input_type_card-name");
  let placeAdress = cardAddPopup.querySelector(".popup__input_type_url");
  clearRender();
  let newElem = { name: placeName.value, link: placeAdress.value };
  cardsForRender.push(newElem);
  localStorage.setItem("dataList", JSON.stringify(cardsForRender));
  renderInitialCards(cardsForRender);
  event.preventDefault();
  placeName.value = placeAdress.value = "";
  cardAddPopup.classList.remove("popup_is-opened", "popup_is-animated");
});

const imagePopup = document.querySelector(".popup_type_image");

function deleteCard(card) {
  card.remove();
  for (i = 0; i < cardsForRender.length; i++) {
    if (cardsForRender[i]["link"] === card.querySelector(".card__image").src) {
      cardsForRender.splice(i, 1);
      localStorage.setItem("dataList", JSON.stringify(cardsForRender));
      break;
    }
  }
}

///------------------------------ Функции работы с картинками

function likeCard(button) {
  button.classList.toggle("card__like-button_is-active");
}

function createCard(data, deleteFunction, likeFunction) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;

  imageCardElement.addEventListener("click", () => {
    imagePopup.classList.add("popup_is-opened", "popup_is-animated");
    const popupImage = imagePopup.querySelector(".popup__image");
    const popupClose = imagePopup.querySelector(".popup__close");
    popupClose.addEventListener("click", () => {
      imagePopup.classList.remove("popup_is-opened", "popup_is-animated");
    });
    popupImage.src = imageCardElement.src;
    popupImage.alt = imageCardElement.alt;
    const popupText = imagePopup.querySelector(".popup__caption");
    popupText.textContent = data.name;
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__title").textContent = data["name"];
  deleteButton.addEventListener("click", () => {
    deleteFunction(cardElement);
  });
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeFunction(likeButton);
  });

  return cardElement;
}