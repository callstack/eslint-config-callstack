function load(): Promise<number> {
  return Promise.resolve(1);
}

export function floating(): void {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  load();
}

export function optionalChain(obj?: { a?: { b?: number } }) {
  // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
  return obj && obj.a && obj.a.b;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const unused = 1;

// `_`-prefixed args are allowed, `no-undef` is off for TS
export function ignoredArgs(_arg: string): HTMLElement | undefined {
  return undefined;
}

// overloads are not reported by `no-dupe-class-members`
export class Overloads {
  method(a: string): string;
  method(a: number): number;
  method(a: string | number) {
    return a;
  }
}
