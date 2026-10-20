import React from 'react';

export const Hello = ({ name }: { name: string }) => <div>{name}</div>;

export default function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((i) => (
        <li>{i}</li>
      ))}
    </ul>
  );
}
