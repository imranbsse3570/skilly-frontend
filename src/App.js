import { createContext, useState, useEffect, useReducer } from "react";
import { Spinner } from "react-bootstrap";

import GlobalConfigData from "./config/globalConfig.json";
import RouterConfig from "./routes/Routes";
import { getMyProfileData } from "./services/account";
import PopUpModal from "./components/higher-order-component/PopUpModal";
import AlertDismissible from "./components/higher-order-component/AlertDismissible";
import "./App.css";

export const GlobalContext = createContext(undefined);
export const ModalPopUpContext = createContext(undefined);
export const AlertDismissibleContext = createContext(undefined);
export const LoadingSpinnerContext = createContext(undefined);

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
  const [ok, setOk] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState(undefined);
  const [callback, setCallback] = useState(() => () => {});

  // Alert Dismissable
  const [showPopup, setShowPopUp] = useState(false);
  const [popupData, setPopUpData] = useState({});
  const [style, setStyle] = useState({});

  // Spinner
  const [runSpinner, setRunSpinner] = useState(false);

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

  const updateUserData = async () => {
    try {
      if (localStorage.getItem("token")) {
        const result = await getMyProfileData();
        setProfileData(result.data.user);
      }
    } catch (err) {
      console.log(err);
    }
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
            setCallback,
            updateUserData,
          }}
        >
          <ModalPopUpContext.Provider
            value={{
              ok,
              setOk,
              modalData,
              setModalData,
              modalShow,
              setModalShow,
              setCallback,
            }}
          >
            <AlertDismissibleContext.Provider
              value={{
                showPopup,
                setShowPopUp,
                popupData,
                setPopUpData,
                style,
                setStyle,
              }}
            >
              <LoadingSpinnerContext.Provider
                value={{ setRunSpinner, runSpinner }}
              >
                <RouterConfig data={GlobalConfigData} />
                <div
                  className={`loading-spinner-overlay ${
                    runSpinner ? "" : "d-none"
                  }`}
                >
                  <div className="animation-spinner">
                    <Spinner animation="border" role="status" variant="light" />
                  </div>
                </div>
              </LoadingSpinnerContext.Provider>
              <AlertDismissible
                data={{
                  showPopup,
                  setShowPopUp,
                  popupData,
                  setPopUpData,
                  style,
                  setStyle,
                }}
              />
            </AlertDismissibleContext.Provider>
            <PopUpModal
              show={modalShow}
              onHide={setModalShow}
              setOk={setOk}
              data={modalData}
              callback={callback}
            />
          </ModalPopUpContext.Provider>
        </GlobalContext.Provider>
      ) : (
        <p className="py-5 text-center">Loading...</p>
      )}
    </div>
  );
}

export default App;
