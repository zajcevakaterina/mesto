export default class UserInfo {
  constructor({userName, userJob, userAvatar, userId}) {
    this._userName = document.querySelector(userName);
    this._userJob = document.querySelector(userJob);
    this._avatar = document.querySelector(userAvatar);
    this._id = userId;
  }

  getUserInfo() {
    const userInfo = {name: this._userName.textContent, job: this._userJob.textContent};
    return userInfo;
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(name, job) {
    this._userName.textContent = name;
    this._userJob.textContent = job;
  }

  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
