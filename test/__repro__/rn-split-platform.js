import React from 'react';
import { ProgressBarAndroid, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  b: { flex: 1 },
  a: { flex: 2 },
});

export default function Screen() {
  return (
    <View style={[styles.a]}>
      <ProgressBarAndroid style={styles.b} />
    </View>
  );
}
