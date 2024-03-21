import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { Link } from 'react-router-dom';
import './style.scss';
import AuthLayout from '../../components/AuthLayout';
import environment from '../../environment';
import { toast } from 'react-toastify';
import crendentialModel from '../../models/credential.model';

const Signup = () => {
  const history = useNavigate();
  const user:any = crendentialModel.getUser()
  useEffect(() => {
    if (user && user?.loggedIn) {
      history('/dashboard')
    }
  }, [])

  const [form, setForm] = useState({ email: '', password: '', fullName: '' });
  const [remember, setRemember] = useState(false);
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });

  useEffect(() => {
  }, [])

  const hendleSubmit = (e: any) => {
    e.preventDefault()
    const data = {
      role:environment.userRoleId,
      ...form
    };
    loader(true)
    ApiClient.post('api/user/register', data).then(res => {
      loader(false)
      if (res.success) {
        let url = '/login'
        setTimeout(()=>{
          toast.success(res.message)
        },400)

        // if (!permissions?.readDashboard) url = '/profile'
        history(url);
      }
    })
  };
  return (
    <>
      <AuthLayout>
        <form className="" onSubmit={hendleSubmit} autoComplete='off'>
          <h4 className="text-typo mb-6 text-2xl font-bold">Sign Up</h4>
          <input type="email"
            onChange={e => setForm({ ...form, email: e.target.value })}
            value={form.email}
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-blue-500 focus:border-blue-500"
            placeholder="Email address"
            autoComplete='off'
            required />
             <input type="text"
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            value={form.fullName}
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 mb-3 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-blue-500 focus:border-blue-500"
            placeholder="Enter Name"
            autoComplete='off'
            required />
          <div className="relative mb-6">
            <input 
            type={eyes.password ? 'text' : 'password'} 
            className="shadow-box border-1 border-gray-300 relative bg-gray-100 w-full text-sm placeholder:text-gray-500 rounded-lg h-12 flex items-center gap-2 overflow-hidden px-2 hover:ring-blue-500 focus:border-blue-500" placeholder="Password"
             onChange={e => setForm({ ...form, password: e.target.value })}
             value={form.password}
             minLength={8}
             autoComplete='off'
            required />

            <div className='absolute right-2 inset-y-0 flex items-center text-gray-500 text-sm'>
              <i className={eyes.password ? 'fa fa-eye' : 'fa fa-eye-slash'} onClick={() => setEyes({ ...eyes, password: !eyes.password })}></i>

            </div>

          </div>
          <div className='flex'>
            <label className='flex items-center pointer'><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2 h-4 w-4" /> <span className='text-xs text-gray-600'>By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.</span></label>
            {/* <Link className="sign_up ml-auto text-primary" to="/forgotpassword"> Forgot Password</Link> */}
          </div>


          <div className="mt-8">
            <button type="submit" disabled={!remember} className="px-4 w-full text-sm font-normal text-white h-12 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">Sign Up</button>
          </div>

          <p className='text-sm mt-3 text-center'>Already have an account? <Link to="/login" className='text-primary text-sm'>Sign In</Link></p>

        </form>
      </AuthLayout>
    </>
  );
};

export default Signup;