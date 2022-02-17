import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Building, User } from '../interfaces/Building.interface';
import usersData from '../assets/moc/usersList.json';

interface InitialState {
  users: User[],
  activeUser: User,
  activeBuilding: Building,
  isEditMode?: boolean
}
const initialState: InitialState = {
  users: usersData.users,
  activeUser: usersData.users[0],
  activeBuilding: usersData.users[0].buildings[0],
};
export const usersBuildingSlice = createSlice({
  name: 'usersBuilding',
  initialState,
  reducers: {
    addBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    updateBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    removeBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    setActiveBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeBuilding = action.payload;
    },
    setActiveUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBuilding, setActiveUser, setActiveBuilding } = usersBuildingSlice.actions;

export default usersBuildingSlice;
