import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const primary =
  'bg-blue-500 hover:bg-blue-700 disabled:bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed';
const secondary =
  'bg-white bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed	enabled:hover:bg-gray-500 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow';

const Button = (props: ButtonProps) => {
  const { variant = 'primary', ...rest } = props;

  return <button className={variant === 'primary' ? primary : secondary} {...rest} />;
};

export default Button;
