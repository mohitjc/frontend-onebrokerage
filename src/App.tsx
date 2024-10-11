import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "react-quill/dist/quill.snow.css";
import "./scss/main.scss";
import configureStoreProd from "./Pages/config/configureStore.prod";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { lazy } from "react";


const { persistor, store } = configureStoreProd();

function App() {

  
  const routes = [
      { url: "/", path: "Home" },
      { url: "/", element: <Navigate to="/home" /> },
      { url: "/login", path: "Login" },
      { url: "/signup", path: "Signup" },
      { url: "/signup-step-1", path: "Signup/AddressStep" },
      { url: "/signup-step-2", path: "Signup/Step2" },
      { url: "/signup-step-3", path: "Signup/Step3" },
      
      // { url: "/chat", path: "Chat2" },
      { url: "/chat", path: "Chat" },
      { url: "/chat1", path: "Chat2" },
      { url: "/dashboard", path: "Dashboard" },
     { url: "/profile", path: "Profile" },
     { url: "/forgotpassword", path: "Forgotpassword" },
     { url: "/otp-verify", path: "Forgotpassword/OTPverify/html" },
    { url: "/plan", path: "Plan" },
    { url: "/activeplan", path: "Plan/ActivePlan" },
    { url: "/drivers", path: "Driver" },
    { url: "/drivers/edit/:id", path: "Driver/AddEdit" },
    { url: "/drivers/add", path: "Driver/AddEdit" },
    { url: "/drivers/detail/:id", path: "Driver/View" },
     { url: "/trucks", path: "Truck" },
    { url: "/trucks/add", path: "Truck/AddTruck" },
    { url: "/trucks/detail/:id", path: "Truck/View" },
    { url: "/carriers", path: "Carrier" },
    { url: "/carriers/detail/:id", path: "Carrier/View" },
    { url: "/approvedcarriers", path: "Carrier/ApprovedCarrier" },
    { url: "/rejectedcarrier", path: "Carrier/RejectedCarrier" },
    { url: "/pendingcarrier", path: "Carrier/PendingCarrier" },
    { url: "/carriers/edit/:id", path: "Carrier/EditCarrier" },
    { url: "/transaction", path: "Transaction" },
    { url: "/transaction/detail/:id", path: "Transaction/Detail" },
    { url: "/carrierstaff", path: "CarrierStaff" },
    { url: "/carrierstaff/edit/:id", path: "CarrierStaff/AddEdit" },
    { url: "/carrierstaff/add", path: "CarrierStaff/AddEdit" },
    { url: "/carrierstaff/detail/:id", path: "CarrierStaff/View" },
    { url: "/successpage", path: "SuccessPage/html" },
    { url: "/cancelpage", path: "CancelPage/html" },
    { url: "/loads", path: "Loads" },
    { url: "/loads/edit/:id", path: "Loads/AddEdit" },
    { url: "/loads/add", path: "Loads/AddEdit" },
    { url: "/loads/detail/:id", path: "Loads/View" },
    { url: "/task", path: "TaskManagement" },
  ];

  sessionStorage.clear();


  return (
    <>
      <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
          <Suspense
            fallback={
              <div id="loader" className="loaderDiv">
                <div>
                  <img
                    src="/assets/img/loader.gif"
                    alt="logo"
                    className="loaderlogo"
                  />
                </div>
              </div>
            }
          >
            <Router>
              <Routes>
                {routes.map((itm) => {
                  const Element = lazy(() => import(`./Pages/${itm.path}`));
                  return (
                    <Route
                      path={itm.url}
                      element={itm.path ? <Element /> : itm.element}
                    />
                  );
                })}
              </Routes>
            </Router>
          </Suspense>
        </PersistGate>
      </Provider>
      <div id="loader" className="loaderDiv d-none">
        <div>
          <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
}

export default App;
