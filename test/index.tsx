// @flow
import React from 'react';
import leftPad from 'left-pad'; // eslint-disable-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
// resolves JS extensions
import Component from './Component'; // resolves .js
import ComponentAndroid from './ComponentAndroid'; // resolves .android.js
import ComponentIos from './ComponentIos'; // resolves .ios.js
import ComponentNative from './ComponentNative'; // resolves .native.js
// resolves TSX? extensions
import ComponentTS from './ComponentTS'; // resolves .ts
import ComponentAndroidTSX from './ComponentAndroidTSX'; // resolves .android.tsx
import ComponentIosTS from './ComponentIosTS'; // resolves .ios.ts
import ComponentNativeTSX from './ComponentNativeTSX'; // resolves .native.tsx

type Props = {
  isTruthy: string;
};

export default class Bool extends React.Component<Props> {
  Component = Component;
  ComponentAndroid = ComponentAndroid;
  ComponentIos = ComponentIos;
  ComponentNative = ComponentNative;
  ComponentTS = ComponentTS;
  ComponentAndroidTSX = ComponentAndroidTSX;
  ComponentIosTS = ComponentIosTS;
  ComponentNativeTSX = ComponentNativeTSX;

  render() {
    return !!this.props.isTruthy;
  }

  onEnterKeyDown = async () => {
    let token = await this.current?.keepOwnership();
    return this.props.updateMode(token);
  };

  animate = (_: ?number) => {};
}

export function Hook() {
  const map = new Map();

  React.useEffect(() => {
    try {
      map.get('formData');
    } catch (_hugeObject) {
      // handled
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Bool />;
}
