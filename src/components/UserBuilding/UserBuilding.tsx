import React from 'react';
import './UserBuilding.scss';
import BuildingList from './BuildingList/BuildingList';
import BuildingDetails from './BuildingDetails/BuildingDetails';

const UserBuilding = () => (
  <div className="user-building">
    <BuildingList />
    <BuildingDetails />
  </div>
);

export default UserBuilding;
