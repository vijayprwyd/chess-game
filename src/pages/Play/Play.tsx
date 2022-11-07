import { useState } from 'react';

import ChessGame from 'components/ChessGame';
import StartGameForm from 'components/StartGameForm';

const Play = () => {
  const [timeLimit, setTimeLimit] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(true);

  const handleStartGame = (time?: number) => {
    setTimeLimit(time);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className='max-w-md mx-auto flex justify-center items-center min-h-screen'>
        <StartGameForm onStartClick={handleStartGame} />
      </div>
    );
  }

  return (
    <div className='my-auto flex justify-center min-h-screen items-center min-w-[592px] mx-4'>
      <ChessGame timeLimit={timeLimit} onStartNewGame={() => setShowForm(true)} />
    </div>
  );
};

export default Play;
