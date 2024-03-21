import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import Html from './Html';
import crendentialModel from '../../../models/credential.model';


const Header = ({ setIsOpen, isOpen }) => {
  const user = crendentialModel.getUser()
  const toggle = () => { setIsOpen(!isOpen); localStorage.setItem('sidebar', !isOpen) };
  const [isOpen1, setIsOpen1] = useState(false);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const history = useNavigate();

  const searchState={data:''};

  const Logout = () => {
    crendentialModel.setUser('')
    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history('/login');
  };



  useEffect(
    () => {
      window.scrollTo({ top: 0 });
      // if (searchState.data) {
      //   dispatch(search_success(''))
      // }

    },
    []
  );

  useEffect(() => {
    setSearch(searchState.data)
  }, [searchState])

  const [search, setSearch] = useState('')

  const searchHandle = (e) => {
    e.preventDefault()
    // dispatch(search_success(search))
  }

  const searchChange = (e) => {
    setSearch(e)
    if (!e) {
      // dispatch(search_success(''))
    }
  }


  const clear = () => {
    setSearch('')
    // dispatch(search_success(''))
  }

  return (
    <Html
      isOpen={isOpen}
      toggle={toggle}
      searchHandle={searchHandle}
      search={search}
      user={user}
      searchChange={searchChange}
      isOpen1={isOpen1}
      clear={clear}
      Logout={Logout}
    />
  );
};

export default Header;
