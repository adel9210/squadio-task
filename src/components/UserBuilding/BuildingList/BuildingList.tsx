import './BuildingList.scss';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import BuildingItem from '../BuildingItem/BuildingItem';
import { RootState } from '../../../redux/store';
import { setActiveUser } from '../../../redux/userBuildingSlice';

const BuildingList = () => {
  const users = useSelector((state: RootState) => state.usersBuildings.users);
  const activeUser = useSelector((state: RootState) => state.usersBuildings.activeUser);
  const dispatch = useDispatch();

  const onUserChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const user = users.filter((u) => u.id === userId)[0];
    dispatch(setActiveUser(user));
  };

  return (
    <div className="list">
      <div className="list__select-building">
        <Select id="selectUser" placeholder="Select User" label="Select User" onChange={onUserChangeHandler} options={users} keyName="name" keyValue="id" />
      </div>

      <div className="list__buildings">
        {activeUser.buildings.map((building) => <BuildingItem building={building} />)}
      </div>
      <div className="list__add-button">
        <Button type="tertiary">+ Add Building</Button>
      </div>
    </div>
  );
};

export default BuildingList;
