import React from 'react';
import './BuildingDetails.scss';
// import BuildingForm from '../BuildingForm/BuildingForm';
import BuildingLocation from '../BuildingLocation/BuildingLocation';

const BuildingDetails = () => (
  <div className="building-details">
    {/* <BuildingForm /> */}
    <BuildingLocation />
  </div>
);

export default BuildingDetails;
