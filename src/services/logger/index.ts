export default {
  error,
};

export function error(...args: unknown[]) {
  // eslint-disable-next-line no-console
  console.error(...args);
}
