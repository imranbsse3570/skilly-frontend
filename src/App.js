import { createContext, useState, useEffect, useReducer } from "react";

import GlobalConfigData from "./config/globalConfig.json";
import RouterConfig from "./routes/Routes";
import { getMyProfileData } from "./services/account";
import "./App.css";

export const GlobalContext = createContext(undefined);

function userReducer(state, action) {
  switch (action.type) {
    case "login": {
      return action.payload;
    }
    case "logout": {
      return undefined;
    }
    case "updateUser": {
      return action.payload;
    }
    default:
      return undefined;
  }
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(undefined);

  const [state, dispatch] = useReducer(userReducer, profileData);

  const login = (user) => {
    setProfileData(user);
    dispatch({
      type: "login",
      payload: profileData,
    });
  };

  const logout = () => {
    dispatch({
      type: "logout",
    });
  };

  const updateProfile = (user) => {
    setProfileData(user);
    dispatch({
      type: "updateUser",
      payload: profileData,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token")) {
          const result = await getMyProfileData();
          setProfileData(result.data.user);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    if (isLoading) {
      console.log("logging");
      fetchData();
    }
  }, [isLoading]);

  return (
    <div>
      {!isLoading ? (
        <GlobalContext.Provider
          value={{
            userData: profileData,
            login,
            logout,
            updateProfile,
            setIsLoading,
          }}
        >
          <RouterConfig data={GlobalConfigData} />
        </GlobalContext.Provider>
      ) : (
        <p className="py-5 text-center">Loading...</p>
      )}
    </div>
  );
}

export default App;
