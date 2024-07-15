export default {
  error,
  debug,
  trace,
};
const isTrace = false;
function error(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.error(...args);
}

function debug(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(...args);
}

function trace(...args: unknown[]) {
  // eslint-disable-next-line no-console
  isTrace && console.trace(...args);
}
