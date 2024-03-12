//-----------------------------------------------------------------
// Объявление констант для API
const serverAndCohortUrl = "https://nomoreparties.co/v1/wff-cohort-9/";

const token = "18bb9129-3f51-4697-b5c4-3a78dfed04ce";

const profileOnServer = "users/me/";
const avatarOnServer = "avatar/";
const cardsOnServer = "cards/";
const likesOnServer = "likes/";

// Функция вывода данных о пользователе на странице
function showUserProfileInfo(userDataFields, user) {
  userDataFields.name.textContent = user.name;
  userDataFields.about.textContent = user.about;
  userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}

//-----------------------------------------------------------------
// Функции работы с получением данных с сервера

// Запрос данных о текущем пользователе
const getUser = () => {
  return fetch(serverAndCohortUrl +  profileOnServer, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}`);
    })
    .then((result) => {
      return result;
    });
};

// Запрос данных о карточках
const getCards = () => {
  return fetch(serverAndCohortUrl + cardsOnServer, {
    method: "GET",
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status}`);
    })
    .then((result) => {
      return result;
    });
};

// Функция объединяющая и вызывающая загрузку данных с сервера
export const loadDataFromServer = (userDataFields, renderFunction) => {
  return Promise.all([getUser(), getCards()])
    .then((res) => {
      let user = res[0];
      let cards = res[1];
      showUserProfileInfo(userDataFields, user);
      renderFunction(cards, user["_id"]);
      return user;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка сервера: ${err}`);
    });
};

//-----------------------------------------------------------------
// Функции работы с отправкой/обновлением данных на сервере

// Функция обновления данных о пользователе на сервере
export const updateProfile = (manualProfileData, userDataFields) => {
  return fetch(serverAndCohortUrl + profileOnServer, {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сервера: ${res.status}`);
    })
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
};

// Функция обновления аватара пользователя на сервере
export const updateProfileAvatar = (manualProfileData, userDataFields) => {
  return fetch(serverAndCohortUrl + profileOnServer + avatarOnServer, {
    method: "PATCH",
    headers: {
      authorization: token,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сервера: ${res.status}`);
    })
    .then((user) => {
      showUserProfileInfo(userDataFields, user);
    });
};

// Функция добавления новой карточки
export const addNewCardOnServer = (
  newCardInformation,
  createCardFunction,
  cardOperationsFunctions,
  userData
) => {
  return fetch(serverAndCohortUrl + cardsOnServer, {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сервера: ${res.status}`);
    })
    .then((card) => {
      return createCardFunction(card, cardOperationsFunctions, userData);
    });
};

// Функция удаления своей карточки
export const deleteOwnCardFromServer = (cardInfo) => {
  return fetch(serverAndCohortUrl + cardsOnServer + cardInfo, {
    method: "DELETE",
    headers: {
      authorization: token,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка сервера: ${res.status}`);
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(`Ошибка сервера: ${err.message}`);
    });
};

// Функция работы с лайком
export const likeCardOnServer = (cardInfo, isActive) => {
  if (!isActive) {
    return fetch(
      serverAndCohortUrl + cardsOnServer + likesOnServer + cardInfo,
      {
        method: "PUT",
        headers: {
          authorization: token,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка сервера: ${res.status}`);
      })
      .then((response) => {
        return response;
      });
  } else {
    return fetch(
      serverAndCohortUrl + cardsOnServer + likesOnServer + cardInfo,
      {
        method: "DELETE",
        headers: {
          authorization: token,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка сервера: ${res.status}`);
      })
      .then((response) => {
        return response;
      });
  }
};
