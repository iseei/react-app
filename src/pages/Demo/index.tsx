import React, { FC, useState } from 'react';
import face from '../../assets/face.svg';
console.log('=======1.1', face);


interface Props {
}

const Demo: FC<Props> = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      Demo
      <img src={face} />
    </div>
  );
};

export default Demo;
