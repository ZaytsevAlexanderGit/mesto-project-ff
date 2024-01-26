const listForCards = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content.querySelector(".card");

let cardsForRender = initialCards;

function deleteCard(card) {
  card.remove();
}

function createCard(data, deleteFunction) {
  const cardElement = cardTemplate.cloneNode(true);
  const imageCardElement = cardElement.querySelector(".card__image");
  imageCardElement.src = data["link"];
  imageCardElement.alt = `Фото - ${data["name"]}`;
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardElement.querySelector(".card__title").textContent = data["name"];
  deleteButton.addEventListener("click", function() {
    deleteFunction(cardElement);
  });

  return cardElement;
}

function renderInitialCards(dataList) {
  dataList.forEach((element) => {
    listForCards.append(createCard(element, deleteCard));
  });
}

renderInitialCards(cardsForRender);
