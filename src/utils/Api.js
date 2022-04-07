import User from "../models/User";
import Session from "../models/Session";
import Performance from "../models/Performance";
import Activity from "../models/Activity";

/**
 * @class
 * @description class that provides methods which fetch all user datas
 * @constructor
*/

export default class getData {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  /**
   * @description gets the user information
   * @param {number} userId  id of the user (12 or 18)
   * @returns user data with User model object
  */

  async getUserInfo(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}`)
      const data = await resp.json()
      return new User(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @description gets the user activity
   * @param {number} userId  id of the user (12 or 18)
   * @returns user activity with Activity model object
  */

  async getActivity(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}/activity`)
      const data = await resp.json()
      return new Activity(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description gets the user session
   * @param {number} userId  id of the user (12 or 18)
   * @returns user session with Session model object
  */

  async getSession(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}/average-sessions`)
      const data = await resp.json()
      return new Session(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description gets the user performance
   * @param {number} userId  id of the user (12 or 18)
   * @returns user performance with Performance model object
  */
  async getPerformance(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}/performance`)
      const data = await resp.json()
      return new Performance(data.data);
    } catch (error) {
      console.log(error);
    }
  }
}