import './BuildingList.scss';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import BuildingItem from '../BuildingItem/BuildingItem';
import { RootState } from '../../../redux/store';
import { setActiveBuilding, setActiveUser, setFormMode } from '../../../redux/userBuildingSlice';
import Spinner from '../../../core/Spinner/Spinner';

const BuildingList = () => {
  const users = useSelector((state: RootState) => state.usersBuildings.users);
  const activeUser = useSelector((state: RootState) => state.usersBuildings.activeUser);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onUserChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const user = users.filter((u) => u.id === userId)[0];
    setIsLoading(true);
    dispatch(setActiveUser(user));
    dispatch(setActiveBuilding(user.buildings[0]));

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <div className="list">
      <div className="list__select-building">
        <Select
          id="selectUser"
          placeholder="Select User"
          label="Select User"
          onChange={onUserChangeHandler}
          value={JSON.stringify(activeUser)}
          options={users}
          keyName="name"
          keyValue="id"
        />
      </div>

      <div className="list__buildings">
        {isLoading && <Spinner />}

        {
            activeUser.buildings.map((building) => (
              <BuildingItem key={building.id} building={building} />
            ))
        }
      </div>
      <div className="list__add-button">
        <Button type="tertiary" onClick={() => dispatch(setFormMode('ADD'))}>+ Add Building</Button>
      </div>
    </div>
  );
};

export default BuildingList;
