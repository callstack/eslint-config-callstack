import React from 'react';
import { Text, View } from 'react-native';

export function Bad({ name }) {
  return (
    <View>
      {`hello`}
      {`hi ${name}`}
    </View>
  );
}

export function Good({ name }) {
  return (
    <View>
      <Text>{`hello`}</Text>
      <Text>{`hi ${name}`}</Text>
    </View>
  );
}
