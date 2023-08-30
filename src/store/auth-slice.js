import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem('user'),
//   isLoggedIn: userLoggedIn,
  userEmail: localStorage.getItem('userEmail'),
  isPremium: localStorage.getItem('isPremium'),
  isLoggedIn: localStorage.getItem('isLoggedIn')
};

// const userLoggedIn = !!initialAuthState.token;

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.tokenId;
      state.userEmail = action.payload.email;
      localStorage.setItem("user", action.payload.tokenId);
      localStorage.setItem("userEmail", action.payload.email);
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', true);
    },

    logout(state) {
      state.token = null;
      state.userEmail = null;
      localStorage.removeItem("user");
      localStorage.removeItem("userEmail");
      state.isPremium = false;
      state.isLoggedIn = true;
      localStorage.removeItem('isPremium');
      localStorage.removeItem('isDark');
      localStorage.removeItem('isLoggedIn');
    
    },
    setIsPremium(state) {
        state.isPremium = true;
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
