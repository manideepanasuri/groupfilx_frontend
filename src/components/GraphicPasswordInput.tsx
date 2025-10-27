import React, { useState } from 'react';
import { useForm } from 'react-hook-form'; // Use for easier form handling

interface GraphicPasswordInputProps {
  onGraphicPasswordChange: (password: string) => void;
}

const GraphicPasswordInput: React.FC<GraphicPasswordInputProps> = ({ onGraphicPasswordChange }) => {
  const { register, handleSubmit } = useForm();

  const { styles } = useTailwind({
    baseStyle: {
      input: {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '8px',
        fontSize: '16px',
      },
    },
  });

  const onSubmit = (data: { graphic_password: string }) => {
    onGraphicPasswordChange(data.graphic_password);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="graphic_password" className={styles.label}>
        Graphic Password:
      </label>
      <input
        type="text"
        id="graphic_password"
        className={styles.input}
        placeholder="Enter graphic password"
        {...register('graphic_password')}
      />
      <button type="submit" className={styles.button}>
        Verify
      </button>
    </form>
  );
};

export default GraphicPasswordInput;