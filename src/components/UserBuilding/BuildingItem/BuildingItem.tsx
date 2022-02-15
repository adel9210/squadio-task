import './BuildingItem.scss';
import { FunctionComponent } from 'react';
import BuildingSVG from '../../../assets/images/building.svg';
import { Building } from '../../../interfaces/Building.interface';

const BuildingItem: FunctionComponent<{ building: Building }> = ({ building }) => (
  <div className="building">
    <img className="building__icon" src={BuildingSVG} alt="Building Icon" />
    <span className="building__name">{building.buildingName}</span>
  </div>
);

export default BuildingItem;
