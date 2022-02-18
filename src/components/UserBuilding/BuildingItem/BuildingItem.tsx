import './BuildingItem.scss';
import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BuildingSVG from '../../../assets/images/building.svg';
import { Building } from '../../../interfaces/Building.interface';
import { setActiveBuilding, setFormMode } from '../../../redux/userBuildingSlice';
import { RootState } from '../../../redux/store';

const BuildingItem: FunctionComponent<{ building: Building }> = ({ building }) => {
  const activeBuilding = useSelector((state: RootState) => state.usersBuildings.activeBuilding);
  const dispatch = useDispatch();

  const activeBuildingHandler = () => {
    dispatch(setActiveBuilding(building));
    dispatch(setFormMode(null));
  };

  return (
    <button
      type="button"
      className={`building ${building.id === activeBuilding.id ? 'building--active' : ''}`}
      onClick={activeBuildingHandler}
    >
      <img className="building__icon" src={BuildingSVG} alt="Building Icon" />
      <span className="building__name">{building.buildingName}</span>
    </button>
  );
};
export default BuildingItem;
