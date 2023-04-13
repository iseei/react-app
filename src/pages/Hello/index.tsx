import React, { FC, useState } from 'react';

interface Props {
}

const Hello: FC<Props> = () => {
  const [value, setValue] = useState('');
  return (
    <div>Hello</div>
  );
};

export default Hello;
