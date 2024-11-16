import { response } from "express";
import { error } from "console";
import usersModel from "../models/usersModel.js";
import { userData } from "../types/usersTypes.js";
import userUtils from "../utils/userUtils.js";

const usersService = {
  async logIn(username: string, password: string) {
    const storedUser = await usersModel.getUserByUsername(username);

    if (
      storedUser &&
      storedUser.rows.length === 1 &&
      (await userUtils.comparePasswords(password, storedUser.rows[0].password))
    ) {
      throw new Error("Invalid data");
    }

    return userUtils.createToken(storedUser.rows[0].id);
  },
  async signIn(username: string, password: string, email: string) {
    let response;

    response = await usersModel.getUserByUsername(username);
    if (response.rowCount !== 0) {
      throw new Error("Invalid data");
    }

    response = await usersModel.getUserByEmail(email);
    if (response.rowCount !== 0) {
      throw new Error("Invalid data");
    }

    response = await usersModel.postUser(username, password, email);
    if (response.rowCount !== 1) {
      throw new Error("Invalid data");
    }

    return userUtils.createToken(response.rows[0].id);
  },
  async deleteUser(id: number) {
    const response = await usersModel.deleteUserById(id);
    if (response.rowCount !== 0) {
      throw new Error("Invalid data");
    }
  },
  async editUserData(
    username: string,
    password: string,
    email: string,
    id: number
  ) {
    let response = await usersModel.getUserByUsername(username);
    if (response.rowCount !== 0) {
      throw new Error("Username already used");
    }

    response = await usersModel.getUserByEmail(email);
    if (response.rowCount !== 0) {
      throw new Error("Email already used");
    }

    response = await usersModel.editUserData(username, password, email, id);
    if (response.rowCount !== 1) {
      throw new Error("No changes made");
    }
  },
};

export default usersService;
