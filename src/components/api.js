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
// default_Avatar_url : https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg
// some_Avatar: https://cs14.pikabu.ru/post_img/big/2023/02/13/8/1676295806139337963.png
// other_Avatar: https://cs13.pikabu.ru/post_img/big/2023/02/13/8/1676295805154099895.png

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
  return Promise.all([getUser(), getCards()]).then((result) => {
    let user = result[0];
    let cards = result[1];
    showUserProfileInfo(userDataFields, user);
    renderFunction(cards, user["_id"]);
    return user;
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

// Функция обновления аватара пользователя на сервере
export function updateProfileAvatar(manualProfileData, userDataFields) {
  console.log(manualProfileData);
  fetch(serverUrl + cohortToken + profileOnServer + "/avatar", {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
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
  cardOperationsFunctions,
  userData
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
      return createCardFunction(card, cardOperationsFunctions, userData);
    });
}

// Функция удаления своей карточки
export function deleteOwnCardFromServer(cardInfo) {
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

// Функция работы с лайком
export function likeCardOnServer(cardInfo, isActive) {
  if (!isActive) {
    return fetch(
      serverUrl + cohortToken + cardsOnServer + "/likes/" + cardInfo,
      {
        method: "PUT",
        headers: {
          authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  } else {
    return fetch(
      serverUrl + cohortToken + cardsOnServer + "/likes/" + cardInfo,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        return response;
      });
  }
}
