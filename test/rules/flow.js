// @flow

// eslint-disable-next-line ft-flow/no-weak-types
export const weak = (value: any): string => String(value);

// eslint-disable-next-line ft-flow/boolean-style, prettier/prettier
export const flag: bool = true;

type Props = {
  name: string,
  // eslint-disable-next-line ft-flow/no-weak-types
  callback: Function,
};

export function greet(props: Props): string {
  return props.name;
}

// return and parameter types are not required
export function untyped(value) {
  return value;
}
