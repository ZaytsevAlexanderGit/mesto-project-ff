//-----------------------------------------------------------------
// Объявление констант для API
const token = "18bb9129-3f51-4697-b5c4-3a78dfed04ce";
const cohortToken = "wff-cohort-9/";
const serverUrl = "https://nomoreparties.co/v1/";
const profileOnServer = "users/me";
const allProfilesonServer = "users";
const cardsOnServer = "cards";
// const serverUrl2 = "https://mesto.nomoreparties.co/v1/";
// MY_id: "aa281386afe31656bce92e6d"

// Функция вывода данных о пользователе на странице
function showUserProfileInfo(userDataFields, user) {
  userDataFields.name.textContent = user.name;
  userDataFields.about.textContent = user.about;
  userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}

//-----------------------------------------------------------------
// Функции работы с получением данных с сервера

// Запрос данных о текущем пользователе
function getUser() {
  return fetch(serverUrl + cohortToken + profileOnServer, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

// Запрос данных о карточках
function getCards() {
  return fetch(serverUrl + cohortToken + cardsOnServer, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
}

// Функция объединяющая и вызывающая загрузку данных с сервера
export function loadDataFromServer(userDataFields, renderFunction) {
  Promise.all([getUser(), getCards()]).then((result) => {
    let user = result[0];
    let cards = result[1];
    showUserProfileInfo(userDataFields, user);
    renderFunction(cards, user);
  });
}

//-----------------------------------------------------------------
// Функции работы с отправкой/обновлением данных на сервере

// Функция обновления данных о пользователе на сервере
export function updateProfile(manualProfileData, userDataFields) {
  fetch(serverUrl + cohortToken + profileOnServer, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: manualProfileData.name,
      about: manualProfileData.about,
    }),
  })
    .then((res) => res.json())
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
}

// Функция добавления новой карточки
export function addNewCardOnServer(
  newCardInformation,
  createCardFunction,
  cardOperationsFunctions
) {
  return fetch(serverUrl + cohortToken + cardsOnServer, {
    method: "POST",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: newCardInformation.name,
      link: newCardInformation.link,
    }),
  })
    .then((res) => res.json())
    .then((card) => {
      return createCardFunction(card, cardOperationsFunctions);
    });
}

// Функция удаления своей карточки
export function deleteOwncardFromServer(cardInfo) {
  return fetch(serverUrl + cohortToken + cardsOnServer + "/" + cardInfo, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
}
