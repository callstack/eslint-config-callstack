const JS = ['.js', '.jsx'];
const TS = ['.ts', '.tsx', '.d.ts'];

function generateExtensionsForPlatform(baseExts, platform) {
  return baseExts.map(ext => `.${platform}${ext}`);
}

const JS_REACT_NATIVE = [
  ...generateExtensionsForPlatform(JS, 'android'),
  ...generateExtensionsForPlatform(JS, 'ios'),
  ...generateExtensionsForPlatform(JS, 'native'),
];

const TS_REACT_NATIVE = [
  ...generateExtensionsForPlatform(TS, 'android'),
  ...generateExtensionsForPlatform(TS, 'ios'),
  ...generateExtensionsForPlatform(TS, 'native'),
];

module.exports = {
  JS,
  TS,
  JS_REACT_NATIVE,
  TS_REACT_NATIVE,
  ALL: [...TS, ...JS, ...TS_REACT_NATIVE, ...JS_REACT_NATIVE],
};
