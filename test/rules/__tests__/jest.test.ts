import leftPad from 'left-pad';

describe('jest rules in TS', () => {
  it('pads', () => {
    expect(leftPad('a', 2)).toBe(' a');
  });

  // eslint-disable-next-line jest/no-focused-tests, jest/no-test-prefixes
  fit('focused', () => {
    expect(true).toBe(true);
  });
});
