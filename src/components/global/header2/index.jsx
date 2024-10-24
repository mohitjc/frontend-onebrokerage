import React from 'react';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import methodModel from '../../../methods/methods';
import socketModel from '../../../models/socketModel';
import { useEffect } from 'react';

import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { logout } from '../../../Pages/actions/user';
import { useDispatch } from 'react-redux';




function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Header = () => {
  const user = useSelector((state) => state.user);
  const history=useNavigate()
  const dispatch=useDispatch()

  const Logout = () => {
    dispatch(logout())
    localStorage.removeItem("persist:admin-app")
    localStorage.removeItem("token")
    history('/login');
  };


  useEffect(() => {
    socketModel.emit(`user-online`, { user_id: user?.id });

    return () => {
      socketModel.emit(`user-offline`, { user_id: user.id });
    };
  }, []);

  const navigation = [
    { name: 'About', href: '#', current: window.location.pathname=="/"?true:false },
    { name: 'Blog', href: '#', current: false },
    {name:'Plan',href:'/plan', current:window.location.pathname=="/plan"?true:false},
    { name: 'Chat', href:user?.id?'/chat':'/login', current: window.location.pathname=="/chat"?true:false },
    { name: 'Contact', href: '#', current: false },
  ]


  return (
    <header className="">
      <Disclosure as="nav" className="bg-[#EAEFFF]">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button*/}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
              </DisclosureButton>
            </div>
            
            <div className="flex flex-1 items-center justify-start ml-16 sm:ml-0 sm:items-center sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Link to="/">  <img
                  alt="logo"
                  src="/assets/img/logo.png"
                  className="h-8 lg:h-12 w-auto"
                /></Link>
              
              </div>
              <div className="hidden sm:ml-6 sm:block w-full">
                <div className="flex space-x-4 justify-center">
                  {navigation.map((item) => (
                  
                    <a
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(
                        item.current ? 'bg-[#3E549D] text-white' : 'text-gray-600 hover:bg-[#3E549D] hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium',
                      )}
                    >   
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
              {
                user?.loggedIn ? <>   <button
                  type="button"
                  className="relative rounded-full bg-[#3E549D] p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <Menu as="div" className="relative ">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          alt=""
                          src={methodModel.userImg(user && user.image)}
                          className="h-10 w-10 object-contain rounded-full border-1 border-primary"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      anchor="bottom end"
                      className="w-52 origin-top-right mt-4 rounded-xl border border-white/5 bg-white shadow p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                      <MenuItem>
                      <Link to="/profile">
                        <button className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#3E549D] hover:text-white">
                          <PencilIcon className="size-4 stroke-black/30 hover:stroke-white" />
                         Profile  
                        </button>
                        </Link>
                      </MenuItem>
           
                      {/* <div className="my-1 h-px bg-gray-200" /> */}
                      <MenuItem>
                        <button  className="flex w-full items-center gap-2 rounded-lg py-1.5 px-3 hover:bg-[#3E549D] hover:text-white"  onClick={() =>Logout()}>
                          <TrashIcon className="size-4 stroke-black/30 hover:stroke-white" />
                            Logout
                        
                        </button>
                      </MenuItem>
                    </MenuItems>



                  </Menu></>
                  : <div className='login_showing lg:px-6'>

                    <div className='flex items-center gap-6'>
                      <Link to="/login"><p className='text-sm font-medium'>Login</p></Link>

                      <button className='bg-primary px-4 text-sm py-2 rounded-lg text-white' onClick={(e)=>history("/signup")}>Get Started Free</button>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
    </header>
  );
};

export default Header;
