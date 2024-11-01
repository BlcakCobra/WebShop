import request from 'supertest';
import User from '../models/user';
import { app } from '../server';
import { hashPassword } from '../utilits/PasswordUtilits';
import { closeDB } from '../db';

const BASE_URL = '/login';
const testUser = {
  username: "testuser",
  password: "Test1234",
};

describe("User Login", () => {
  beforeAll(async () => {
    await User.deleteMany({});
    const hashedPassword = await hashPassword(testUser.password);
    await User.create({
      username: testUser.username,
      password: hashedPassword,
    });
  });
  
  it("should login successfully with valid credentials", async () => {
    const response = await request(app)
      .post(BASE_URL)
      .send(testUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should return 400 if user is not found", async () => {
    const response = await request(app)
      .post(BASE_URL)
      .send({
        username: "notExistingUser",
        password: "wrongPassword123",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User not found");
  });

  it("should return 401 if password is invalid", async () => {
    const response = await request(app)
      .post(BASE_URL)
      .send({
        username: testUser.username,
        password: "wrongPassword123",
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid password");
  });

  
});
