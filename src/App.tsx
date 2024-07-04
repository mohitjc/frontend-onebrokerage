import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import NotFoundPage from "./Pages/NotFoundPage";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-input-2/lib/style.css";
import "./scss/main.scss";
import Profile from "./Pages/Profile";
import Settings from "./Pages/Settings";
import Forgotpassword from "./Pages/Forgotpassword";
import Resetpassword from "./Pages/Resetpassword";
import Roles from "./Pages/Roles";
import AddEditRole from "./Pages/Roles/AddEdit";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import configureStoreProd from "./Pages/config/configureStore.prod";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import Users from "./Pages/Users";
import UserDetail from "./Pages/Users/View";
import AddEditUsers from "./Pages/Users/AddEdit";
import Category from "./Pages/Categories";
import AddEditCategory from "./Pages/Categories/AddEdit";
import ViewCategory from "./Pages/Categories/View";
import Products from "./Pages/Products";
import AddEditProducts from "./Pages/Products/AddEdit";
import ViewProducts from "./Pages/Products/View";
import FAQ from "./Pages/FAQ";
import AddEditFAQ from "./Pages/FAQ/AddEdit";
import ViewFAQ from "./Pages/FAQ/View";
import Content from "./Pages/Content";
import AddEditContent from "./Pages/Content/AddEdit";
import ViewContent from "./Pages/Content/View";
import Newsletter from "./Pages/Newsletter";
import ViewNewsletter from "./Pages/Newsletter/View";
import Questions from "./Pages/Questions";
import AddEditQuestion from "./Pages/Questions/AddEdit";
import ViewQuestion from "./Pages/Questions/View";
import Tags from "./Pages/Tags";
import AddEditTag from "./Pages/Tags/AddEdit";
import ViewTag from "./Pages/Tags/View";
import Blogs from "./Pages/Blogs";
import AddEditBlog from "./Pages/Blogs/AddEdit";
import ViewBlog from "./Pages/Blogs/View";
import Emails from "./Pages/Emails";
import GrooveGroup from "./Pages/GrooveGroup";
import GrooveGroupDetail from "./Pages/GrooveGroup/View";
import AddEditGrooveGroup from "./Pages/GrooveGroup/AddEdit";
import Videos from "./Pages/Videos";
import AddVideos from "./Pages/Videos/AddEdit";
import ViewVideos from "./Pages/Videos/View";
import Audio from "./Pages/Audio";
import AddAudio from "./Pages/Audio/AddEdit";
import ViewAudio from "./Pages/Audio/View";
import SendNewsletter from "./Pages/Emails/Send";
import Notifications from "./Pages/Notifications";
import SendNotification from "./Pages/Notifications/Send";
import Chats from "./Pages/Chats";
import ViewNotification from "./Pages/Notifications/View";

const { persistor, store } = configureStoreProd();

function App() {
  const routes = [
    // {url:'',element:<Home />},
    { url: "/login", element: <Login /> },
    // {url:'/signup',element:<Signup />},
    { url: "/dashboard", element: <Dashboard /> },
    { url: "*", element: <NotFoundPage /> },
    { url: "/profile", element: <Profile /> },
    { url: "/profile/:tab", element: <Settings /> },
    { url: "/forgotpassword", element: <Forgotpassword /> },
    { url: "/resetpassword", element: <Resetpassword /> },
    { url: "/roles", element: <Roles /> },
    { url: "/roles/add", element: <AddEditRole /> },
    { url: "/roles/edit/:id", element: <AddEditRole /> },
    { url: "/user", element: <Users /> },
    { url: "/user/edit/:id", element: <AddEditUsers /> },
    { url: "/user/add", element: <AddEditUsers /> },
    { url: "/user/detail/:id", element: <UserDetail /> },
    { url: "/", element: <Navigate to="/login" /> },

    { url: "/category", element: <Category /> },
    { url: "/category/add", element: <AddEditCategory /> },
    { url: "/category/detail/:id", element: <ViewCategory /> },
    { url: "/category/edit/:id", element: <AddEditCategory /> },
    { url: "/product", element: <Products /> },
    { url: "/product/add", element: <AddEditProducts /> },
    { url: "/product/detail/:id", element: <ViewProducts /> },
    { url: "/product/edit/:id", element: <AddEditProducts /> },
    { url: "/faq", element: <FAQ /> },
    { url: "/faq/add", element: <AddEditFAQ /> },
    { url: "/faq/detail/:id", element: <ViewFAQ /> },
    { url: "/faq/edit/:id", element: <AddEditFAQ /> },
    { url: "/content", element: <Content /> },
    { url: "/content/detail/:slug", element: <ViewContent /> },
    { url: "/content/add", element: <AddEditContent /> },
    { url: "/content/edit/:slug", element: <AddEditContent /> },
    { url: "/newsletter", element: <Newsletter /> },
    { url: "/newsletter/detail/:id", element: <ViewNewsletter /> },
    { url: "/question", element: <Questions /> },
    { url: "/question/add", element: <AddEditQuestion /> },
    { url: "/question/detail/:id", element: <ViewQuestion /> },
    { url: "/question/edit/:id", element: <AddEditQuestion /> },
    { url: "/tag", element: <Tags /> },
    { url: "/tag/add", element: <AddEditTag /> },
    { url: "/tag/detail/:id", element: <ViewTag /> },
    { url: "/tag/edit/:id", element: <AddEditTag /> },
    { url: "/blog", element: <Blogs /> },
    { url: "/blog/add", element: <AddEditBlog /> },
    { url: "/blog/detail/:id", element: <ViewBlog /> },
    { url: "/blog/edit/:id", element: <AddEditBlog /> },
    { url: "/subscribers", element: <Emails /> },
    { url: "/subscribers/send-newsletter", element: <SendNewsletter /> },
    { url: "/customers", element: <GrooveGroup /> },
    { url: "/customers/edit/:id", element: <AddEditGrooveGroup /> },
    { url: "/customers/add", element: <AddEditGrooveGroup /> },
    { url: "/customers/detail/:id", element: <GrooveGroupDetail /> },
    { url: "/videos", element: <Videos /> },
    { url: "/videos/add", element: <AddVideos /> },
    { url: "/videos/edit/:id", element: <AddVideos /> },
    { url: "/videos/detail/:id", element: <ViewVideos /> },

    { url: "/audio", element: <Audio /> },
    { url: "/audio/add", element: <AddAudio /> },
    { url: "/audio/edit/:id", element: <AddAudio /> },
    { url: "/audio/detail/:id", element: <ViewAudio /> },
    { url: "/notifications", element: <Notifications /> },
    { url: "/notifications/detail/:id", element: <ViewNotification /> },
    { url: "/notifications/send-notification", element: <SendNotification /> },
    { url: "/chat", element: <Chats /> },
  ];

  sessionStorage.clear();

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={"loading ..."} persistor={persistor}>
          <Router>
            <Routes>
              {routes.map((itm) => {
                return <Route path={itm.url} element={itm.element} />;
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
