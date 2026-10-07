export function catchOrReturn() {
  // eslint-disable-next-line promise/catch-or-return, promise/prefer-await-to-then
  fetch('/').then((response) => response.json());
}

export function alwaysReturn() {
  return (
    fetch('/')
      // eslint-disable-next-line promise/always-return, promise/prefer-await-to-then
      .then((response) => {
        console.log(response);
      })
      // eslint-disable-next-line promise/prefer-await-to-then
      .catch(() => null)
  );
}

export function paramNames() {
  // eslint-disable-next-line promise/param-names
  return new Promise((ok, fail) => (Math.random() ? ok() : fail()));
}

export async function preferAwait() {
  const response = await fetch('/');
  return response.json();
}
