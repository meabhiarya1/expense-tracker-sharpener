import React, { Fragment, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../store/context/auth-context";
import { authActions } from "../../store/auth-slice";
import { expenseActions } from "../../store/expense-slice";
import ExpenseForm from "../ExpenseTracker/ExpenseForm";
import { MdModeNight } from "react-icons/md";
import classes from "./Profile.module.css";
import UpdateProfileForm from "./UpdateProfileForm";
import { themeActions } from "../../store/theme-slice";
import { BsSunFill } from "react-icons/bs";
import axios from "axios";

const Profile = (props) => {
  // const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isDarkMode = useSelector((state) => state.theme.isDark);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLocation = location.pathname === "/profile";
  // console.log(isDarkMode);
  const updateVisibleHandler = async () => {
    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAN3tXGAn9QdrcrvtE2RTIwHkKbiEq8yxE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: auth.token,
          }),
        }
      );
      const data = await res.json();
      setUserData(data.users[0]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    updateVisibleHandler();
  }, []);

  const clickLogoutHandler = () => {
    // authCtx.logout();
    if (isDarkMode === true) {
      dispatch(themeActions.toggelTheme());
    }
    dispatch(authActions.logout());
    dispatch(expenseActions.setItemsEmpty());
    navigate("/", { replace: true });
  };

  const clickExpenseHandler = () => {
    navigate("/profile/expense-tracker", { replace: true });
  };

  const clickModeHandler = async () => {
    dispatch(themeActions.toggelTheme());
  };

  return (
    <Fragment>
      <section className={classes.proCon}>
        <div className={classes.header}>
          <div className={classes.headerDetail}>
            <h4>Welcome to Expense tracker</h4>

            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg" />
            <h5>
              {userData !== null && userData.displayName !== undefined
                ? userData.displayName
                : "UnKnown"}
            </h5>
            <Button
              variant="success"
              onClick={clickExpenseHandler}
              className={classes.expenseBtn}
            >
              Expense Tracker
            </Button>
          </div>

          <div className={classes.mode}>
            {auth.isPremium && (
              <button onClick={clickModeHandler}>
                {isDarkMode ? (
                  <BsSunFill style={{ color: "white" }} />
                ) : (
                  <MdModeNight />
                )}
              </button>
            )}
          </div>
          <span className={classes.incomplete}>
            {!isLocation ? (
              "Your Profile is incomplete. "
            ) : (
              <React.Fragment>
                Your profile <strong>x%</strong> completed.
              </React.Fragment>
            )}
            <button onClick={() => navigate("/profile", { replace: true })}>
              Complete now
            </button>
          </span>
          <div>
            <Button variant="danger" onClick={clickLogoutHandler}>
              Log out
            </Button>
          </div>
        </div>
      </section>
      <section className={classes.sectionLower}>
        {isLocation && (
          <UpdateProfileForm user={userData} update={updateVisibleHandler} />
        )}
      </section>
    </Fragment>
  );
};

export default Profile;
