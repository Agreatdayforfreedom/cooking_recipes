import { beforeEach, describe, expect, it } from "vitest";
import jwt from "jsonwebtoken";
import request from "supertest";
import bcrypt from "bcrypt";

import app from "../app";
import prisma from "./helpers/prisma";

describe("auth", () => {
  describe("[POST] /signup", () => {
    it("should respond with status 200 and the user data", async () => {
      const { status, body } = await request(app).post("/signup").send({
        name: "testusername",
        email: "lol@gmail.com",
        lastname: "test",
        password: "Testpassword1",
        confirmPassword: "Testpassword1",
      });

      console.log(body);

      const newUser = await prisma.user.findUnique({
        where: {
          email: "lol@gmail.com",
        },
      });

      expect(status).toBe(200);

      expect(newUser).not.toBeNull();
      console.log(body);
      expect(body.user).toStrictEqual({
        //FIX CONTROLLERS
        name: "testusername",
        email: "lol@gmail.com",
        lastanme: "test",
      });
    });

    it("should respond with an access token", async () => {
      const { status, body } = await request(app).post("/signup").send({
        name: "testusername",
        email: "lol@gmail.com",
        lastname: "test",
        password: "Testpassword1",
        confirmPassword: "Testpassword1",
      });

      expect(status).toBe(200);

      expect(body).toHaveProperty("token"); // fix controller
      expect(jwt.verify(body.token, "secret" as string));
    });

    it("should respond with 400 if the email is already registered", async () => {
      const data = {
        name: "testusername",
        email: "lol@gmail.com",
        lastname: "test",
        password: "Testpassword1",
      };
      await prisma.user.create({ data });
      const { status, body } = await request(app)
        .post("/signup")
        .send({ ...data, confirmPassword: "Testpassword1" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("message");
      expect(body.message).toBeDefined();
    });
  });

  describe("[POST] /signin", () => {
    const data = {
      email: "fake@gmail.com",
      name: "fake",
      lastname: "fakusio",
      password: "Testpassword1",
    };
    beforeEach(async () => {
      await prisma.user.create({
        data: {
          email: data.email,
          name: data.name,
          lastname: data.lastname,
          password: bcrypt.hashSync(data.password, 10),
        },
      });
    });

    it("should respond with a 200 status code if the credentials are valid", async () => {
      const { status } = await request(app).post("/signin").send({
        email: data.email,
        password: data.password,
      });

      expect(status).toBe(200);
    });

    it("should respond with the user data", async () => {
      const { status: _, body } = await request(app).post("/signin").send({
        email: data.email,
        password: data.password,
      });

      let keys = Object.keys(body.user);
      expect(keys.length).toBe(4);
      expect(keys).toContainEqual(["id", "name", "lastname", "email"]);
    });

    it("should respond with a valid token", async () => {
      const { status: _, body } = await request(app).post("/signin").send({
        email: data.email,
        password: data.password,
      });

      expect(body).toHaveProperty("token");
      expect(jwt.verify(body.token, "secret" as string));
    });

    it("should respond with a 400 status code if invalid credentials were provided", async () => {
      const { status, body } = await request(app).post("/signin").send({
        email: data.email,
        password: data.password,
      });

      expect(status).toBe(400);
      expect(body).not.toHaveProperty("token");
    });

    it("should respond with a status 400 if the email cannot be found", async () => {
      const { status, body } = await request(app).post("/signin").send({
        email: "invalid@email.com",
        password: data.password,
      });

      expect(status).toBe(400);
      expect(body).not.toHaveProperty("token");
    });

    it("should respond with a status 400 if the body is invalid", async () => {
      const { status, body } = await request(app).post("/signin").send({
        username: "fake",
        password: data.password,
      });

      expect(status).toBe(400);
      expect(body).not.toHaveProperty("token");
    });

    it("should respond with a status 400 if the email is invalid", async () => {
      const { status, body } = await request(app).post("/signin").send({
        email: "fake",
        password: data.password,
      });

      expect(status).toBe(400);
      expect(body).not.toHaveProperty("token");
    });
  });
});
