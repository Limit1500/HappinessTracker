import { response } from "express";
import { error } from "console";
import usersModel from "../models/usersModel.js";
import { userData } from "../types/usersTypes.js";
import userUtils from "../utils/userUtils.js";
import { CustomError } from "../types/errorTypes.js";

const usersService = {
  async logIn(username: string, password: string) {
    const storedUser = await usersModel.getUserByUsername(username);

    if (
      !storedUser ||
      storedUser.rows.length !== 1 ||
      !(await userUtils.comparePasswords(password, storedUser.rows[0].password))
    ) {
      throw new CustomError(
        "Invalid credentials. Please check your username and password.",
        400
      );
    }

    return userUtils.createToken(storedUser.rows[0].id);
  },

  async signIn(username: string, password: string, email: string) {
    let response;

    response = await usersModel.getUserByUsername(username);
    if (response.rowCount !== 0) {
      throw new CustomError("Invalid credentials. Username already taken", 400);
    }

    response = await usersModel.getUserByEmail(email);
    if (response.rowCount !== 0) {
      throw new CustomError("Invalid credentials. Email already taken", 400);
    }

    await usersModel.postUser(username, password, email);

    return userUtils.createToken(response.rows[0].id);
  },

  async deleteUser(id: number) {
    const response = await usersModel.deleteUserById(id);
  },

  async editUserData(
    username: string,
    password: string,
    email: string,
    id: number
  ) {
    let response = await usersModel.getUserByUsername(username);
    if (response.rowCount !== 0) {
      throw new CustomError("Invalid credentials. Username already taken", 400);
    }

    response = await usersModel.getUserByEmail(email);
    if (response.rowCount !== 0) {
      throw new CustomError("Invalid credentials. Email already taken", 400);
    }

    response = await usersModel.editUserData(username, password, email, id);
  },
};

export default usersService;
