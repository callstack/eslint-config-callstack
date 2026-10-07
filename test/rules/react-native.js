import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: { flex: 1 },
  // eslint-disable-next-line react-native/no-unused-styles
  unused: { flex: 2 },
});

export function Screen() {
  return (
    <View style={styles.container}>
      {/* eslint-disable-next-line react-native/no-raw-text */}
      <View>raw text</View>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ fontSize: 12 }}>inline</Text>
      {/* eslint-disable-next-line react-native/no-color-literals, react-native/no-inline-styles */}
      <Text style={{ color: '#fff' }}>color</Text>
      {/* eslint-disable-next-line react-native-a11y/has-valid-accessibility-role */}
      <TouchableOpacity accessibilityRole="nope" />
      {/* `react-native-a11y/has-accessibility-hint` is off */}
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go" />
    </View>
  );
}
