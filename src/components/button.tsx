import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button className='bg-black text-white py-5 px-10 text-center rounded-md text-lg font-bold' onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
