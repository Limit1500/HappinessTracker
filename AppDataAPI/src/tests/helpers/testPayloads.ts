const testPayloads = {
  ValidPayloadNo1: {
    username: process.env.TEST_USERNAME_1,
    password: process.env.TEST_PASSWORD_1,
    email: process.env.TEST_EMAIL_1,
  },
  ValidPayloadNo2: {
    username: process.env.TEST_USERNAME_2,
    password: process.env.TEST_PASSWORD_2,
    email: process.env.TEST_EMAIL_2,
  },
  InvalidPayload: {
    password: process.env.TEST_PASSWORD_1,
  },
};

export default testPayloads;
