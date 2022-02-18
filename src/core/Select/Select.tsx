import './Select.scss';
import { HTMLAttributes } from 'react';

interface SelectProps extends HTMLAttributes<HTMLElement> {
    keyName: string,
    keyValue: string,
    label: string,
    options: any[],
    value: string,
    onChange: any

}

const Select = (props: SelectProps) => {
  const {
    options,
    keyName,
    keyValue,
    placeholder,
    label,
    id,
    value,
    onChange,
  } = props;
  return (
    <>
      <label className="select-label" htmlFor="selectId">{label}</label>
      <select value={value} onChange={(e) => onChange(e)} placeholder={placeholder} id={id} className="select">
        {options.map((option, index) => (
          <option
            key={option[keyName]}
            data-object={JSON.stringify(option)}
            value={option[keyValue]}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>

  );
};
export default Select;
