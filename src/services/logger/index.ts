import { IS_DEV } from "@/domain/config";

const logIt = IS_DEV || localStorage.__LOG_IT__ === "true";

export default {
  error,
  debug,
  trace,
};
const isTrace = false;

function error(...args: unknown[]) {
  // eslint-disable-next-line no-console
  if (logIt) {
    // eslint-disable-next-line no-console
    console.error(...args);
  } else {
    // notify to dev
  }
}

function debug(...args: unknown[]) {
  if (logIt) {
    // eslint-disable-next-line no-console
    console.log(...args);
  } else {
    // notify to dev
  }
}

function trace(...args: unknown[]) {
  if (logIt) {
    // eslint-disable-next-line no-console
    isTrace && console.trace(...args);
  } else {
    // notify to dev
  }
}
