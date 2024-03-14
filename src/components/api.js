import { request } from "./utils/utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-9",
  headers: {
    authorization: "18bb9129-3f51-4697-b5c4-3a78dfed04ce",
    "Content-Type": "application/json",
  },
};

//-----------------------------------------------------------------
// Функции работы с получением данных с сервера

// Запрос данных о текущем пользователе
const getUser = () => {
  return request(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
};

// Запрос данных о карточках
const getCards = () => {
  return request(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
};

// Функция объединяющая и вызывающая загрузку данных с сервера
export const loadDataFromServer = () => {
  return Promise.all([getUser(), getCards()]);
};

//-----------------------------------------------------------------
// Функции работы с отправкой/обновлением данных на сервере

// Функция обновления данных о пользователе на сервере
export const updateProfile = (manualProfileData) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: manualProfileData.name,
      about: manualProfileData.about,
    }),
  });
};

// Функция обновления аватара пользователя на сервере
export const updateProfileAvatar = (manualProfileData) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: manualProfileData.avatar,
    }),
  });
};

// Функция добавления новой карточки
export const addNewCardOnServer = (newCardInformation) => {
  return request(`${config.baseUrl}/cards/`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: newCardInformation.name,
      link: newCardInformation.link,
    }),
  });
};

// Функция удаления своей карточки
export const deleteOwnCardFromServer = (cardInfo) => {
  return request(`${config.baseUrl}/cards/${cardInfo}`, {
    method: "DELETE",
    headers: config.headers,
  });
};

// Функция работы с лайком
export const likeCardOnServer = (cardInfo, isActive) => {
  if (!isActive) {
    return request(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "PUT",
      headers: config.headers,
    });
  } else {
    return request(`${config.baseUrl}/cards/likes/${cardInfo}`, {
      method: "DELETE",
      headers: config.headers,
    });
  }
};
