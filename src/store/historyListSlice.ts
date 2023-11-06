import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { TActivity } from '../screens/History/History';
import { storage } from '../services/storage';

export type THistoryList = {
  activityArray: TActivity[];
};
const list = storage.getString('activitiesArray');
const activitiesArray = list ? JSON.parse(list) : [];
const initialState: THistoryList = {
  activityArray: activitiesArray,
};

const historyListSlice = createSlice({
  name: 'historyList',
  initialState: initialState,
  reducers: {
    addToHistoryList: (state: THistoryList, action: PayloadAction<any>) => {
      return {
        ...state,
        activityArray: [...state.activityArray, action.payload],
      };
    },
    deleteAll: (state: THistoryList) => {
      return { ...state, activityArray: [] };
    },
  },
});

export const { addToHistoryList, deleteAll } = historyListSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getActivityArray = (state: RootState) => state.activityArray;

export default historyListSlice.reducer;
