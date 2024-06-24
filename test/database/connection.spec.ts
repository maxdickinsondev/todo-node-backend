import { connection } from "../../src/database/connection";

describe("Database Connection", () => {
  it("should be have a correctly knex connection", () => {
    expect(connection).toHaveProperty("raw");
    expect(connection).toHaveProperty("select");
    expect(connection).toHaveProperty("insert");
    expect(connection).toHaveProperty("update");
    expect(connection).toHaveProperty("delete");
  });
});
