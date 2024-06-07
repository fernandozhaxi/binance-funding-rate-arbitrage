
const BinanceApi = require('./lib/binanceApi');

const apiClient = new BinanceApi()
apiClient.ping().then(res => {
  console.log(res);
})