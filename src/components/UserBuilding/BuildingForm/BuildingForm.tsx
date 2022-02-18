import React, { ChangeEvent, useEffect, useState } from 'react';
import './BuildingForm.scss';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import Input from '../../../core/Input/Input';
import countriesData from '../../../assets/moc/countriesList.json';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import { addBuilding, setFormMode, updateBuilding } from '../../../redux/userBuildingSlice';
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
      countryName: formData.countryName,
      countryCode: formData.countryCode,
      position: formData.position,
      id: formData.id,
    };

    if (formMode === 'ADD') {
      const { position, name } = JSON.parse(formData.selectLocation);
      building.position = position;
      building.countryName = name;
      dispatch(addBuilding(building));
      toast.success('Created Successfully!');
    } else {
      dispatch(updateBuilding(building));
      toast.success('This building was edited successfully.');
    }
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
          id="selectLocation"
          placeholder="Building Location"
          options={countries}
          value={selectedBuilding.countryCode}
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
