/* eslint-disable import/prefer-default-export */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import Cabin from 'cabin';

const logger = new Cabin();

dotenv.config();

export const PORT = process.env.PORT ?? 8080;

const DATABASE_HOST = process.env.DATABASE_HOST ?? 'db';
const DATABASE_NAME = process.env.DATABASE_NAME ?? 'wotb-grinder';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME ?? 'root';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD ?? '12345678';

export const WOTB_API_URL = process.env.WOTB_API_URL ?? 'https://api.wotblitz.ru/wotb';
export const APPLICATION_ID = process.env.APPLICATION_ID;

export const configSequelize = () => {
  const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: logger.info.bind(logger)
  });

  return sequelize;
};
