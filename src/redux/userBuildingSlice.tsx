import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Building, TFormMode, User } from '../interfaces/Building.interface';
import usersData from '../assets/moc/usersList.json';

interface InitialState {
    users: User[],
    activeUser: User,
    activeBuilding: Building,
    FormMode?: TFormMode
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
    updateBuilding: (state, action: PayloadAction<Building>) => {
      // Find index of specific object using findIndex method.
      const buildingIndex = state.activeUser.buildings.findIndex((
        (obj) => obj.id === state.activeBuilding.id));
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings[buildingIndex] = action.payload;
    },
    removeBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    setActiveBuilding: (state, action: PayloadAction<any>) => {
      // eslint-disable-next-line no-param-reassign
      state.activeBuilding = action.payload;
    },
    setFormMode: (state, action: PayloadAction<TFormMode>) => {
      // eslint-disable-next-line no-param-reassign
      state.FormMode = action.payload;
    },
    setActiveUser: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.activeUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBuilding, setActiveUser, setActiveBuilding, setFormMode, updateBuilding,
} = usersBuildingSlice.actions;
export default usersBuildingSlice;
