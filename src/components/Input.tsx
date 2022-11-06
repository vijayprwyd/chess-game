import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input = (props: InputProps) => {
  const { label, name, ...rest } = props;

  return (
    <div>
      <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={name}>
        {label}
      </label>
      <input
        className='shadow appearance-none border border-blue-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
        id={name}
        type='text'
        name={name}
        {...rest}
      />
    </div>
  );
};

export default Input;
