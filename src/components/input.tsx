import React, { useState } from "react";
import InputMask from "react-input-mask";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  errorMessage?: string;
  mask?: string; // Adicione a prop mask
}

const Input: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder = "",
  required = false,
  errorMessage = "Este campo é obrigatório",
  mask,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-xs mb-1">
        {label}
      </label>
      {mask ? (
        <InputMask
          mask={mask}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
        >
          {(inputProps: any) => (
            <input
              {...inputProps}
              type={type}
              placeholder={placeholder}
              required={required}
              className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline input-placeholder ${
                touched && required && !value ? "border-red-500" : ""
              }`}
            />
          )}
        </InputMask>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline input-placeholder ${
            touched && required && !value ? "border-red-500" : ""
          }`}
        />
      )}
      {touched && required && !value && (
        <p className="text-red-500 text-xs italic">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
