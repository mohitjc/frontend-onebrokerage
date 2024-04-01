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
import methodModel from '../../methods/methods';
import FormControl from '../../components/common/FormControl';

const Signup = () => {
  const history = useNavigate();
  const user:any = crendentialModel.getUser()
 

  const [form, setForm]:any = useState({ email: '', password: '', fullName: '',customerRole:environment.customerRoleId });
  const [remember, setRemember] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [groups, setGroups] = useState([]);
  const [eyes, setEyes] = useState({ password: false, confirmPassword: false, currentPassword: false });


  const setLogin=(data:any)=>{
    localStorage.setItem('token', data.access_token)
    crendentialModel.setUser(data)
    let url = '/profile'
    let eventId=methodModel.getPrams('eventId')
    if(eventId) url=`/event/detail/${eventId}`
    history(url);
  }

  const getGroups=()=>{
    ApiClient.get('api/group/list',{status:'active'}).then((res:any)=>{
      if(res.success){
        setGroups(res.data)
      }
    })
  }

  const hendleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitted(true)
    const data = {
      role:environment.userRoleId,
      ...form
    };


    if(data.customerRole==environment.glRoleId){
      if(!data.groupId){
        return
      }
    }

    loader(true)
    let url='api/user/register'
    let eventId=methodModel.getPrams('eventId')
    ApiClient.post(url, data).then(async res => {
   
      if (res.success) {
        if(eventId){
          await ApiClient.post('api/auto/login',{id:res.data._id}).then(async res=>{
            setLogin(res.data)
          })
          
        }else{
          let url = '/login'
          setTimeout(()=>{
            toast.success(res.message)
          },400)
          history(url);
        }
       
      }
      loader(false)
    })
  };

  useEffect(() => {
    if (user && user?.loggedIn) {
      history('/dashboard')
    }

    let email=methodModel.getPrams('email')
    if(email){
      setForm({
        email:email,
        fullName:methodModel.getPrams('fullName'),
      })
    }

    getGroups()
  }, [])
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

          <div className='mb-3'>
            <FormControl
            type='radio'
            options={[
              {id:environment.customerRoleId,name:'No'},
              {id:environment.glRoleId,name:'Yes'},
            ]}
            label="Do You Want To Be A Group Leader"
            value={form.customerRole}
            onChange={(e:any)=>{
              setForm({...form,customerRole:e,groupId:null})
            }}
            />
          </div>

{form.customerRole==environment.glRoleId?<>
  <div className='mb-3 relative'>
           
           <FormControl
           type='select'
           options={groups}
           displayValue="name"
           placeholder="Select Group"
           label="Group"
           value={form.groupId}
           onChange={(e:any)=>{
             setForm({...form,groupId:e})
           }}
           />
           {submitted&&!form.groupId?<>
           <div className='text-red-600 text-sm'>Group is required</div>
           </>:<></>}
         </div>
</>:<></>}
          
          <div className='flex'>
            <label className='flex items-center pointer'><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mr-2 h-4 w-4" /> <span className='text-xs text-gray-600'>By clicking Create account, I agree that I have read and accepted the Terms of Use and Privacy Policy.</span></label>
            {/* <Link className="sign_up ml-auto text-primary" to="/forgotpassword"> Forgot Password</Link> */}
          </div>

          


          <div className="mt-8">
            <button type="submit" disabled={!remember} className="px-4 w-full text-sm font-normal text-white h-12 flex items-center justify-center gap-2 !bg-orange-500 rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">Sign Up</button>
          </div>

          <p className='text-sm mt-3 text-center'>Already have an account? <Link to="/login" className='text-orange-500 text-sm'>Sign In</Link></p>

        </form>
      </AuthLayout>
    </>
  );
};

export default Signup;