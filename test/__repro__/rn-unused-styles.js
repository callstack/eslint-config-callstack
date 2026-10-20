import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  used: { flex: 1 },
  unused: { flex: 2 },
});

export default function Screen() {
  return <View style={styles.used} />;
}
