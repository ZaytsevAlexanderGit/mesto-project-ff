const listForCards = document.querySelector(".places__list");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let profileAvatar = document.querySelector(".profile__image");

let cardsForRender = JSON.parse(localStorage.getItem("dataList"));
if (cardsForRender === null) {
  cardsForRender = initialCards;
}

// localStorage.removeItem("dataList");
// localStorage.removeItem("profileInfo");

let currAccount = JSON.parse(localStorage.getItem("profileInfo"));
if (currAccount === null) {
} else {
  applyAccount(currAccount);
}

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

////------------------------------ Изменение профиля

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener("click", () => {
  profileEditPopup.classList.add("popup_is-opened", "popup_is-animated");
  const popupClose = profileEditPopup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    profileEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
  });
});

const changeProfileBtn = profileEditPopup.querySelector(".popup__button");

function applyAccount(accInfo) {
  profileName.textContent = accInfo["name"];
  profileDescription.textContent = accInfo["description"];
  profileAvatar.style.backgroundImage = accInfo["avatar"];
}

changeProfileBtn.addEventListener("click", (event) => {
  let profileNewName = profileEditPopup.querySelector(
    ".popup__input_type_name"
  );
  let profileNewDescription = profileEditPopup.querySelector(
    ".popup__input_type_description"
  );
  ////----------------
  let profileNewAvatar = profileEditPopup.querySelector(
    ".popup__input_type_avatar-url"
  );
  ////----------------
  profileName.textContent = profileNewName.value;
  profileDescription.textContent = profileNewDescription.value;

  profileAvatar.style.backgroundImage = `url(${profileNewAvatar.value})`;

  let element = {
    name: profileNewName.value,
    description: profileNewDescription.value,
    avatar: `url(${profileNewAvatar.value})`,
  };

  event.preventDefault();
  profileNewName.value =
    profileNewDescription.value =
    profileNewAvatar.value =
      "";
  localStorage.setItem("profileInfo", JSON.stringify(element));
  profileEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
});

////------------------------------ Добавление новой карточки

const cardAddButton = document.querySelector(".profile__add-button");
const cardAddPopup = document.querySelector(".popup_type_new-card");

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
  renderInitialCards(cardsForRender);
  event.preventDefault();
  placeName.value = placeAdress.value = "";
  cardAddPopup.classList.remove("popup_is-opened", "popup_is-animated");
});

///------------------------------ Функции работы с картинками

const imagePopup = document.querySelector(".popup_type_image");

// let cardsForRender = initialCards;

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

function renderInitialCards(dataList) {
  dataList.forEach((element) => {
    listForCards.append(createCard(element, deleteCard, likeCard));
  });
  localStorage.setItem("dataList", JSON.stringify(dataList));
}

function clearRender() {
  // listForCards.innerHTML = "";
  listForCards.querySelectorAll(".places__item").forEach((element) => {
    element.remove();
  });
}

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    profileEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
    cardAddPopup.classList.remove("popup_is-opened", "popup_is-animated");
    imagePopup.classList.remove("popup_is-opened", "popup_is-animated");
  }
});

renderInitialCards(cardsForRender);

