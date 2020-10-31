import {
  APPLICATION_ID, logger, sequelize, WOTB_API_URL
} from './config';
import HttpClient from './clients/httpClient';
import WotbApiClient from './clients/wotbApiClient';
import Player from './models/player';

const httpClient = new HttpClient();
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

const fetchPlayerData = async (nicknames) => {
  const searchPromises = nicknames.map(nickname => wotbApiClient.getPlayers(nickname), []);
  const accountIds = await Promise.all(searchPromises)
    .then(results => results.reduce((players, result) => {
      const { error, data } = result;

      if (error) {
        logger.err(error);
      } else {
        data.forEach(({ account_id }) => players.push(account_id));
      }

      return players;
    }, []));

  wotbApiClient.getPlayersInfo(accountIds).then(result => {
    const { error, data } = result;

    if (error) {
      logger.err(error);
      return;
    }

    accountIds.forEach(accountId => updateUser(data[accountId]));
  });
};

const nicknames = ['watea_23', 'Fadoo', 'Lady_Maria', 'Vincentshao', 'DA_JIBA', 'Sponge2000', 'dgzhek_9'];

sequelize.sync().then(() => {
  fetchPlayerData(nicknames);
});

