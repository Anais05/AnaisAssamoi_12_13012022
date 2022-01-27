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
      await fetch(`${this.baseUrl}/user/${userId}`)
      .then(function (response) {
        data = response;
      });
      return new User(data);
    } catch (error) {
      console.error(error);
    }
  }

  async getActivity(userId) {
    try {
      let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/activity`)
      .then(function (response) {
        data = response;
      });
      return new Activity(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getSession(userId) {
    try {
      let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/average-sessions`)
      .then(function (response) {
        data = response;
      });
      return new Session(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getPerformance(userId) {
    try {
     let data = {};
      await fetch(`${this.baseUrl}/user/${userId}/performance`)
      .then(function (response) {
        data = response;
      });
      return new Performance(data);
    } catch (error) {
      console.log(error);
    }
  }
}