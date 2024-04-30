import React, { useEffect, useState } from 'react';
import methodModel from '../../../methods/methods';
import { Link } from 'react-router-dom';
import './style.scss';
import PhoneInput from 'react-phone-input-2';
import SelectDropdown from '../../common/SelectDropdown';
import MultiSelectDropdown from '../../common/MultiSelectDropdown';
import countryStateModel from '../../../models/countryState.model';
import timezoneModel from '../../../models/timezone.model';
import ImageUpload from '../../common/ImageUpload';
import ApiClient from '../../../methods/api/apiClient';
import environment from '../../../environment';
import { MdDeleteOutline } from "react-icons/md";
import FormControl from '../../common/FormControl';


const Html = ({ handleSubmit, setForm, form, getError,imageResult,images, uploadImage, submitted }) => {



  const editAddress = (i, v, key = 'value') => {
    let arr = form.multiAddress || []
    arr[i][key] = v
    setForm({ ...form, multiAddress: [...arr] })
  }

  const addAddress = () => {
    let arr = form.multiAddress || []
    let aid=String(new Date().getTime())
    arr.push({ id:aid})
    setForm({ ...form, multiAddress: [...arr] })
  }

  const removeAddress = (i) => {
    let arr = form.multiAddress || []
    arr = arr.filter((itm, index) => index != i)
    setForm({ ...form, multiAddress: [...arr] })
  }

  const [certificate, setCertificate] = useState([])
  const [skillRoles, setSkillRoles] = useState([])
  const [categories, setCategories] = useState([])
  const [states, setState] = useState([])
  const [subcategories, setSubCategories] = useState([])
  const [subsubcategories, setSubSubCategories] = useState([])
  const [eyes, setEyes] = useState({})
  const countries=countryStateModel.list
  const timezones=timezoneModel.list
  const [roles, setRoles] = useState([])


const getCertificates = () => {
  ApiClient.get('api/certificate/list', { status: 'active' }).then(res => {
    if (res.success) {
      setCertificate(res.data)
    }
  })
}

const getSkills = () => {
  ApiClient.get('api/skills/listing', { status: 'active',
  // skillRole:form.customerRole
 }).then(res => {
    if (res.success) {
      setSkillRoles(res.data)
    }
  })
}
const getCategories = () => {
  ApiClient.get('api/categorie/list', { status: 'active',catType:environment.professionType }).then(res => {
    if (res.success) {
      setCategories(res.data)
    }
  })
}

const getSubCategories = (p={}) => {
  ApiClient.get('api/categorie/list', { status: 'active',catType:environment.professionType,...p }).then(res => {
    if (res.success) {
      setSubCategories(res.data)
    }
  })
}


const getSubSubCategories = (p={}) => {
  ApiClient.get('api/categorie/list', { status: 'active',catType:environment.professionType,...p }).then(res => {
    if (res.success) {
      setSubSubCategories(res.data)
    }
  })
}


useEffect(() => {
  getCertificates()
  getCategories()
  getSkills()
}, [])

useEffect(() => {
  // if(form.customerRole){
  //   getSkills()
  // }
}, [form.customerRole])

useEffect(() => {
  if(form.category){
    getSubCategories({parentCategory:form.category})
  }
}, [form.category])

useEffect(() => {
  if(form.subCategory){
    getSubSubCategories({parentCategory:form.subCategory})
  }
}, [form.subCategory])

useEffect(() => {
  if(form.country){
    let arr=countryStateModel.getStates(form.country)
    setState([...arr])
  }
}, [form.country])


const getRoles=()=>{
  ApiClient.get('api/skillRole/list',{status:'active'}).then(res=>{
      if(res.success){
          setRoles(res.data)
      }
  })
}

useEffect(()=>{
  getRoles()
},[])


  return (
    <>

      <div className='wrapper_section'>
        <div className='flex items-center  justify-between'>
          <h3 className='text-2xl font-semibold text-[#111827]'>Edit Profile </h3>

        </div>


        <form name="profileForm" className="" onSubmit={handleSubmit} >


        <div className="grid grid-cols-12 mb-4 gap-4 shadow p-4 mt-6 gap-4">
            <div className="col-span-12 md:col-span-6">
              <FormControl
              type="text"
              label="Name"
              value={form.fullName}
              onChange={e => setForm({ ...form, fullName: e })}
              required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <FormControl
              type="text"
              label="Profession Title"
              value={form.profession}
              onChange={e => setForm({ ...form, profession: e })}
              required
              />
            </div>



            <div className="col-span-12 md:col-span-6">
              <label>Mobile No<span className="star">*</span></label>
              <PhoneInput
                country={'us'}
                value={form.mobileNo}
                enableSearch={true}
                limitMaxLength
                required
                onChange={e => setForm({ ...form, mobileNo: e })}
                countryCodeEditable={true}
                minlegth="10"
              />
              {submitted && getError('mobileNo').invalid ? <div className="invalid-feedback d-block">Min Length is 10</div> : <></>}
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Email</label>
              <input
                type="email"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.email}
                autoComplete="false"
                onChange={e => { setForm({ ...form, email: e.target.value }); }}
                required
                disabled
              />

            </div>


            <div className="col-span-12 md:col-span-6">
              <label className='lablefontcls'>Image</label><br></br>
              <ImageUpload model="users" result={e => imageResult(e, 'image')} value={images.image || form.image} multiple={false} />
            </div>


            <div className="col-span-12 md:col-span-6">
              <label>Company<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Company Url<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.companyUrl}
                onChange={e => setForm({ ...form, companyUrl: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Address<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
                required
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Address 2<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.address2}
                onChange={e => setForm({ ...form, address2: e.target.value })}
                
              />
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>Country<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Country"
                intialValue={form.country}
                result={e => { setForm({ ...form, country: e.value,state:'' }) }}
                options={countries}
                theme="search"
              />
              {submitted && !form.state ? <div className="invalid-feedback d-block">State/Province Title is Required</div> : <></>}
            </div>

            <div className="col-span-12 md:col-span-6">
              <label>State/Province<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select State/Province"
                intialValue={form.state}
                result={e => { setForm({ ...form, state: e.value }) }}
                options={states}
                theme="search"
              />
              {submitted && !form.state ? <div className="invalid-feedback d-block">State/Province Title is Required</div> : <></>}
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Zip/Postal Code<span className="star">*</span></label>
              <input
                type="number"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.postal_code}
                onChange={e => setForm({ ...form, postal_code: e.target.value })}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>City<span className="star">*</span></label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.city}
                onChange={e => setForm({ ...form, city: e.target.value })}
                required
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Timezone<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Timezone"
                intialValue={form.timezone}
                result={e => { setForm({ ...form, timezone: e.value }) }}
                options={timezones}
                theme="search"
              />
              {submitted && !form.timezone ? <div className="invalid-feedback d-block">State/Province Title is Required</div> : <></>}
            </div>

            {/* <div className="col-span-12 md:col-span-6">
              <label>Customer Role<span className="star">*</span></label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Customer Role"
                intialValue={form.customerRole}
                result={e => { setForm({ ...form, customerRole: e.value,skills:[] }) }}
                options={roles}
                theme="search"
                disabled
              />
              {submitted && !form.customerRole ? <div className="invalid-feedback d-block">Customer Role is Required</div> : <></>}
            </div> */}

            <div className="col-span-full">
              <label>Admin Comment</label>
              <textarea disabled
                className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                value={form.adminComment}
                onChange={e => setForm({ ...form, adminComment: e.target.value })}

              ></textarea>
            </div>



            <div className="col-span-full">
              <h4 className="text-1xl font-semibold text-[#111827]">Public Profile Info</h4>
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Linkedin Profile Url</label>
              <input
                type="text"
                className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                value={form.linkedInUrl}
                onChange={e => setForm({ ...form, linkedInUrl: e.target.value })}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <label>Certification</label>
              <SelectDropdown
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Certification"
                intialValue={form.certification}
                result={e => { setForm({ ...form, certification: e.value }) }}
                options={certificate}
                theme="search"
              />
              {/* {submitted && !form.certification ? <div className="invalid-feedback d-block">Certification is Required</div> : <></>} */}
            </div>

           
           
          </div>



          <div className='shadow grid grid-cols-12 gap-4 mb-4  p-4'>
             <div className="col-span-12 md:col-span-6">
                 <label>Skills</label>
                 <MultiSelectDropdown
                   displayValue="title"
                   placeholder="Select Skills"
                   intialValue={form.skills}
                   result={e => {
                     setForm({ ...form, skills: e.value })
                     console.log("e", e)
                   }}
                   options={skillRoles}
                   theme="search"
                 />
                 {/* {submitted && !form.skills?.length ? <div className="invalid-feedback d-block">Skills is Required</div> : <></>} */}
               </div>
 
             <div className="col-span-full">
               <label>Networking Groups</label>
               <textarea
                 className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                 value={form.networkingGroup}
                 onChange={e => setForm({ ...form, networkingGroup: e.target.value })}
 
               ></textarea>
             </div>
 
             <div className="col-span-12 md:col-span-6">
               <label>Profession Category</label>
               <SelectDropdown
                 id="statusDropdown"
                 displayValue="name"
                 placeholder="Select Profession Category"
                 intialValue={form.category}
                 result={e => { setForm({ ...form, category: e.value,subCategory:'' }) }}
                 options={categories}
                 theme="search"
               />
               {/* {submitted && !form.category ? <div className="invalid-feedback d-block">Profession Category is Required</div> : <></>} */}
             </div>
 
             <div className="col-span-12 md:col-span-6">
               <label>Profession Sub Category</label>
               <SelectDropdown
                 id="statusDropdown"
                 displayValue="name"
                 placeholder="Select Profession Sub Category"
                 intialValue={form.subCategory}
                 result={e => { setForm({ ...form, subCategory: e.value }) }}
                 options={subcategories}
                 theme="search"
               />
               {/* {submitted && !form.subCategory ? <div className="invalid-feedback d-block">Profession Sub Category is Required</div> : <></>} */}
             </div>

             <div className="col-span-12 md:col-span-6">
               <label>Profession Sub Sub Category</label>
               <SelectDropdown
                 id="statusDropdown"
                 displayValue="name"
                 placeholder="Select Profession Sub Sub Category"
                 intialValue={form.subSubCategory}
                 result={e => { setForm({ ...form, subSubCategory: e.value }) }}
                 options={subsubcategories}
                 theme="search"
               />
               {/* {submitted && !form.subCategory ? <div className="invalid-feedback d-block">Profession Sub Category is Required</div> : <></>} */}
             </div>
 
 
             <div className="col-span-full">
               <label>Short Bio</label>
               <textarea
                 className="relative shadow-box bg-white w-full rounded-lg flex items-center gap-2 overflow-hidden px-2"
                 value={form.aboutUs}
                 onChange={e => setForm({ ...form, aboutUs: e.target.value })}
 
               ></textarea>
             </div>
             </div>

             <div className='shadow grid grid-cols-12 gap-4 mb-4  p-4'>
            <div className="col-span-full ">
            <div className=" ">
              {/* <h4 className="text-1xl font-semibold text-[#111827]">Addresses</h4> */}
              <div className=''>

             
              <div className="">
                {form?.multiAddress?.map((itm, i) => {
                  return <>
                    <div className="grid grid-cols-2 gap-2 shadow bg-white p-4 p-3 mb-3 bg-white rounded-md">
                      <div className="">
                        <label>First Name</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.firstName}
                          onChange={(e) => editAddress(i, e.target.value, 'firstName')}
                          required
                        />
                      </div>
                      <div className="">
                      <label>Last Name</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.lastName}
                          onChange={(e) => editAddress(i, e.target.value, 'lastName')}
                        />
                      </div>
                      <div className="">
                        <label>Email</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.email}
                          onChange={(e) => editAddress(i, e.target.value, 'email')}
                          required
                        />
                      </div>
                      <div className="">
                        <label>Phone Number</label>
                        <PhoneInput
                          country={'us'}
                          value={itm.mobileNo}
                          enableSearch={true}
                          limitMaxLength
                          required
                          onChange={e =>editAddress(i, e, 'mobileNo')}
                          countryCodeEditable={true}
                        />
                      </div>
                      <div className="">
                      <label>Address</label>
                        <input type="text"
                          className="relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2"
                          value={itm.address}
                          onChange={(e) => editAddress(i, e.target.value, 'address')}
                          required
                        />
                      </div>
                      <div className='relative'>
                          <div className='bg-red-500 absolute right-0 top-6  rounded-md p-2 cursor-pointer' onClick={() => removeAddress(i)}>
                           
                            <p className='flex items-center gap-x-2 text-white'>  <MdDeleteOutline className=" text-white"  /> Delete</p>
                          </div>
                      </div>
                    </div>
                  </>
                })}


              </div>
              <div className="text-right mt-3">
                <button type="button" onClick={addAddress} className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Address</button>
              </div>
               </div>
              </div>
            </div>
            </div>


          <div className="text-right mt-3">
                <button className="text-white bg-orange-400 bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>
              </div>

        </form>





      </div>


    </>
  );
};

export default Html;
