import { useState } from 'react';

import ChessGame from 'components/ChessGame';
import StartGameForm from 'components/StartGameForm';

const hasSavedGame = () => localStorage.getItem('chessHistory');

function ChessWidget() {
  const [timeLimit, setTimeLimit] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(!hasSavedGame());

  const handleStartClick = (time?: number) => {
    setTimeLimit(time);
    setShowForm(false);
  };

  if (showForm) {
    return (
      <div className='max-w-md mx-auto flex justify-center items-center min-h-screen'>
        <StartGameForm onStartClick={handleStartClick} />
      </div>
    );
  }

  return (
    <div className='my-auto flex justify-center min-h-screen items-center mx-4'>
      <ChessGame timeLimit={timeLimit} onStartNewGame={() => setShowForm(true)} />
    </div>
  );
}

export default ChessWidget;
