import { PlatformColor, DynamicColorIOS } from 'react-native';

// Invalid
// eslint-disable-next-line @react-native/platform-colors
PlatformColor(); // required at least one argument
// eslint-disable-next-line @react-native/platform-colors
PlatformColor([], {}); // arguments must be string literals
// eslint-disable-next-line @react-native/platform-colors
DynamicColorIOS('red'); // required object as first argument

// Valid
PlatformColor('bogusName', 'linkColor');
PlatformColor('label');
PlatformColor('@android:color/holo_blue_bright');

export const customDynamicTextColor = DynamicColorIOS({
  dark: 'lightskyblue',
  light: 'midnightblue',
});

export const customContrastDynamicTextColor = DynamicColorIOS({
  dark: 'darkgray',
  light: 'lightgray',
  highContrastDark: 'black',
  highContrastLight: 'white',
});
