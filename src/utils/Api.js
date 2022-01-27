import User from "../models/User";
import Session from "../models/Session";
import Performance from "../models/Performance";
import Activity from "../models/Activity";

export default class getData {
  constructor() {
    this.baseUrl = "http://localhost:3001";
  }

  async getUserInfo(userId) {
    try {
      let data = {};
      await fetch(`${this.baseUrl}/user/${userId}`)
      .then(function (response) {
        data = response.json;
      });
      return new User(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getActivity(userId) {
    try {
      let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/activity`)
      .then(function (response) {
        data = response.json;
      });
      return new Activity(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getSession(userId) {
    try {
      let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/average-sessions`)
      .then(function (response) {
        data = response.json;
      });
      return new Session(data.data);
    } catch (error) {
      console.error(error);
    }
  }

  async getPerformance(userId) {
    try {
     let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/performance`)
      .then(function (response) {
        data = response.json;
      });
      return new Performance(data.data);
    } catch (error) {
      console.error(error);
    }
  }
}