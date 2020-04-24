const request = require("supertest");

const server = require("../api/server.js");
const authRouter = require("./auth-router.js");
const db = require("../database/dbConfig.js");

describe("router", function () {
  beforeAll(async () => {
    await db("users").truncate();
  });
  describe("POST /register", function () {
    it("should add user to table", function () {
      return request(server)
          .post("/api/auth/register")
          .send({
              username: "Chip",
              password: "Bellona"
          })
          .then(resp => {
              expect(resp.body).toBeDefined();
          });
    });
    it("should give status 201 with success", function () {
      return request(server)
          .post("/api/auth/register")
          .send({
              username: "Ursula",
              password: "Anarres"
          })
          .then(resp => {
              expect(resp.status).toBe(201);
          });
    });
    it("should return a token", function () {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "China",
            password: "New Crobuzon",
          })
          .then((resp) => {
            expect(resp.body.token).toBeDefined();
          });
    });
  });
  describe("POST /login", function () {
    it("should log in existing user", function () {
      return request(server)
          .post("/api/auth/login")
          .send({
              username: "Chip",
              password: "Bellona"
          })
          .then(resp => {
              expect(resp.body.message).toBe("Welcome");
          });
    });
    it("should return a token", function () {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "Ursula",
            password: "Anarres",
          })
          .then((resp) => {
            expect(resp.body.token).toBeDefined();
          });
    });
    it("should return status 401 and no token with incorrect login credentials", function () {
        return request(server)
        .post("/api/auth/login")
        .send({
            username: "Nobody",
            password: "nothing"
        })
        .then(res => {
            expect(res.status).toBe(400);
        });
    });
  });
});
