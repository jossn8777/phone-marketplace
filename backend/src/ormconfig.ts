import config from './config';
import entities = require('./entities');
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

type NewTypeOrmOptions = {
  seeds?: string[];
};

type CustomTypeOrmModuleOptions = TypeOrmModuleOptions & NewTypeOrmOptions;

const ormconfig: CustomTypeOrmModuleOptions = {
  type: 'mariadb',
  host: config.DATABASE_HOST,
  port: Number(config.DATABASE_PORT),
  username: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE_NAME,
  entities: Object.values(entities),
  synchronize: config?.AUTO_MIGRATION === 'true' ? true : false,
  keepConnectionAlive: true,
  connectTimeout: 10000,
  bigNumberStrings: false,
  extra: {
    connectionLimit: 500,
  },
  logging: true,
  migrationsRun: false,
  migrations: ['migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
  // multipleStatements: true,
  seeds: ['src/seeds/**/*{.ts,.js}'],
  cache: {
    type: 'redis',
    options: {
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    },
  },
};
export = ormconfig;
