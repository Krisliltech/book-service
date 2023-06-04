import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from './configs';
export const AppDataSource = new DataSource(typeOrmConfig as DataSourceOptions);
