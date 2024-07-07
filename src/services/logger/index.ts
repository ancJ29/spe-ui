export default {
  error,
  debug,
};

function error(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.error(...args);
}

function debug(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.log(...args);
}
