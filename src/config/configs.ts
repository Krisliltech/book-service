import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.USER,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  entities: [__dirname + '/../dist/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../dist/migrations/*.js'],
  synchronize: false,
  logging: true,
  autoLoadEntities: true,
};
