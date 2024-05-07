import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFoundPage from './Pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import './scss/main.scss';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Forgotpassword from './Pages/Forgotpassword';
import Resetpassword from './Pages/Resetpassword';
import Roles from './Pages/Roles';
import AddEditRole from './Pages/Roles/AddEdit';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import configureStoreProd from './Pages/config/configureStore.prod';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import Users from './Pages/Users';
import AddEditUsers from './Pages/Users/AddEdit';
const { persistor, store } = configureStoreProd();

function App() {

  const routes=[
    // {url:'',element:<Home />},
    {url:'/login',element:<Login />},
    {url:'/signup',element:<Signup />},
    {url:'/dashboard',element:<Dashboard />},
    {url:'*',element:<NotFoundPage />},
    {url:'/profile',element:<Profile />},
    {url:'/profile/:tab',element:<Settings />},
    {url:'/forgotpassword',element:<Forgotpassword />},
    {url:'/resetpassword',element:<Resetpassword />},
    {url:'/roles',element:<Roles />},
    {url:'/roles/add',element:<AddEditRole />},
    {url:'/roles/edit/:id',element:<AddEditRole />},
    {url:'/user',element:<Users />},
    {url:'/user/edit/:id',element:<AddEditUsers />},
    {url:'/user/add',element:<AddEditUsers />},
    {url:'/',element:<Navigate to="/login" />},
  ]

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
    <Router>
      <Routes>
        {routes.map(itm=>{
          return <Route path={itm.url} element={itm.element} />
        })}
      </Routes>
    </Router>
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
