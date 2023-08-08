import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import 'dotenv/config'

console.log(`****** application node is running`)

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [
        'dist/src/**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    migrations: ['dist/src/migrations/*.js'],
    migrationsRun: false,
    namingStrategy: new SnakeNamingStrategy(),
    ssl: false,
    logging: false
}

export default config