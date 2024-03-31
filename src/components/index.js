// Импорт CSS и других JS модулей
import "../pages/index.css";
import {closeModal, openModal} from "./modal.js";
import {createCard} from "./card.js";
import {clearValidation, enableValidation} from "./validation.js";
import {
	addNewCardOnServer,
	deleteOwnCardFromServer,
	likeCardOnServer,
	loadDataFromServer,
	updateProfile,
	updateProfileAvatar,
} from "./api.js";
import * as constants from "./utils/constants.js";
import {
	closeOpenedPopup,
	deleteConfirm,
	handleSubmit,
	imageZoomFunction,
	isURLisPicture,
	setErrorText,
	showUserProfileInfo,
} from "./utils/utils.js";

//-----------------------------------------------------------------
// Объявление Вспомогательных функций
// Определение функции первичного рендера карточек и их отрисовка
export function renderInitialCards(dataList, userData) {
	dataList.forEach((element) => {
		constants.listForCards.append(createCard(element, {
			delete: deleteConfirm, like: likeCardOnServer, zoom: imageZoomFunction,
		}, userData));
	});
}

//-----------------------------------------------------------------
// Начальная загрузка всех данных и инициализация валидации всех форм

//Загрузка всех данных с сервера.
loadDataFromServer()
	.then(([user, cards]) => {
		showUserProfileInfo(constants.userDataFields, user);
		renderInitialCards(cards, user["_id"]);
		constants.accountInfo.id = user["_id"];
	})
	.catch((err) => {
		setErrorText(`Ошибка сервера:${err}`);
		openModal(constants.errorModal);
	});

// Инициализация валидации всех форм
enableValidation(constants.validationConfig);

//-----------------------------------------------------------------

//-----------------------------------------------------------------
// Назначение Listener-ов на основные кнопки и модальные окна
//-----------------------------------------------------------------
// Назначение для закрытия всех попапов

constants.popups.forEach((popup) => {
	popup.addEventListener("mousedown", (evt) => {
		if (evt.target.classList.contains("popup_is-opened")) {
			closeModal(popup);
		}
		if (evt.target.classList.contains("popup__close")) {
			closeModal(popup);
		}
	});
});

//-----------------------------------------------------------------
// Назначения для редактирования данных профиля и аватара

// Данныые профиля

constants.profileEditButton.addEventListener("click", () => {
	clearValidation(constants.profileForm, constants.validationConfig);
	openModal(constants.profileEditModal);
	constants.profileFormTitle.value = constants.profileTitle.textContent;
	constants.profileFormDescription.value = constants.profileDescription.textContent;
});

// Данныые аватара
constants.avatarEditButton.addEventListener("click", () => {
	clearValidation(constants.avatarForm, constants.validationConfig);
	openModal(constants.avatarEditModal);
});

//-----------------------------------------------------------------
// Функция работы формы с редактированием профиля и аватара

// Данныые профиля
function handleProfileFormSubmit(evt) {
	function makeRequest() {
		return updateProfile({
			name: constants.profileFormTitle.value, about: constants.profileFormDescription.value,
		}).then((user) => {
			showUserProfileInfo(constants.userDataFields, user);
			closeOpenedPopup(constants.popups);
		});
	}

	handleSubmit(makeRequest, evt);
}

constants.profileForm.addEventListener("submit", handleProfileFormSubmit);

// Данныые аватара
function handleAvatarFormSubmit(evt) {
	const avatar = {
		avatar: constants.avatarFormLink.value,
	};

	function makeRequest() {
		return isURLisPicture(avatar.avatar).then((isValid) => {
			if (isValid) {
				return updateProfileAvatar(avatar).then((user) => {
					showUserProfileInfo(constants.userDataFields, user);
					closeOpenedPopup(constants.popups);
				});
			} else return Promise.reject(constants.urlErrorMessage);
		});
	}

	handleSubmit(makeRequest, evt, "Проверка URL и сохранение");

	//   function makeRequest() {
	//     return updateProfileAvatar(avatar).then((user) => {
	//       showUserProfileInfo(constants.userDataFields, user);
	//       closeOpenedPopup(constants.popups);
	//     });
	//   }

	//   handleSubmitWithCheck(
	//     isURLisPicture,
	//     avatar.avatar,
	//     makeRequest,
	//     evt,
	//     "Проверка URL"
	//   );
}

constants.avatarForm.addEventListener("submit", handleAvatarFormSubmit);

//-----------------------------------------------------------------
// Назначения для обработки работы с карточками
constants.addCardButton.addEventListener("click", () => {
	clearValidation(constants.addCardForm, constants.validationConfig);
	openModal(constants.addCardModal);
});

// Функция работы формы с добавлением карточки
function handleCardAddFormSubmit(evt) {
	const element = {
		name: constants.addCardFormTitle.value,
		link: constants.addCardFormLink.value,
	};

	// function makeRequest() {
	//   return addNewCardOnServer(element).then((card) => {
	//     constants.listForCards.prepend(
	//       createCard(
	//         card,
	//         {
	//           delete: deleteConfirm,
	//           like: likeCardOnServer,
	//           zoom: imageZoomFunction,
	//         },
	//         constants.accountInfo.id
	//       )
	//     );
	//     closeOpenedPopup(constants.popups);
	//   });
	// }

	function makeRequest() {
		return isURLisPicture(element.link).then((isValid) => {
			if (isValid) {
				return addNewCardOnServer(element).then((card) => {
					constants.listForCards.prepend(createCard(card, {
						delete: deleteConfirm, like: likeCardOnServer, zoom: imageZoomFunction,
					}, constants.accountInfo.id));
					closeOpenedPopup(constants.popups);
				});
			} else return Promise.reject(constants.urlErrorMessage);
		});
	}

	handleSubmit(makeRequest, evt, "Проверка URL и сохранение");

	// handleSubmitWithCheck(
	//   isURLisPicture,
	//   element.link,
	//   makeRequest,
	//   evt,
	//   "Проверка URL"
	// );
}

constants.addCardForm.addEventListener("submit", handleCardAddFormSubmit);

// Функция работы формы подтверждения удаления карточки
function handleCardDeleteFormSubmit(evt) {
	function makeRequest() {
		return deleteOwnCardFromServer(constants.cardInCharge.id).then(() => {
			constants.cardInCharge.domElement.remove();
			closeOpenedPopup(constants.popups);
		});
	}

	handleSubmit(makeRequest, evt, "Удаление карточки");
}

constants.deleteCardForm.addEventListener("submit", handleCardDeleteFormSubmit);
