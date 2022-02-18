import React from 'react';
import './BuildingDetails.scss';
import { useSelector } from 'react-redux';
import BuildingForm from '../BuildingForm/BuildingForm';
import BuildingLocation from '../BuildingLocation/BuildingLocation';
import { RootState } from '../../../redux/store';

const BuildingDetails = () => {
  const formMode = useSelector((state: RootState) => state.usersBuildings.FormMode);

  return (
    <div className="building-details">
      {formMode ? <BuildingForm /> : <BuildingLocation />}
    </div>
  );
};

export default BuildingDetails;
