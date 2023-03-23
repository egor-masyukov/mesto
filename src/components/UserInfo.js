export default class UserInfo {
    constructor({ profileName, profileSubtitle }) {
      this._title = document.querySelector(profileName);
      this._subtitle = document.querySelector(profileSubtitle);
    }
  
    getUserInfo() {
      const userInfo = {
        name: this._title.textContent,
        info: this._subtitle.textContent,
      };
  
      return userInfo
    }
  
    setUserInfo({ name, info }) {
      this._title.textContent = name;
      this._subtitle.textContent = info;
    }
  }