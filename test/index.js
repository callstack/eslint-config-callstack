// @flow
import React from 'react';

type Props = {
  isTruthy: string,
};

export default class Bool extends React.Component<Props> {
  render() {
    return !!this.props.isTruthy;
  }
}
