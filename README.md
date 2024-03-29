# binance-funding-rate-arbitrage

一个支持在币安一键进行资金费套利的工具。

API 文档：https://binance-docs.github.io/apidocs/delivery/cn/#1045de04a1

## 功能：

- 1.开始套利

  - 使用现货账户的所有 USDT 购入比特币现货
  - 将现货账户中的比特币转入币本位合约账户
  - 开与比特币相等数量的合约，方向为空，杠杆为 1

- 2.结束套利

  - 平仓当前合约
  - 将币本位账户中的比特币转入现货账户
  - 卖出所有比特币，得到 USD
