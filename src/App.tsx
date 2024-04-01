import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import NotFoundPage from './Pages/NotFoundPage';
import 'react-toastify/dist/ReactToastify.css';
import 'react-phone-input-2/lib/style.css';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Forgotpassword from './Pages/Forgotpassword';
import Resetpassword from './Pages/Resetpassword';
import Roles from './Pages/Roles';
import AddEditRole from './Pages/Roles/AddEdit';
import Users from './Pages/Users';
import UserDetail from './Pages/Users/Profiledetail';
import AddEditUser from './Pages/Users/AddEditUser';
import Dashboard from './Pages/Dashboard';
import './scss/main.scss';
import Signup from './Pages/Signup';
import Events from './Pages/Events';
import AddEditEvent from "./Pages/Events/AddEdit";
import ViewEvent from "./Pages/Events/View";
import Plan from "./Pages/Plan";
// import ActivePlan from "./Pages/Plan/ActivePlan";
function App() {

  const routes=[
    {url:'',element:<Home />},
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
    {url:'/users/add',element:<AddEditUser />},
    {url:'/users',element:<Users />},
    {url:'/users/edit/:id',element:<AddEditUser />},
    {url:'/userDetail/:id',element:<UserDetail />},
    {url:'/event',element:<Events />},
    {url:'/event/edit/:id',element:<AddEditEvent />},
    {url:'/event/add',element:<AddEditEvent />},
    {url:'/event/detail/:id',element:<ViewEvent />},
    {url:'/plan',element:<Plan />},
    // {url:'/activeplan',element:<ActivePlan />},
  ]

  return (
    <>
    <Router>
      <Routes>
        {routes.map(itm=>{
          return <Route path={itm.url} element={itm.element} />
        })}
      </Routes>
    </Router>
     <div id="loader" className="loaderDiv d-none">
            <div>
                <img src="/assets/img/loader.gif" alt="logo" className="loaderlogo" />
            </div>
        </div>
    </>
    
  );
}

export default App;
