/* eslint-disable import/prefer-default-export */
import Player from '../models/player';

export const fetchPlayerData = async () => {
  const allPlayers = await Player.findAll();
  // console.log(allPlayers.map(player => player.nickname));
};
