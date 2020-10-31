import { DataTypes } from 'sequelize';
import { sequelize } from '../config';

const Player = sequelize.define('Player', {
  accountId: { type: DataTypes.STRING, allowNull: false },
  nickname: { type: DataTypes.STRING }
}, {
  indexes: [
    {
      fields: ['accountId'],
      using: 'BTREE'
    }
  ]
});

export default Player;
