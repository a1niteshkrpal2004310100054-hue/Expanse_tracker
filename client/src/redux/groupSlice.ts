import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GroupState, GroupItem, Expanse } from "@/type";

const initialState: GroupState = {
  groupData: [],
  filterGroup: [],
  groupExpanse: [],
  // totalAmount: 0,
};

export const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroups: (state, action: PayloadAction<GroupItem[]>) => {
      state.groupData = action.payload;
    },
    getNewGroup: (state, action: PayloadAction<GroupItem>) => {
      state.groupData.push(action.payload);
    },
    filterGroup: (state, action: PayloadAction<string>) => {
      state.filterGroup = state.groupData.filter(
        (item) => item._id === action.payload
      );
    },
    getGroupExpanse: (state, action: PayloadAction<Expanse[]>) => {
      state.groupExpanse = action.payload;
    },
    addGroupExpanse: (state, action: PayloadAction<Expanse>) => {
      console.log(action.payload);
      state.groupExpanse.unshift(action.payload);
    },
    // totalAmount: (state) => {
    //   state.totalAmount = state.groupExpanse.reduce(
    //     (acc, item) => acc + item.amount,
    //     0
    //   );
    //   console.log(state.totalAmount);
    // },
  },
});

export const {
  addGroups,
  filterGroup,
  getGroupExpanse,
  addGroupExpanse,
  getNewGroup,
} = groupSlice.actions;
export default groupSlice.reducer;
