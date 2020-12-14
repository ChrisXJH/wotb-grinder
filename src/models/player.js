import { DataTypes } from 'sequelize';
import { sequelize } from '../config';
import PlayerStatisticsAll from './playerStatisticsAll';

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

Player.hasMany(PlayerStatisticsAll);
PlayerStatisticsAll.belongsTo(Player);

export default Player;
