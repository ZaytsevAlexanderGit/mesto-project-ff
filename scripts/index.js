const listForCards = document.querySelector(".places__list");

let cardsForRender = JSON.parse(localStorage.getItem("dataList"));
if (cardsForRender === null) {
  cardsForRender = initialCards;
}

// localStorage.clear();
// localStorage.removeItem("dataList");
// localStorage.removeItem("profileInfo");
// localStorage.removeItem("profileAvatar");

function renderInitialCards(dataList) {
  dataList.forEach((element) => {
    listForCards.append(createCard(element, deleteCard, likeCard));
  });
}

function clearRender() {
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

