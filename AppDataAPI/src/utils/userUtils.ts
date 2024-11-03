import bcrypt from "bcryptjs";

const userUtils = {
  async encryptPassword(rawPassword: string) {
    const salt = 10;
    return await bcrypt.hash(rawPassword, salt);
  },

  async comparePasswords(rawPassword: string, databaseHashPassword: string) {
    return await bcrypt.compare(rawPassword, databaseHashPassword);
  },
};

export default userUtils;
