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

function div(a: BN, b: BN) {
  return new BigNumber(a).div(b).dp(8).toString();
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
      decimalSeparator: '.',
      groupSeparator: ',',
      groupSize: 3,
    },
  });
  const bigNumber = new BigNumber(number);
  if (!bigNumber.isFinite()) {
    return "--";
  }
  return bigNumber.toFormat(decimalPlaces);

}

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
};