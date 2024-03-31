import {closeModal, openModal} from "../modal";
import * as constants from "./constants";

//----------------------------------------------------
// Вспомогательные функции

//----------------------------------------------------
// Функции запросов к API

// Функция проверки ответа от сервера
const checkResponse = (res) => {
	if (res.ok) {
		return res.json();
	}
	return Promise.reject(`Ошибка ${res.status}`);
};

// Общая функция запроса к серверу
export const request = (url, options) => {
	return fetch(url, options).then(checkResponse);
};

//----------------------------------------------------
// Функции обработки submit форм

// Функция работы с кнопкой в модальном окне
function renderLoading(isLoading, button, buttonText = "Сохранить", loadingText = "Сохранение...") {
	if (isLoading) {
		button.textContent = loadingText;
		button.disabled = true;
	} else {
		button.textContent = buttonText;
		button.disabled = false;
	}
}

// Функция стандартной обработки submit формы
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
	evt.preventDefault();
	const submitButton = evt.submitter;
	const initialText = submitButton.textContent;
	renderLoading(true, submitButton, initialText, loadingText);
	request()
		.then(() => {
			evt.target.reset();
		})
		.catch((err) => {
			setErrorText(err);
			openModal(constants.errorModal);
		})
		.finally(() => {
			renderLoading(false, submitButton, initialText);
		});
}

// Функция  обработки submit формы с дополнительной проверкой URL
export function handleSubmitWithCheck(check, checkURL, request, evt, checkText = "Проверка URL", loadingText = "Сохранение...") {
	evt.preventDefault();
	const submitButton = evt.submitter;
	const initialText = submitButton.textContent;
	renderLoading(true, submitButton, initialText, checkText);
	return check(checkURL)
		.then((isValid) => {
			if (isValid) {
				renderLoading(true, submitButton, initialText, loadingText);
				return request();
			}
			return Promise.reject(constants.urlErrorMessage);
		})
		.then(() => {
			evt.target.reset();
		})
		.catch((err) => {
			setErrorText(err);
			openModal(constants.errorModal);
		})
		.finally(() => {
			renderLoading(false, submitButton, initialText);
		});
}

//----------------------------------------------------
// Общие необходимые функции

export function closeOpenedPopup(popups) {
	popups.forEach((popup) => {
		if (popup.classList.contains("popup_is-opened")) {
			closeModal(popup);
		}
	});
}

// Проверка URL на картинку.
// Для обхода CORS используется cors-proxy, найти бесплатный нормально работающий не получилось. Используется работающий на момент сдачи работы.
export function isURLisPicture(data) {
	return fetch("https://proxy.cors.sh/" + data, {
		// return fetch("https://api.codetabs.com/v1/proxy?quest=" + data, {
		method: "HEAD", headers: {
			"x-cors-api-key": "temp_6093f581654842f76b43b8b2ab403cf2",
		},
	})
		.then((res) => res.headers.get("Content-type").includes("image"))
		.catch(() => false);
}

// Установка текста в попап ошибки.
export function setErrorText(text) {
	constants.errorMessageText.textContent = text;
}

// Открытие попапа подтверждения удаления карточки
export function deleteConfirm(id, element) {
	openModal(constants.deleteModal);
	constants.cardInCharge.id = id;
	constants.cardInCharge.domElement = element;
}

// Функция zoom-а карточки
export function imageZoomFunction(element, data) {
	openModal(element);
	constants.imageModalSource.src = data["link"];
	constants.imageModalSource.alt = `Фото - ${data["name"]}`;
	constants.imageModalCaption.textContent = data["name"];
}

// Функция вывода данных о пользователе на странице
export function showUserProfileInfo(userDataFields, user) {
	userDataFields.name.textContent = user.name;
	userDataFields.about.textContent = user.about;
	userDataFields.avatar.style.backgroundImage = `url(${user.avatar})`;
}
