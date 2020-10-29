/* eslint-disable import/prefer-default-export */
import { Sequelize } from 'sequelize';

const DATABASE_NAME = 'wotb-grinder';
const DATABASE_USERNAME = 'root';
const DATABASE_PASSWORD = '12345678';

export const configSequelize = () => {
  const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: 'db',
    dialect: 'mysql',
  });

  sequelize.authenticate().then(() => {
    // eslint-disable-next-line no-console
    console.log('Connection to MySQL has been established successfully.');
  }).catch((err) => {
    // eslint-disable-next-line no-console
    console.error('Unable to connect to the database:', err);
  });

  return sequelize;
};
