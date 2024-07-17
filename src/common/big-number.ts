import BigNumber from "bignumber.js"; // cspell:disable-line

type BN = number | string;

function add(...b: [BN, ...BN[]]) {
  return b
    .reduce((res, v) => {
      return res.plus(v);
    }, new BigNumber("0"))
    .dp(8)
    .toString();
}

function div(a: BN, b: BN, precision = 8) {
  return new BigNumber(a).div(b).dp(precision).toString();
}

function abs(a: BN) {
  return new BigNumber(a).abs().dp(8).toString();
}

function mod(a: BN, b: BN) {
  return new BigNumber(a).mod(b).dp(8).toString();
}

function sub(a: BN, b: BN) {
  return new BigNumber(a).minus(b).dp(8).toString();
}

function mul(...b: [BN, ...BN[]]) {
  return b
    .reduce((res, v) => {
      return res.times(v);
    }, new BigNumber("1"))
    .dp(8)
    .toString();
}

function max(a: BN, b: BN) {
  return new BigNumber(a).gt(b) ? a.toString() : b.toString();
}

function min(a: BN, b: BN) {
  return new BigNumber(a).lt(b) ? a.toString() : b.toString();
}

function gt(a: BN, b: BN) {
  return new BigNumber(a).gt(b);
}

function gte(a: BN, b: BN) {
  return new BigNumber(a).gte(b);
}

function lt(a: BN, b: BN) {
  return new BigNumber(a).lt(b);
}

function lte(a: BN, b: BN) {
  return new BigNumber(a).lte(b);
}

function precision(a: BN) {
  return new BigNumber(a).dp();
}

function eq(a: BN, b: BN) {
  return new BigNumber(a).eq(b);
}

function formatNumberWithCommas(number: BN, decimalPlaces = 2) {
  BigNumber.config({
    FORMAT: {
      decimalSeparator: ".",
      groupSeparator: ",",
      groupSize: 3,
    },
  });
  const bigNumber = new BigNumber(number);
  if (!bigNumber.isFinite()) {
    return "--";
  }
  return bigNumber.toFormat(decimalPlaces);
}

const TradeFormula = {
  SPOT_LIMIT: {
    orderPrice: (
      price: BN,
      qty: BN,
      usdtAvailable: BN,
      btcAvailable: BN,
      isBuying: boolean, // eslint-disable-line
    ) => {
      const orderValue = mul(qty, price); // qty * price;
      const percentQtyBuy = mul(div(orderValue, usdtAvailable), 100); // (orderValue / usdtAvailable) * 100;
      const percentQtySell = mul(div(qty, btcAvailable), 100); // (qty / btcAvailable) * 100;
      const maxBuyingAmount = div(usdtAvailable, price);
      const maxSellingAmount = mul(btcAvailable, price);
      return {
        orderPrice: price,
        orderValue,
        percentQtyBuy,
        percentQtySell,
        maxBuyingAmount,
        maxSellingAmount,
      };
    },
    qty: (
      qty: BN,
      orderPrice: BN,
      usdtAvailable: BN,
      btcAvailable: BN,
      isBuying: boolean,
    ) => {
      const ic = ["", undefined, "NaN"];
      if (ic.includes(qty as string)) {
        qty = "0";
      }
      if (ic.includes(orderPrice as string)) {
        orderPrice = "0";
      }
      if (ic.includes(orderPrice as string)) {
        orderPrice = "0";
      }
      if (isBuying) {
        const orderValue = mul(qty, orderPrice); // qty * orderPrice;
        const percentQty = mul(div(orderValue, usdtAvailable), 100); // (orderValue / usdtAvailable) * 100;
        return { qty, orderValue, percentQty };
      } else {
        const orderValue = mul(qty, orderPrice);
        const percentQty = div(mul(btcAvailable, qty), 100);
        return { qty, orderValue, percentQty };
      }
    },
    percentQty: (
      percent: BN,
      usdtAvailable: BN,
      btcAvailable: BN,
      orderPrice: BN,
      isBuying: boolean,
    ) => {
      if (isBuying) {
        const orderValue = mul(div(percent, 100), usdtAvailable);
        const qty = div(orderValue, orderPrice);
        return { percentQty: percent, orderValue, qty };
      } else {
        const qty = mul(div(percent, 100), btcAvailable); // (percent / 100) * state.btcAvailable;
        const orderValue = mul(qty, orderPrice); // qty * state.orderPrice;
        return { percentQty: percent, orderValue, qty };
      }
    },
    orderValue: (
      value: BN,
      orderPrice: BN,
      usdtAvailable: BN,
      btcAvailable: BN,
      isBuying: boolean,
    ) => {
      if (isBuying) {
        const qty = div(value, orderPrice); // value / state.orderPrice;
        const percentQty = mul(div(value, usdtAvailable), 100); //(value / state.usdtAvailable) * 100;
        return { orderValue: value, qty, percentQty };
      } else {
        const qty = div(value, orderPrice); // value / state.orderPrice;
        const percentQty = mul(div(qty, btcAvailable), 100); // (qty / state.btcAvailable) * 100;
        return { orderValue: value, qty, percentQty };
      }
    },
  },
};

export default {
  eq,
  abs,
  mod,
  add,
  div,
  sub,
  max,
  min,
  gt,
  gte,
  lt,
  lte,
  mul,
  precision,
  formatNumberWithCommas,
  TradeFormula,
};
