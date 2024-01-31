let profileAvatar = document.querySelector(".profile__image");

let currAvatar = JSON.parse(localStorage.getItem("profileAvatar"));
if (currAvatar === null) {
} else {
  applyAvatar(currAvatar);
}

function applyAvatar(accInfo) {
  profileAvatar.style.backgroundImage = accInfo["avatar"];
}

const avatarEditButton = document.querySelector(".profile__edit-avatar");
const avatarEditPopup = document.querySelector(".popup_type_edit_avatar");

avatarEditButton.addEventListener("click", () => {
  avatarEditPopup.classList.add("popup_is-opened", "popup_is-animated");
  const popupClose = avatarEditPopup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    avatarEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
  });
});

const changeAvatarBtn = avatarEditPopup.querySelector(".popup__button");

changeAvatarBtn.addEventListener("click", (event) => {
  let profileNewAvatar = avatarEditPopup.querySelector(
    ".popup__input_type_avatar-url"
  );
  profileAvatar.style.backgroundImage = `url(${profileNewAvatar.value})`;

  let element = {
    avatar: `url(${profileNewAvatar.value})`,
  };

  event.preventDefault();
  profileNewAvatar.value = "";
  localStorage.setItem("profileAvatar", JSON.stringify(element));
  avatarEditPopup.classList.remove("popup_is-opened", "popup_is-animated");
});
