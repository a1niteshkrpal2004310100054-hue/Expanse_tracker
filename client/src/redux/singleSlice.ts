import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NormalExpanseState, NormalExpanse } from "@/type/index";

const initialState: NormalExpanseState = {
  expenses: [],
};

export const singleSlice = createSlice({
  name: "single",
  initialState,
  reducers: {
    setExpanse: (state, action: PayloadAction<NormalExpanse[]>) => {
      state.expenses = action.payload;
    },
    addCreatedExpanse: (state, action: PayloadAction<NormalExpanse>) => {
      state.expenses.unshift(action.payload);
    },
    updateExpense: (state, action: PayloadAction<NormalExpanse>) => {
      const index = state.expenses.findIndex(
        (item) => item._id === action.payload._id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<string[]>) => {
      state.expenses = state.expenses.filter(
        (expense) => !action.payload.includes(expense._id)
      );
    },
  },
});

export const { setExpanse, addCreatedExpanse, updateExpense, deleteExpense } =
  singleSlice.actions;

export default singleSlice.reducer;
