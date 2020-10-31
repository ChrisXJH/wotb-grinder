import modelDefiners from './models';
import { configSequelize } from './config';

const sequelize = configSequelize();

modelDefiners.map(modelDefiner => modelDefiner(sequelize))
  .forEach(model => model.sync());
