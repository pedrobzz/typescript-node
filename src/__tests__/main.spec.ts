import supertest from "supertest";
import server from "../main";

describe("Main", () => {
  afterAll(() => {
    server.close();
  });
  it("Should return 'Hello, World!'", async () => {
    const result = await supertest(server).get("/");
    expect(result.body.message).toBe("Hello, World!");
  });
});
