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
      state.activeUser.buildings = [...state.activeUser.buildings, action.payload];
    },
    updateBuilding: (state, action: PayloadAction<Building>) => {
      const buildingIndex = state.activeUser.buildings.findIndex((
        (obj) => obj.id === state.activeBuilding.id));
      state.activeUser.buildings[buildingIndex] = action.payload;
    },
    removeBuilding: (state, action: PayloadAction<any>) => {
      const buildingIndex = state.activeUser.buildings.findIndex((
        (obj) => obj.id === state.activeBuilding.id));
      const userBuildings = state.activeUser.buildings;

      // IF DELETE LAST ITEM WILL DISPLAY THE CREATE FORM
      if (!userBuildings.length) {
        state.FormMode = 'ADD';
      } else {
        state.activeUser.buildings.splice(buildingIndex, 1);
        state.activeBuilding = userBuildings[0];
      }
    },
    setActiveBuilding: (state, action: PayloadAction<any>) => {
      state.activeBuilding = action.payload;
    },
    setFormMode: (state, action: PayloadAction<TFormMode>) => {
      state.FormMode = action.payload;
    },
    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addBuilding, setActiveUser, setActiveBuilding, setFormMode, updateBuilding, removeBuilding,
} = usersBuildingSlice.actions;
export default usersBuildingSlice;
