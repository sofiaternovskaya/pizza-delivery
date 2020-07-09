const isProd = process.env.NODE_ENV === "production";

module.exports = {
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "scout",
  database: process.env.DB_NAME || "test_db",
  charset: "utf8",
  driver: "mysql",
  synchronize: !isProd,
  entities: [isProd ? "**/**.entity.js" : "**/**.entity.ts"],
  logging: isProd ? "error" : "all",
  migrations: isProd ? ["dist/migration/*.js"] : ["src/migration/*.ts"],
  cli: {
    migrationsDir: isProd ? "dist/migration" : "src/migration",
  },
  connectTimeout: 30000,
  acquireTimeout: 30000,
};
