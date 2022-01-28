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
      let data = {};
      const resp = await fetch(`${this.baseUrl}/user/${userId}`)
      data = await resp.json()
      return new User(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getActivity(userId) {
    try {
      let data = {};
      const resp = await fetch(`${this.baseUrl}/user/${userId}/activity`)
      data = await resp.json()
      return new Activity(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getSession(userId) {
    try {
      let data = {};
      const resp = await fetch(`${this.baseUrl}/user/${userId}/average-sessions`)
      data = await resp.json()
      return new Session(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getPerformance(userId) {
    try {
      let data = {};
      const resp = await fetch(`${this.baseUrl}/user/${userId}/performance`)
      data = await resp.json()
      return new Performance(data.data);
    } catch (error) {
      console.log(error);
    }
  }
}