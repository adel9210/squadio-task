import React, { ChangeEvent, useEffect, useState } from 'react';
import './BuildingForm.scss';
import Input from '../../../core/Input/Input';
import countriesData from '../../../assets/moc/countriesList.json';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';

interface IForm {
    buildingName: string,
    buildingLocation: string[]
}

type TFormMode = 'ADD' | 'EDIT';

const BuildingForm = ({ mode }: {mode:TFormMode}) => {
  const [countries] = useState(countriesData);
  const [formData, setFormData] = useState<IForm | any>();

  const formChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formSubmitHandler = () => {
    console.log(formData);
  };

  useEffect(() => {
    if (mode === 'ADD') {
      setFormData({ buildingName: 'Building Name' });
    }
  }, []);

  return (
    <form className="building-form">
      <h2 className="building-form__title">{formData?.buildingName}</h2>
      <div className="building-form__group">
        <Input value={formData?.buildingName} id="buildingName" placeholder="Building Name" onChange={formChangeHandler} label="Building Name" />
      </div>
      <div className="building-form__group">
        <Select id="selectLocation" placeholder="Building Location" options={countries} keyName="name" keyValue="id" onChange={formChangeHandler} label="Building Location" />
      </div>
      <div className="building-form__actions">
        <Button type="secondary">Cancel</Button>
        <Button onClick={formSubmitHandler} type="primary">{mode === 'EDIT' ? 'Edit' : 'Create'}</Button>

      </div>
    </form>

  );
};
export default BuildingForm;
