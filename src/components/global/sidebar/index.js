import React, { memo, useEffect } from 'react';
import './style.scss';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Html from './Html';
import permissionModel from '../../../models/permisstion.model';

const Sidebar = ({ isOpen }) => {
  const user = useSelector(state => state.user);
  const history = useNavigate();
  const location = useLocation(); // Use the useLocation hook

  const menus = {
    user: ['roles', 'users'],
    catalogue: ['types', 'categories', 'category/'],
    plan: ['features', 'plans'],
    api: ['bookingSystem', 'pos', 'reviews', 'accountingSystem', 'marketing', 'communication'],
    geo: ['continents', 'countries', 'regions', 'cities'],
    dynamicPricing: ['dynamicprice'],
    customer: ['customer'],
    template: ['/dynamicpricelist', '/crm', '/waiver', '/emailtemplate', 'costing'],
    settings: ['/department', '/holidays', '/currency', '/continents', '/countries', '/regions', '/cities', '/refund-reason', '/web/settings'],
    carriers: ['/carriers', "customers/add", "/acceptedcarriers" ,'/coupon', '/affiliates'],
    // plan:["/plans "]
  };

  const ListItemLink = ({ to, type = 'link', disabled = false, ...rest }) => {
    const currentPath = location.pathname;
    const isActive = currentPath.includes(to);
    
    return (
      <>
        {type === 'link' ? (
          <li className={`nav-item ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
            <Link to={to} {...rest} />
          </li>
        ) : (
          <li className={`nav-item main ${isActive ? 'active' : ''}`} {...rest}></li>
        )}
      </>
    );
  };

  const tabclass = (tab) => {
    const currentPath = location.pathname;
    return menus[tab].some(itm => currentPath.includes(itm));
  };

  const urlAllow = (url) => {
    const permissions = user.role?.permissions?.[0];
    const arr = url.split(',');
    return arr.some(itm => permissionModel.urlAllow(permissions, itm));
  };

  const route = (p) => {
    history(p);
  };

  const scrollToId = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    } else {
      console.error(`Element with id '${id}' not found`);
    }
  };

  useEffect(() => {
    scrollToId(location.pathname);
  }, [location.pathname]); // Use location.pathname instead of window.location.pathname

  return (
    <Html
      route={route}
      tabclass={tabclass}
      urlAllow={urlAllow}
      ListItemLink={ListItemLink}
      isOpen={isOpen}
    />
  );
};

export default memo(Sidebar);
