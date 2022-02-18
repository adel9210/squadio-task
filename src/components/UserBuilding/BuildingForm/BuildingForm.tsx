import React, { ChangeEvent, useEffect, useState } from 'react';
import './BuildingForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Input from '../../../core/Input/Input';
import countriesData from '../../../assets/moc/countriesList.json';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import {
  addBuilding, setActiveBuilding, setFormMode, updateBuilding,
} from '../../../redux/userBuildingSlice';
import { RootState } from '../../../redux/store';
import { Building } from '../../../interfaces/Building.interface';

const BuildingForm = () => {
  const [countries] = useState(countriesData);
  const [formData, setFormData] = useState<Building | any>();
  const formMode = useSelector((state: RootState) => state.usersBuildings.FormMode);
  const selectedBuilding = useSelector((state: RootState) => state.usersBuildings.activeBuilding);
  const dispatch = useDispatch();

  const formChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const formSubmitHandler = () => {
    const building: Building = {
      buildingName: formData.buildingName,
      countryCode: formData.countryCode,
      countryName: formData.countryName,
      position: formData.position,
      id: uuidv4(),
    };

    if (formMode === 'ADD') {
      const { position, name } = countries.filter(
        (country) => country.id === formData.countryCode,
      )[0];
      building.position = position;
      building.countryName = name;
      dispatch(addBuilding(building));
      toast.success('Created Successfully!');
    } else {
      dispatch(updateBuilding(building));
      toast.success('This building was edited successfully.');
    }
    dispatch(setActiveBuilding(building));
    dispatch(setFormMode(null));
  };
  useEffect(() => {
    if (formMode === 'UPDATE') {
      setFormData(selectedBuilding);
    }
  }, []);

  return (
    <form className="building-form">
      <h2 className="building-form__title">{formData?.buildingName}</h2>
      <div className="building-form__group">
        <Input
          value={formData?.buildingName}
          id="buildingName"
          placeholder="Building Name"
          onChange={formChangeHandler}
          label="Building Name"
        />
      </div>
      <div className="building-form__group">
        <Select
          id="countryCode"
          placeholder="Building Location"
          options={countries}
          value={formData?.countryCode}
          keyName="name"
          keyValue="id"
          onChange={formChangeHandler}
          label="Building Location"
        />
      </div>
      <div className="building-form__actions">
        <Button onClick={() => dispatch(setFormMode(null))} type="secondary">Cancel</Button>
        <Button onClick={formSubmitHandler} type="primary">{formMode === 'UPDATE' ? 'Edit' : 'Create'}</Button>
      </div>
    </form>

  );
};
export default BuildingForm;
