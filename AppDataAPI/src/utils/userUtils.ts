import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userUtils = {
  async encryptPassword(rawPassword: string) {
    const salt = 10;
    return await bcrypt.hash(rawPassword, salt);
  },

  async comparePasswords(rawPassword: string, databaseHashPassword: string) {
    return await bcrypt.compare(rawPassword, databaseHashPassword);
  },

  createToken(userId: number) {
    return jwt.sign(
      { tokenPayload: userId },
      process.env.JWT_SECRET_KEY || "",
      {
        expiresIn: "1w",
      }
    );
  },
};

export default userUtils;
