describe("Env", () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    originalEnv = process.env;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should be return correctly env values", () => {
    process.env.MYSQL_DB_HOST = "127.0.0.1";
    process.env.MYSQL_DB_USER = "test";
    process.env.MYSQL_DB_PASS = "test";
    process.env.MYSQL_DB_NAME = "db";
    process.env.MYSQl_DB_DOCKER_PORT = "3333";

    expect(process.env.MYSQL_DB_HOST).toBe("127.0.0.1");
    expect(process.env.MYSQL_DB_USER).toBe("test");
    expect(process.env.MYSQL_DB_PASS).toBe("test");
    expect(process.env.MYSQL_DB_NAME).toBe("db");
    expect(process.env.MYSQl_DB_DOCKER_PORT).toBe("3333");
  });
});
