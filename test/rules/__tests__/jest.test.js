import leftPad from 'left-pad';

describe('jest rules', () => {
  it('pads', () => {
    expect(leftPad('a', 2)).toBe(' a');
  });

  // eslint-disable-next-line jest/no-identical-title
  it('pads', () => {
    expect(leftPad('b', 2)).toBe(' b');
  });

  // eslint-disable-next-line jest/no-focused-tests
  it.only('focused', () => {
    expect(true).toBe(true);
  });

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('skipped', () => {
    expect(true).toBe(true);
  });

  // eslint-disable-next-line jest/expect-expect
  it('has no assertion', () => {});

  it('conditional expect', () => {
    if (leftPad) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(true).toBe(true);
    }
  });
});
