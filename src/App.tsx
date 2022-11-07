import { useState } from 'react';

import ChessGame from './components/ChessGame';
import StartGameForm from './components/StartGameForm/StartGameForm';

function App() {
  const [timeLimit, setTimeLimit] = useState<number | undefined>();
  const [showForm, setShowForm] = useState(true);

  if (showForm) {
    return (
      <div className='max-w-md mx-auto flex justify-center items-center min-h-screen'>
        <StartGameForm
          onStartClick={(time) => {
            setTimeLimit(time);
            setShowForm(false);
          }}
        />
      </div>
    );
  }

  return (
    <div className='my-auto flex justify-center min-h-screen items-center min-w-[592px] mx-4'>
      <ChessGame timeLimit={timeLimit} onStartNewGame={() => setShowForm(true)} />
    </div>
  );
}

export default App;
