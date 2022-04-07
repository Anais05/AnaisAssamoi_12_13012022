/**
 * @class Session
 * @description Session model
 * @constructor
 * @param {object} data user average session data
*/
export default class Session {
  userId;
  sessions;

  constructor(data) {
    this.userId = data.userId;
    this.sessions = data.sessions;
  }
}