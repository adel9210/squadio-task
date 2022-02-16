import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../interfaces/Building.interface';
import usersData from '../assets/moc/usersList.json';

interface InitialState {
  users: User[],
  activeUser: User
}
const initialState: InitialState = { users: usersData.users, activeUser: usersData.users[0] };
export const usersBuildingSlice = createSlice({
  name: 'usersBuilding',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    setActiveUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBuilding, setActiveUser } = usersBuildingSlice.actions;

export default usersBuildingSlice;
