// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const listForCards = document.querySelector(".places__list");

let cardForRender = initialCards;

function deleteCard(card) {
  card.remove();
}

function createCard(data) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = data["link"];
  cardElement.querySelector(".card__image").alt = data["name"];
  const but = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__title").textContent = data["name"];
  but.addEventListener("click", (event) => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function renderInitialCards(dataList) {
  dataList.forEach((element) => {
    listForCards.append(createCard(element));
  });
}

renderInitialCards(cardForRender);
