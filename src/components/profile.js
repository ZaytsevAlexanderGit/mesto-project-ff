//-----------------------------------------------------------------
// Импорт необходимых DOM элементов и функций
import { closeModal } from "./modal";
import { profileEditModal } from "../index";
import {
  profileTitle,
  profileDescription,
  profileFormTitle,
  profileFormDescription,
} from "../index";

//-----------------------------------------------------------------
// Функция работы формы с редактированием профиля
export function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileFormTitle.value;
  profileDescription.textContent = profileFormDescription.value;
  closeModal(profileEditModal);
}
