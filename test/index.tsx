import React from 'react';

type Props = {
  isTruthy: string;
};

export default class Bool extends React.Component<Props> {
  render() {
    return !!this.props.isTruthy;
  }
}

export function Hook() {
  React.useEffect(() => {
    localStorage.setItem('formData', 'DATA');
  });

  return <Bool />;
}
