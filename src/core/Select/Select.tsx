import './Select.scss';
import { HTMLAttributes } from 'react';

// interface ISelect {
//     options: any[],
//     keyName: string,
//     keyValue: string,
//     onChange: ChangeEventHandler,
//     label: string,
//     id: string,
//     placeholder: string
// }

interface SelectProps extends HTMLAttributes<HTMLElement> {
    keyName: string,
    keyValue: string,
    label: string,
    options: any[],
    onChange: any

}
const Select = (props:SelectProps) => {
  const {
    options,
    keyName,
    keyValue,
    placeholder,
    label,
    id,
    onChange,
  } = props;
  return (
    <>
      <label className="select-label" htmlFor="selectId">{label}</label>
      <select onChange={(e) => onChange(e)} placeholder={placeholder} id={id} className="select">
        {options.map((option) => (
          <option key={option[keyName]} value={option[keyValue]}>{option.name}</option>
        ))}
      </select>
    </>

  );
};
export default Select;
