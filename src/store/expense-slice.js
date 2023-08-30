import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";



const initialState = {
  items: [],
  editItems: null,
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addItem(state, action) {
      state.items = [action.payload, ...state.items];
      // console.log(state);
    },
    removeItem(state, action) {
      const itemId = action.payload.id;
      state.items = state.items.filter((item) => item.id !== itemId);
    },
    editItem(state, action) {
        state.editItems = action.payload.item;
        state.items = action.payload.filtered;
    },
    setItems(state, action) {
        state.items = action.payload;
    },

    setEditItemsNull(state) {
        state.editItems = null;
    },
    setItemsEmpty(state) {
        state.items = [];
    }
    
  },
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice.reducer;
