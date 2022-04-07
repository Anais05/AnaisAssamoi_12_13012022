/**
 * @class Activity
 * @description Activity model
 * @constructor
 * @param {object} data user activity data
*/
export default class Activity {
  userId;
  sessions;

  constructor(data) {
    this.userId = data.userId;
    this.sessions = data.sessions;
  }
}