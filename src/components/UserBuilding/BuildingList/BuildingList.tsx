import './BuildingList.scss';
import { ChangeEvent, useState } from 'react';
import Select from '../../../core/Select/Select';
import Button from '../../../core/Button/Button';
import BuildingItem from '../BuildingItem/BuildingItem';
import { User } from '../../../interfaces/Building.interface';
import usersData from '../../../assets/moc/usersList.json';

const BuildingList = () => {
  const [users] = useState<(User[])>(usersData.users);
  const [currentUser, setCurrentUser] = useState<User>(usersData.users[0]);

  const onUserChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    const userId = event.target.value;
    const user = users.filter((u) => u.id === userId)[0];
    setCurrentUser(user);
  };

  return (
    <div className="list">
      <div className="list__select-building">
        <Select id="selectUser" placeholder="Select User" label="Select User" onChange={onUserChangeHandler} options={users} keyName="name" keyValue="id" />
      </div>

      <div className="list__buildings">
        {currentUser.buildings.map((building) => <BuildingItem building={building} />)}
      </div>
      <div className="list__add-button">
        <Button type="tertiary">+ Add Building</Button>
      </div>
    </div>
  );
};

export default BuildingList;
