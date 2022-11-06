import { MovesProps } from './Moves.types';

const formattedMoves = (moves: string[]) => {
  const group = [];

  for (let i = 0; i < moves.length; i += 2) {
    group.push({
      sl: i / 2 + 1,
      w: moves[i],
      b: moves[i + 1] ?? '',
    });
  }

  return group;
};

const Moves = ({ history }: MovesProps) => {
  return (
    <div className='flex flex-col gap-4 flex-grow max-w-full'>
      <div className='max-h-[460px] overflow-auto' role='table'>
        {formattedMoves(history).map((move, index) => (
          <div
            role='row'
            key={index}
            className='grid grid-cols-3 gap-2 border-b border-gray-300 p-2 justify-center items-center'>
            <div role='cell'>{move.sl}</div>
            <div>{move.w}</div>
            <div>{move.b}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moves;
