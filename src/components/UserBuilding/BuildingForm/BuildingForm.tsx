import React, { ChangeEvent, useState } from 'react';
import './BuildingForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../core/Input/Input';
import countriesData from '../../../assets/moc/countriesList.json';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import { addBuilding } from '../../../redux/userBuildingSlice';
import { RootState } from '../../../redux/store';

interface IForm {
    buildingName: string,
    buildingLocation: string[]
}

const formInitialState:IForm = {
  buildingName: 'Building Name',
  buildingLocation: ['AFG'],
};

const BuildingForm = () => {
  const [countries] = useState(countriesData);
  const [formData, setFormData] = useState<IForm | any>(formInitialState);
  const isEdit = useSelector((state: RootState) => state.usersBuildings.isEditMode);
  const dispatch = useDispatch();

  const formChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formSubmitHandler = () => {
    dispatch(addBuilding(formData));
    setFormData(formInitialState);
  };

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
        <Button onClick={formSubmitHandler} type="primary">{isEdit ? 'Edit' : 'Create'}</Button>

      </div>
    </form>

  );
};
export default BuildingForm;
