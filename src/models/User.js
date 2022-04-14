/**
 * @class User
 * @description User model
 * @constructor
 * @param {object} data user data
*/
export default class User {
  id;
  userInfos;
  score;
  keyData;

  constructor(data) {
    this.id = data.id;
    this.userInfos = data.userInfos;
    this.score = data.score || data.todayScore;
    this.keyData = data.keyData;
  }
}