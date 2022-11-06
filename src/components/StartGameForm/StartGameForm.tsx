import { useState } from 'react';

import Button from '../Button';
import Input from '../Input';

const StarGameForm = ({ onStartClick }: { onStartClick: (time?: number) => void }) => {
  const [time, setTime] = useState<number>();

  const handleSubmit = () => {
    onStartClick(time);
  };

  return (
    <form className='flex flex-col gap-4 w-full'>
      <Input
        name='time'
        label='Time (in seconds), optional'
        type='number'
        onChange={(evt) => setTime(Number(evt.target.value))}
      />

      <Button onClick={handleSubmit}>Start Game</Button>
    </form>
  );
};

export default StarGameForm;
