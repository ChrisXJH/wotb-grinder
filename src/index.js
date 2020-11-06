import { chunk, flatten } from 'lodash';
import {
  APPLICATION_ID, logger, sequelize, WOTB_API_URL
} from './config';
import HttpClient from './clients/httpClient';
import WotbApiClient from './clients/wotbApiClient';
import Player from './models/player';
import allNicknames from './nicknames.json';

const httpClient = new HttpClient({ maxRPS: 2 });
const wotbApiClient = new WotbApiClient({
  baseUrl: WOTB_API_URL,
  applicationId: APPLICATION_ID,
  httpClient
});

const updateUser = playerInfo => {
  const { account_id: accountId, nickname } = playerInfo;

  Player.findOne({ where: { accountId } }).then(player => {
    if (player) {
      player.nickname = nickname;
      player.save();
    } else {
      Player.create({ accountId, nickname });
    }
  });
};

const getPlayerIds = nicknames => nicknames.map(
  nickname => wotbApiClient.getPlayers(nickname).then(({ data, error }) => {
    if (error) {
      logger.err(error);
      return [];
    }
    return data.map(({ account_id }) => account_id);
  })
);

const fetchPlayersDataByNicknames = async (nicknames) => {
  const playerIdsResult = await Promise.all(getPlayerIds(nicknames));
  const playerIdChunks = chunk(flatten(playerIdsResult), 100);

  playerIdChunks.forEach(playerIds => {
    wotbApiClient.getPlayersInfo(playerIds).then(({ data, error }) => {
      if (error) {
        logger.err(error);
        return;
      }

      playerIds.forEach(playerId => updateUser(data[playerId]));
    });
  });
};

sequelize.sync().then(() => {
  fetchPlayersDataByNicknames(allNicknames);
});
