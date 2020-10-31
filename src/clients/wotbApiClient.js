export default class WotbApiClient {
  constructor({ baseUrl, applicationId, httpClient }) {
    this.baseUrl = baseUrl;
    this.applicationId = applicationId;
    this.httpClient = httpClient;
  }

  _getUrl(target, params) {
    return `${this.baseUrl}/${target}/?application_id=${this.applicationId}&${params.toString()}`;
  }

  _getAccountData(target, params) {
    const url = this._getUrl(`account/${target}`, params);
    return this.httpClient.get(url);
  }

  getPlayers(keyword) {
    const params = new URLSearchParams({
      search: keyword,
      type: 'exact'
    });
    return this._getAccountData('list', params);
  }

  getPlayerInfo(accountId) {
    const params = new URLSearchParams({
      account_id: accountId
    });
    return this._getAccountData('info', params);
  }

  getPlayersInfo(accountIds = []) {
    const params = new URLSearchParams({
      account_id: accountIds.join(',')
    });
    return this._getAccountData('info', params);
  }
}
