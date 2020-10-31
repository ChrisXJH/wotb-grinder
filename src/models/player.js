import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define('Player', {
  accountId: { type: DataTypes.STRING, allowNull: false },
  clanId: { type: DataTypes.STRING },
  clientLanguage: { type: DataTypes.STRING },
  nickname: { type: DataTypes.STRING }
});
