// import { FunctionComponent } from 'react';
import './Button.scss';
import { HTMLAttributes } from 'react';

type TButtonType = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps extends HTMLAttributes<HTMLElement> {
  type: TButtonType;
}

const Button = (props:ButtonProps) => {
  const { type, children } = props;

  return <button {...props} type="button" className={`button button--${type}`}>{children}</button>;
};

export default Button;
