/*eslint-disable no-undef,no-unused-vars*/

// Incorrect
const value1 = !foo == null; // eslint-disable-line no-constant-binary-expression

// Correct
const value2 = !(foo == null);
