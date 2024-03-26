import React, { useEffect, useState } from 'react';
import './style.scss';
import { Link, useNavigate } from 'react-router-dom';
import Html from './Html';
import crendentialModel from '../../../models/credential.model';

const Sidebar = ({ isOpen }) => {
  const user = crendentialModel.getUser()
  const history = useNavigate()
  const [role,setRole]=useState(user.customerRoleDetail)
  const menus = {
    user: ['roles', 'users'],
    catalogue: ['types', 'categories', 'category/'],
    plan: ['features', 'plans'],
    api: ['bookingSystem', 'pos', 'reviews', 'accountingSystem'],
    geo: ['continents', 'countries', 'regions', 'cities'],
    dynamicPricing: ['dynamicprice'],
    skills: ['skills','skill-roles'],
  }

  const ListItemLink = ({ to, type = 'link', disabled = false, ...rest }) => {
    let url =  window.location.href
    const host = window.location.host
    url = url.split(host)[1]
    return (<>
      {type == 'link' ? <li className={`nav-item ${url.includes(to) ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
        {/* {...rest} */}
        <Link to={to} {...rest} className="" />
      </li> : <li className={`nav-item main ${url.includes(to) ? 'active' : ''}`} {...rest}></li>}
    </>
    );
  };

  const tabclass = (tab) => {
    let url = window.location.href
    let value = false
    menus[tab].map(itm => {
      if (url.includes(itm)) value = true
    })
    return value
  }

  const isAllow = (url = '') => {
    let permissions = role?.permissions
    let arr = url.split(',')
    let value = false
    arr.map(itm => {
      if(permissions?.[itm]) value = permissions?.[itm]
    })

    return value
}

  const route = (p) => {
    history(p)
  }

  return <>
    <Html
      route={route}
      tabclass={tabclass}
      isAllow={isAllow}
      ListItemLink={ListItemLink}
      isOpen={isOpen}
    />
  </>
};

export default Sidebar;
