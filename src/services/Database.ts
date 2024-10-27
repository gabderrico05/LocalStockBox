// services-Database.ts

import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

class Database {
  private static pool: Pool;

  private constructor() {}

  public static getConnection(): Pool {
    if (!Database.pool) {
      Database.pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
      });
    }
    return Database.pool;
  }
}

export default Database;

