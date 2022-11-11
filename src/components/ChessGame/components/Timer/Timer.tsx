const withLeadingZeros = (time: number) => `${`${time}`.padStart(2, '0')}`;

const formattedTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${hours ? `${withLeadingZeros(hours)}` : ''} ${withLeadingZeros(
    minutes
  )}:${withLeadingZeros(seconds)}`;
};

const Timer = ({ whiteTime, blackTime }: { whiteTime: number; blackTime: number }) => {
  return (
    <div className='flex flex-wrap gap-4 items-center'>
      <div className='flex gap-4 font-bold text-4xl'>
        <div className='self-center'>White:</div>
        <div className='text-4xl lg:text-6xl'>{formattedTime(whiteTime)}</div>
      </div>

      <div className='flex gap-4 font-bold text-4xl'>
        <div className='self-center'>Black:</div>

        <div className='text-4xl lg:text-6xl'>{formattedTime(blackTime)}</div>
      </div>
    </div>
  );
};

export default Timer;
