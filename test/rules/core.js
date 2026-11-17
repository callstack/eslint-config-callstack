// eslint-disable-next-line no-unused-vars
const unused = 1;

// `_`-prefixed args and caught errors are allowed
export function ignoredArgs(_arg) {
  try {
    return JSON.parse('{}');
  } catch (_error) {
    return null;
  }
}

export function restrictedGlobal() {
  // eslint-disable-next-line no-restricted-globals
  return location;
}

export function undefinedVariable() {
  // eslint-disable-next-line no-undef
  return notDefined;
}

// eslint-disable-next-line require-await
export async function noAwait() {
  return 1;
}

export function constantBinary(a) {
  // eslint-disable-next-line no-constant-binary-expression
  return !a == null;
}

export function dupeKeys() {
  // eslint-disable-next-line no-dupe-keys
  return { a: 1, a: 2 };
}

// eslint-disable-next-line prettier/prettier
export const notPretty = {a:1};
