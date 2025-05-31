import request from "supertest";
import app from "../app";
import User from "../models/user";
import { closeDB } from "../db";
import connectDB from "../db";

const BASE_URL = '/register';

describe("User Registration", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await closeDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should register a new user", async () => {
    const response = await request(app)
      .post(BASE_URL)
      .send({
        username: "validuser",
        password: "Ab9_dK7L",
        confirmPassword: "Ab9_dK7L",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User successfully registered");
  });

  it("should return validation error for invalid input", async () => {
    const response = await request(app)
      .post(BASE_URL)
      .send({
        username: "t",               
        password: "t1234",            
        confirmPassword: "1234",    
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error"); 
  });
});
