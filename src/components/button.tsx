import React from 'react';

interface ButtonProps {
  text: string;
  widthFull?: boolean; // Torne essa prop opcional com o operador "?"
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, widthFull = false, onClick }) => {
  return (
    <button 
      className={`bg-black text-white py-4 px-10 ${widthFull ? 'w-full' : ''} text-center rounded-md text-lg font-bold`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
