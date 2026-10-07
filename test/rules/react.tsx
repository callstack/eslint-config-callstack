import React, { useCallback } from 'react';

type Props = { label: string; onPress: () => void };

export function Button({ label, onPress }: Props) {
  const handlePress = useCallback(() => {
    onPress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <button onClick={handlePress}>{label}</button>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        // eslint-disable-next-line react/jsx-key
        <li>{item}</li>
      ))}
    </ul>
  );
}
