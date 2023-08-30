import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Expense from "./Components/ExpenseTracker/Expense";
import RootLayout from "./Components/Layout/Root";
import Profile from "./Components/Profile/Profile";

import SignupLogin from "./Components/SignupLogin/SignupLogin";
import { authActions } from "./store/auth-slice";
import { themeActions } from "./store/theme-slice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // useEffect(() => {
  //   dispatch(themeActions.toggelTheme());
  // },[]);
  // useEffect(() => {
  //   if (localStorage.getItem("user") === null) {
  //       dispatch(authActions.logout());
  //       navigate("/", { replace: true });
  //   }
  // }, [localStorage.getItem('user')]);

   
  return (
    <div
      className={`App ${isLoggedIn && isDarkMode ? "darkTheme" : "lightTheme"}`}
    >
      <Routes>
        <Route path="/" element={<SignupLogin />} />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        {isLoggedIn && <Route path="/profile/expense-tracker" element={<RootLayout />}>
          <Route index element={<Expense />} />
        </Route>}
      </Routes>
    </div>
  );
}

export default App;
