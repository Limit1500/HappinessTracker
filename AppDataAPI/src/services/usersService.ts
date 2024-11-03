import usersModel from "../models/usersModel.js";
import { userData } from "../types/usersTypes.js";
import userUtils from "../utils/userUtils.js";

const usersService = {
  async getAllUsers() {
    try {
      const response = await usersModel.getAllUsers();
      return response;
    } catch (error) {
      throw error;
    }
  },

  async getUserById(userId: number) {
    try {
      const response = await usersModel.getUserById(userId);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async deleteUserById(userId: number) {
    try {
      const response = await usersModel.deleteUserById(userId);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async postUser(userData: userData) {
    try {
      userData.password = await userUtils.encryptPassword(userData.password);
      const response = await usersModel.postUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

  async patchUser(userData: userData) {
    try {
      const response = await usersModel.patchUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default usersService;
