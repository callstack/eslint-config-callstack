import React from 'react';
import { PlatformColor, Text, View } from 'react-native';

const colorName = 'label';

export function Screen() {
  return (
    <View>
      {/* eslint-disable-next-line react-native/no-raw-text */}
      <View>raw text</View>
      {/* eslint-disable-next-line @react-native/platform-colors */}
      <Text style={{ color: PlatformColor(colorName) }}>color</Text>
    </View>
  );
}
