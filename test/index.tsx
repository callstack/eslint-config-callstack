import React from 'react';

type Props = {
  isTruthy: string;
};

export default class Bool extends React.Component<Props> {
  render() {
    return !!this.props.isTruthy;
  }

  onEnterKeyDown = async () => {
    let token = await this.current?.keepOwnership();
    return this.props.updateMode(token);
  };
}

export function Hook() {
  const map = new Map();

  React.useEffect(() => {
    map.get('formData');
  }, [map]);

  return <Bool />;
}
