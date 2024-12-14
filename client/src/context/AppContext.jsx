//libraries
import { createContext, useState, useReducer } from "react";
import profilesReducer from "../reducers/profilesReducer";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //tracking if mount and unmount of Home Page
  const [isHome, setIsHome] = useState(false);

  const [submitError, setSubmitError] = useState("");

  const [userId, setUserId] = useState("");

  const [isDisabled, setIsDisabled] = useState(false); // State to track if the parent is disabled

  // const initialState = JSON.parse(localStorage.getItem("profiles")) || [];

  // const [profilesState, profilesDispatch] = useReducer(
  //   profilesReducer,
  //   initialState
  // );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isHome,
        setIsHome,
        submitError,
        setSubmitError,
        userId,
        setUserId,
        isDisabled,
        setIsDisabled,
        // profilesState,
        // profilesDispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
