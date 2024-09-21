/* eslint-disable */
import dotenv from "dotenv";
import knex from "knex";
import request from "supertest";
import knexfile from "../../knexfile";

import app from "../../app.mjs";
import { getAuthToken } from "../utility.mjs";

dotenv.config();

knexfile.connection.connectionString = process.env.TEST_DATABASE_URL;
const database = knex(knexfile);

const email = "john.doe@example.com";
const password = "dummyPassword123!";

describe("users API", () => {
  beforeEach(async () => {
    await database.raw("TRUNCATE TABLE users CASCADE");

    const dummyObject = {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "+62812131232", // 12 characters long
      email,
      password,
    };

    await database("users").insert(dummyObject);
  });

  afterEach(() => {
    database.raw("TRUNCATE TABLE users CASCADE");
  });

  describe("POST /users/", () => {
    it("should create a user", async () => {
      const payload = {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+62812131230",
        email: "hello.doe@example.com",
        password: "dummyPassword123!",
      };

      const { body: data, status } = await request(app)
        .post(`/api/users/`)
        .send(payload);

      expect(status).toBe(201);
      expect(data).toHaveProperty("id");
    });

    it("if user email already exist should throw error", async () => {
      const payload = {
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "+62812131232",
        email: "john.doe@example.com",
        password: "dummyPassword123!",
      };

      const { body: data, status } = await request(app)
        .post(`/api/users/`)
        .send(payload);

      expect(status).toBe(422);
      expect(data.error).toBe(
        "Key (email)=(john.doe@example.com) already exists.",
      );
    });
  });

  describe("GET /users/", () => {
    it("should fetch all existing user", async () => {
      const token = await getAuthToken({ app, email, password });
      const { body: data, status } = await request(app)
        .get(`/api/users/`)
        .set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(data).toHaveLength(1);
    });
  });

  describe("GET /users/:id", () => {
    it("should fetch user by id", async () => {
      const token = await getAuthToken({ app, email, password });
      const { body: data, status } = await request(app)
        .get(`/api/users/`)
        .set("Authorization", `Bearer ${token}`);

      expect(status).toBe(200);
      expect(data).toHaveLength(1);
    });
  });
});
