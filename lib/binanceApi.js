
const querystring = require('querystring');
const axios = require('axios');

class Binance {

  constructor() {
    this.apiBaseUrl = "https://api.binance.com";
    this.apiPath = "/fapi";
  }

  /**
    * General endpoints
    */

  // 测试能否联通
  async ping() {
    let request = await this.sendRequest("/v1/ping");
    return request.data;
  }

  // 获取系统时间
  async time() {
    let request = await this.sendRequest("/v1/time");
    // { serverTime: 1534243613069 }
    return request.data.serverTime;
  }

  // 获取交易规则和交易对
  async exchangeInfo() {
    let request = await this.sendRequest("/v1/exchangeInfo");
    return request.data;
  }

  // 深度信息
  async depth(symbol = 'BTCUSDT', limit = 100) {

    let requestParams = {
      symbol: symbol,
      limit: limit
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/depth?${queryString}`);
    return request.data;

  }

  // 近期成交
  async trades(symbol = 'BTCUSDT', limit = 100) {

    let requestParams = {
      symbol: symbol,
      limit: limit
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/trades?${queryString}`);
    return request.data;

  }

  // 查询历史成交
  async historicalTrades(symbol = 'BTCUSDT', limit = 100, tradeId = null) {

    let requestParams = {
      symbol: symbol,
      limit: limit,
      fromId: tradeId
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/historicalTrades?${queryString}`);
    return request.data;

  }

  // 近期成交(归集)
  async aggTrades(symbol = 'BTCUSDT', limit = 500, tradeId = null, startTime = null, endTime = null) {

    let requestParams = {
      symbol: symbol,
      limit: limit
    }

    if (tradeId != null) {
      requestParams.fromId = tradeId;
    }

    if (startTime != null) {
      requestParams.startTime = startTime;
    }

    if (endTime != null) {
      requestParams.endTime = endTime;
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/aggTrades?${queryString}`);
    return request.data;
  }

  // K线数据
  async klines(symbol = 'BTCUSDT', limit = 500, interval = null, startTime = null, endTime = null) {
    let enums = {
      KLINE_INTERVAL_1MINUTE: '1m',
      KLINE_INTERVAL_3MINUTE: '3m',
      KLINE_INTERVAL_5MINUTE: '5m',
      KLINE_INTERVAL_15MINUTE: '15m',
      KLINE_INTERVAL_30MINUTE: '30m',
      KLINE_INTERVAL_1HOUR: '1h',
      KLINE_INTERVAL_2HOUR: '2h',
      KLINE_INTERVAL_4HOUR: '4h',
      KLINE_INTERVAL_6HOUR: '6h',
      KLINE_INTERVAL_8HOUR: '8h',
      KLINE_INTERVAL_12HOUR: '12h',
      KLINE_INTERVAL_1DAY: '1d',
      KLINE_INTERVAL_3DAY: '3d',
      KLINE_INTERVAL_1WEEK: '1w',
      KLINE_INTERVAL_1MONTH: '1M',
    }

    let requestParams = {
      symbol: symbol,
      limit: limit
    }

    if (interval != null) {
      requestParams.interval = interval;
    }
    else {
      requestParams.interval = enums.KLINE_INTERVAL_1DAY;
    }

    if (startTime != null) {
      requestParams.startTime = startTime;
    }

    if (endTime != null) {
      requestParams.endTime = endTime;
    }


    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/klines?${queryString}`);
    return request.data;
  }

  async tickerPrice(symbol = null) {

    let requestParams;

    if (symbol != null) {
      requestParams = {
        symbol: symbol
      };
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v3/ticker/price?${queryString}`);
    return request.data;
  }

  async ticker24hr(symbol = null) {

    let requestParams;

    if (symbol != null) {
      requestParams = {
        symbol: symbol
      };
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v1/ticker/24hr?${queryString}`);
    return request.data;
  }

  async bookTicker(symbol = null) {

    let requestParams;

    if (symbol != null) {
      requestParams = {
        symbol: symbol
      };
    }

    let queryString = querystring.stringify(requestParams);
    let request = await this.sendRequest(`/v3/ticker/bookTicker?${queryString}`);
    return request.data;
  }

  /**
   * Account endpoints
   */




  /**
   * Dependancies
   */

  sendRequest(url, postParams = null) {

    let response;

    if (postParams === null) {
      response = axios.get(this.apiBaseUrl + this.apiPath + url);
    }
    else {
      response = axios.post(this.apiBaseUrl + this.apiPath + url, postParams);
    }

    return response;
  }
}

module.exports = Binance;