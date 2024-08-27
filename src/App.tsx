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
    { url: "/login", path: "Login" },
    { url: "/dashboard", path: "Dashboard" },
    { url: "/assignment", path: "Assignment" },
    { url: "/assignment/detail/:id", path: "Assignment/View" },
    {
      url: "/assignment/counter-offer/detail/:id",
      path: "Assignment/Counteroffer",
    },
    { url: "*", path: "NotFoundPage" },
    { url: "/profile", path: "Profile" },
    { url: "/profile/:tab", path: "Settings" },
    { url: "/forgotpassword", path: "Forgotpassword" },
    { url: "/resetpassword", path: "Resetpassword" },
    { url: "/user", path: "Users" },
    { url: "/user/edit/:id", path: "Users/AddEdit" },
    { url: "/user/add", path: "Users/AddEdit" },
    { url: "/user/detail/:id", path: "Users/View" },
    { url: "/", element: <Navigate to="/login" /> },
    { url: "/chat", path: "Chat" },
    { url: "/word-estimate", path: "WordCount/AddEdit" },
    { url: "/word-estimate/detail/:id", path: "WordCount/View" },
    { url: "/word-estimate/add", path: "WordCount/AddEdit" },
    { url: "/word-estimate/edit/:id", path: "WordCount/AddEdit" },
    { url: "/content", path: "Content" },
    { url: "/content/detail/:slug", path: "Content/View" },
    { url: "/content/add", path: "Content/AddEdit" },
    { url: "/content/edit/:slug", path: "Content/AddEdit" },
    { url: "/customers", path: "Customers" },
    { url: "/customers/edit/:id", path: "Customers/AddEdit" },
    { url: "/customers/add", path: "Customers/AddEdit" },
    { url: "/customers/detail/:id", path: "Customers/View" },
    { url: "/contract", path: "Contract" },
    { url: "/contract/detail/:id", path: "Contract/View" },
    { url: "/plans", path: "Plans" },
    { url: "/plans/add", path: "Plans/AddEdit" },
    { url: "/plans/edit/:planid/:copy", path: "Plans/AddEdit" },
    { url: "/plans/detail/:id", path: "Plans/Detail" },
    { url: "/feature", path: "Features" },
    { url: "/feature/edit/:id", path: "Features/AddEdit" },
    { url: "/feature/add", path: "Features/AddEdit" },
    { url: "/feature/detail/:id", path: "Features/View" },
    { url: "/carriers", path: "Carrier" },
    { url: "/carriers/edit/:id", path: "Carrier/AddEdit" },
    { url: "/carriers/add", path: "Carrier/AddEdit" },
    { url: "/carriers/detail/:id", path: "Carrier/View" },
    { url: "/acceptedcarriers", path: "Carrier/AcceptedCarrier" },
    { url: "/rejectedcarriers", path: "Carrier/RejectedCarrier" },
    { url: "/carriersrequest", path: "Carrier/CarriersRequest" },
    { url: "/carrierstaff", path: "Carrier/CarrierStaff" },
    { url: "/approvedSubCarrier", path: "Carrier/ApprovedSubCarrier" },
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
