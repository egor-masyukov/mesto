export default class UserInfo {
  constructor({ profileName, profileSubtitle, profileAvatar }) {
    this._title = document.querySelector(profileName);
    this._subtitle = document.querySelector(profileSubtitle);
    this._avatarLink = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._title.textContent,
      userText: this._subtitle.textContent,
    };

    return userInfo
  }

  setUserInfo({ userName, userText }) {
    this._title.textContent = userName;
    this._subtitle.textContent = userText;
  }

  setUserAvatar(avatarLink) {
    this._avatarLink.src = avatarLink;
  }
}