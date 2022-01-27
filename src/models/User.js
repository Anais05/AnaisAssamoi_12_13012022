export default class User {
  id;
  userInfos;
  score;
  keyData;

  constructor(data) {
    this.id = data.id;
    this.userInfos = data.userInfos;
    this.score = data.score;
    this.keyData = data.keyData;
  }
}