import User from "../models/User";
import Session from "../models/Session";
import Performance from "../models/Performance";
import Activity from "../models/Activity";

export default class getData {
  constructor() {
    this.baseUrl = "http://localhost:3000";
  }

  async getUserInfo(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}`)
      const data = await resp.json()
      return new User(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getActivity(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}/activity`)
      const data = await resp.json()
      return new Activity(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getSession(userId) {
    try {
      const resp = await fetch(`${this.baseUrl}/user/${userId}/average-sessions`)
      const data = await resp.json()
      return new Session(data.data);
    } catch (error) {
      console.log(error);
    }
  }

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