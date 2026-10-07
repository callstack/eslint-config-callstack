import React, { useEffect, useState } from 'react';

// `react/prop-types` and `react/display-name` are off
export function Greeting({ name }) {
  return <p>{name}</p>;
}

export const Memo = React.memo(({ name }) => <p>{name}</p>);

export function List({ items }) {
  return (
    <ul>
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <li>{item}</li>
      ))}
    </ul>
  );
}

export function Hooks({ enabled, id }) {
  if (enabled) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useState(0);
  }

  useEffect(() => {
    console.log(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export class Counter extends React.Component {
  state = { count: 0 };

  increment() {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.count = this.state.count + 1;
  }

  render() {
    return (
      // eslint-disable-next-line react/jsx-no-target-blank
      <a href="https://callstack.com" target="_blank">
        {this.state.count}
      </a>
    );
  }
}

// only one stateful component per file is allowed
// eslint-disable-next-line react/no-multi-comp
export class Another extends React.Component {
  render() {
    return null;
  }
}
