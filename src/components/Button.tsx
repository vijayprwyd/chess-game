import { ButtonHTMLAttributes } from 'react';

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    type='submit'
    className='bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'
    {...props}
  />
);

export default Button;
