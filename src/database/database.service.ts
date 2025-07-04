import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private connection: mysql.Connection;

  async onModuleInit() {
    this.connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('MySQL connection established');
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const [rows] = await this.connection.execute<RowDataPacket[]>(sql, params);
    return rows as T[];
  }

  async execute(sql: string, params?: any[]): Promise<ResultSetHeader> {
    const [result] = await this.connection.execute<ResultSetHeader>(
      sql,
      params,
    );
    return result;
  }

  async onModuleDestroy() {
    await this.connection.end();
    console.log('MySQL connection closed');
  }
}
