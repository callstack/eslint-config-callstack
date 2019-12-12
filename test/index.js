// @flow
import React from 'react';

type Props = {
  isTruthy: string,
};

export default class Bool extends React.Component<Props> {
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
  React.useEffect(() => {
    try {
      localStorage.setItem('formData', 'data');
    } catch (_hugeObject) {
      // handled
    }
  });

  return <Bool />;
}
