const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

let currAccount = JSON.parse(localStorage.getItem("profileInfo"));
if (currAccount === null) {
} else {
  applyAccount(currAccount);
}

////------------------------------ Изменение профиля

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditPopup = document.querySelector(".popup_type_edit");

profileEditButton.addEventListener("click", () => {
  profileEditPopup.classList.add("popup_is-opened", "popup_is-animated");
  const popupClose = profileEditPopup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    profileEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
  });
});

const changeProfileBtn = profileEditPopup.querySelector(".popup__button");

function applyAccount(accInfo) {
  profileName.textContent = accInfo["name"];
  profileDescription.textContent = accInfo["description"];
}

changeProfileBtn.addEventListener("click", (event) => {
  let profileNewName = profileEditPopup.querySelector(
    ".popup__input_type_name"
  );
  let profileNewDescription = profileEditPopup.querySelector(
    ".popup__input_type_description"
  );
  profileName.textContent = profileNewName.value;
  profileDescription.textContent = profileNewDescription.value;

  let element = {
    name: profileNewName.value,
    description: profileNewDescription.value,
  };

  event.preventDefault();
  profileNewName.value = profileNewDescription.value = "";
  localStorage.setItem("profileInfo", JSON.stringify(element));
  profileEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
});
