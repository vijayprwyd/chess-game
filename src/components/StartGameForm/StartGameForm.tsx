import { MouseEvent, useState } from 'react';

import Button from '../Button';
import Input from '../Input';

const StarGameForm = ({ onStartClick }: { onStartClick: (time?: number) => void }) => {
  const [time, setTime] = useState<number>(0);

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();
    onStartClick(time);
  };

  return (
    <form className='flex flex-col gap-8 w-full'>
      <div className='font-bold'>Please enter a time ( skip to play without timer )</div>

      <div className='flex flex-wrap gap-4 justify-between'>
        {[1, 3, 5, 10].map((duration) => (
          <button
            key={duration}
            onClick={(e) => {
              e.preventDefault();
              setTime(duration * 60);
            }}
            className={`${
              time === duration * 60 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
            } hover:bg-gray-400 hover:text-gray-800  font-bold py-2 px-4 rounded`}>
            {duration} min
          </button>
        ))}
      </div>

      <Input
        name='time'
        label='Custom Time (in seconds)'
        type='number'
        onChange={(evt) => setTime(Number(evt.target.value))}
      />

      <Button onClick={handleSubmit}>Start Game</Button>
    </form>
  );
};

export default StarGameForm;
