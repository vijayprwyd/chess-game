import { useState } from 'react';

import { Player } from 'types/chess';

export interface UseChessActionType {
  resign: (player: Player) => void;
  draw: () => void;
  resignedPlayer: Player | undefined;
  drawn: boolean;
}

const useChessActions = (): UseChessActionType => {
  const [resignedPlayer, setResignedPlayer] = useState<Player>();
  const [drawn, setDrawn] = useState(false);

  const resign = (player: Player) => setResignedPlayer(player);

  const draw = () => setDrawn(true);

  return {
    resign,
    draw,
    resignedPlayer,
    drawn,
  };
};

export default useChessActions;
