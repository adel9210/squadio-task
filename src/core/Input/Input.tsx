import './Input.scss';
import { HTMLAttributes } from 'react';

interface InputProps extends HTMLAttributes<HTMLElement> {
    label: string,
    value: string
}

const Input = (props: InputProps) => {
  const { label } = props;
  return (
    <>
      <label className="select-label" htmlFor="selectId">{label}</label>
      <input {...props} className="input" />
    </>
  );
};

export default Input;
