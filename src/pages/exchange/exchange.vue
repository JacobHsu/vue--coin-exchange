<template>
  <div class="container exchange" :class="skin">
    exchange

  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      defaultPath: 'btc_usdt',
      basecion: 'usdt',
      currentCoinIsFavor: false,
      skin: 'night', // 皮肤样式day&night
      coinInfo: {},
      currentCoin: {
        base: '',
        coin: '',
        symbol: ''
      }
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  watch: {},
  methods: {
    init() {
      var params = this.$route.params.pair
      if (params === undefined) {
        this.$router.push('/exchange/' + this.defaultPath)
        params = this.defaultPath
      }
      var coin = params.toUpperCase().split('_')[0]
      this.currentCoin.coin = coin
      this.getCoinInfo()
    },
    currentCoinFavorChange() {
      if (!this.isLogin) {
        this.$Message.warning(this.$t('common.logintip'))
        return
      }
      if (this.collecRequesting) {
        return
      }
      const symbol = this.currentCoin.symbol
      this.collecRequesting = true
      if (this.currentCoinIsFavor) {
        // 已收藏,去取消收藏
        this.$http
          .post(this.host + this.api.exchange.favorDelete, {
            symbol
          })
          .then(response => {
            var resp = response.body
            if (resp.code === 0) {
              this.$Message.info(this.$t('exchange.cancel_favorite'))
              this.getSymbol() // 刷新状态
              this.currentCoinIsFavor = false
            }
            this.collecRequesting = false
          })
      } else {
        // 去添加收藏
        this.$http
          .post(this.host + this.api.exchange.favorAdd, { symbol })
          .then(response => {
            var resp = response.body
            if (resp.code === 0) {
              this.$Message.info(this.$t('exchange.do_favorite'))
              this.getSymbol() // 刷新状态
              this.currentCoinIsFavor = true
            }
            this.collecRequesting = false
          })
      }
    },
    getCoinInfo() {
      this.$http
        .post(this.host + this.api.market.coinInfo, {
          unit: this.currentCoin.coin
        })
        .then(response => {
          var resp = response.body
          if (resp != null) {
            this.coinInfo = resp
          }
        })
    }
  },
  components: {}
}
</script>

<style scoped lang="scss">
@import url(../../assets/css/exchange.css);
$night-bg: #0b1520;
$night-headerbg: #27313e;
$night-contentbg: #192330;
$night-color: #fff;

.exchange {
  color: #fff;
  background-color: #0b1520;
  .main {
    width: 99%;
    margin-left: 0.5%;
    display: flex;
    margin-top: 5px;
    .left {
      flex: 0 0 20%;
      border-radius: 0px;
      margin-right: 10px;
      .handlers {
        font-size: 0;
        padding: 10px 20px;
        background-color: #192330;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        .handler {
          display: inline-block;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          cursor: pointer;
          &.handler-all {
            background-image: url('../../assets/images/exchange/plate_all.png');
            &.active {
              background-image: url('../../assets/images/exchange/plate_all_active.png');
            }
          }
          &.handler-green {
            background-image: url('../../assets/images/exchange/plate_green.png');
            &.active {
              background-image: url('../../assets/images/exchange/plate_green_active.png');
            }
          }
          &.handler-red {
            background-image: url('../../assets/images/exchange/plate_red.png');
            &.active {
              background-image: url('../../assets/images/exchange/plate_red_active.png');
            }
          }
        }
      }
      .plate-nowprice {
        text-align: center;
        background-color: #27313e;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        .price {
          font-size: 18px;
          margin-right: 10px;
        }
        .price-cny {
          font-size: 12px;
          margin-left: 10px;
          font-weight: 400;
          color: rgba(219, 222, 246, 0.3);
        }
      }
    }
    .center {
      flex: 0 0 60%;
      margin-right: 5px;
      .imgtable {
        height: 350px;
        position: relative;
        overflow: hidden;
        margin-bottom: 5px;
        .handler {
          position: absolute;
          top: 10px;
          right: 40px;
          z-index: 1000;
          > span {
            background-color: #2c3b59;
            color: #c7cce6;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 13px;
            opacity: 0.5;
            &.active {
              opacity: 1;
            }
          }
        }
      }
      .trade_wrap {
        .trade_menu {
          position: relative;
          background-color: #192330;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          border-bottom: 1px solid #27313e;
          font-size: 0;
          height: 40px;
          line-height: 40px;
          > span {
            font-size: 16px;
            padding: 11px 20px;
            cursor: pointer;
            &.active {
              color: #fff;
              border-bottom: 2px solid #f0a70a;
            }
            &:first-child {
              border-top-left-radius: 0px;
            }
          }
          .fee-wrap {
            position: absolute;
            top: 0;
            right: 20px;
            font-size: 12px;
            > span {
              margin-right: 10px;
              color: #7c7f82;
            }
            > a {
              vertical-align: middle;
            }
          }
        }
        .trade_panel {
          position: relative;
          .mask {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            background-color: rgba(0, 52, 77, 0.8);
            justify-content: center;
            align-items: center;
            z-index: 100;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }
          .publish-mask {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 37, 64, 0.93);
            justify-content: center;
            align-items: center;
            z-index: 101;
            font-size: 24px;
            border-radius: 0px;
            // color: #bcd7e6;
          }
        }
        .trade_panel .panel .hd {
          border-bottom: none;
          b {
            color: #fff;
          }
          a {
            color: #f0a70a;
          }
        }
      }
    }
    .right {
      flex: 0 0 19%;
      margin-right: 5px;
      .coin-menu {
        height: 785px;
        background-color: #192330;
        margin-bottom: 10px;
        border-radius: 0px;
      }
    }
  }
  .symbol {
    display: flex;
    justify-content: space-between;
    padding: 15px 30px;
    margin-bottom: 5px;
    align-items: center;
    background-color: #192330;
    line-height: 1;
    border-radius: 0px;
    .item {
      .price-cny {
        font-size: 12px;
        color: #546886;
      }
      .coin {
        font-size: 20px;
      }
      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }
      .num {
        font-size: 12px;
        color: #fff;
      }
      > img {
        display: block;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }
  .order {
    width: 98.6%;
    margin-left: 0.5%;
    min-height: 227px;
    margin-bottom: 10px;
    .order-handler {
      // background-color: #192330;
      background-color: #192330;
      font-size: 0;
      border-radius: 6px;
      // line-height: 38px;
      > span {
        padding: 0 20px;
        font-size: 14px;
        display: inline-block;
        color: #fff;
        cursor: pointer;
        line-height: 40px;
        background-color: #192330;
        &.active {
          color: #f0a70a;
          background-color: #27313e;
        }
        &:first-child {
          border-top-left-radius: 0px;
        }
        &:last-child {
          border-top-right-radius: 0px;
        }
      }
    }
  }
}
.exchange.day {
  color: #333;
  background-color: #fff;
  .main {
    .left {
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;
      .handlers {
        background-color: #fff;
      }
      .plate-nowprice {
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      }
    }
    .imgtable {
      border-radius: 6px;
      box-shadow: 0 0 2px #ccc;
      .handler {
        > span {
          border: 1px solid #333;
        }
      }
    }
    .trade_wrap {
      box-shadow: 0 0 2px #ccc;
      .trade_menu {
        background-color: #fafafa;
        > span {
          background-color: #fafafa;
          border-right: 1px solid #f0f0f0;
          &.active {
            background-color: #fff;
            color: #f0a70a;
          }
          &:last-child {
            border-top-right-radius: 6px;
          }
        }
        .ivu-icon {
          color: #333 !important;
        }
      }
      .trade_panel {
        box-shadow: 0 0 2px #ccc;
        .mask {
          background-color: rgba(0, 52, 77, 0.8);
          color: #fff;
        }
      }
      .trade_panel .panel .hd {
        border-bottom: none;
        b {
          color: #333;
        }
        a {
          color: #f0a70a;
        }
      }
    }
    .right {
      .coin-menu {
        background-color: #fff;
        box-shadow: 0 2px 2px #ccc;
      }
      .trade-wrap {
        box-shadow: 0 0 2px #ccc;
        border-radius: 6px;
      }
      // .ivu-table-wrapper{
      //         box-shadow:0 0 2px #ccc;
      //       }
    }
  }
  .symbol {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;
    .item {
      .text {
        color: #999;
      }
      .num {
        color: #333;
      }
    }
  }
  .order {
    box-shadow: 0 2px 2px #ccc;
    min-height: 227px;
    .order-handler {
      margin-right: -2px;
      background-color: #fff;
      > span {
        color: #333;
        background-color: #fafafa;
        box-shadow: 0 0 2px #ccc;
        &.active {
          color: #f0a70a;
          background-color: #fff;
        }
      }
    }
  }
}
#kline_container {
  background: #192330;
}

.coin-info {
  color: #8f9ca5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  padding-top: 15px;
}
</style>
