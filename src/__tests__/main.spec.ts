import supertest from "supertest";
import app from "../app";

describe("Main", () => {
  it("Should return 'Hello, World!'", async () => {
    const result = await supertest(app).get("/");
    expect(result.body.message).toBe("Hello, World!");
  });
});
