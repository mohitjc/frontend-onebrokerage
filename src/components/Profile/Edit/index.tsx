import React, { useState, useEffect } from 'react';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import Html from './Html';
import { useNavigate } from 'react-router-dom';
import formModel from '../../../models/form.model';
import { useDispatch, useSelector } from 'react-redux';
import { login_success } from '../../../Pages/actions/user';

const EditProfile = () => {
  const user = useSelector((state:any) => state.user);
  const dispatch=useDispatch()
  const [data, setData] = useState('');
  const [form, setForm]:any = useState({
    id:'',
     email:'', 
     mobileNo:'',
     fullName:'',
     multiAddress:[],
     profession:'',
     company:'',
     companyUrl:'',
     address:'',
     address2:'',
     state:'',
     postal_code:'',
     city:'',
     timezone:'America/Los_Angeles',
    //  customerRole:'',
     adminComment:'',
     linkedInUrl:'',
     certification:'',
     skills:[],
     networkingGroup:'',
     category:null,
     subCategory:null,
     subSubCategory:null,
     aboutUs:'',
     country:'usa'
    });
    const [images, setImages]:any = useState({ image: '' });
  const history=useNavigate()
  const [submitted, setSubmitted] = useState(false)

  const gallaryData = () => {
    loader(true)
    ApiClient.get(`api/user/detail`,{id:user._id}).then(res => {
      if (res.success) {
        let payload = form
        let value = res.data
        let oarr = Object.keys(form)
        oarr.map(itm => {
            payload[itm] = value[itm] || null
        })
        payload.id=user._id
        if(!payload.timezone) payload.timezone='America/Los_Angeles'
        if(!payload.country) payload.country='usa'
        if(payload.category?._id) payload.category=payload.category._id
        if(payload.subCategory?._id) payload.subCategory=payload.subCategory._id
        if(payload.subSubCategory?._id) payload.subSubCategory=payload.subSubCategory._id

        // if(payload.customerRole?._id) payload.customerRole=payload.customerRole._id
        let multiAddress=value.multiAddress||[]
        payload.multiAddress=multiAddress.length?multiAddress:[]
        setForm({ ...payload })

        let img=images
        Object.keys(images).map(itm=>{
          img[itm]=value[itm]
        })

        setImages({...img})
        setData(value)
      }
      loader(false)
    })
  };

  const getError = (key:any) => {
    return formModel.getError('profileForm',key)
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setSubmitted(true)
    let invalid = formModel.getFormError('profileForm')
    if (invalid) return

    let value = { ...form, 
      id: user._id,
      addedBy: user._id,
      // verifiedGroupLeader:'approved',
      ...images
     }
   Object.keys(value).map(itm=>{
    if(!value[itm]) value[itm]=null
   })

    loader(true)
    ApiClient.put('api/user', value).then(res => {
      if (res.success) {
        let uUser = { ...user, ...value }
        dispatch(login_success(uUser))
        history("/profile")
        // ToastsStore.success(res.message)
      }
      loader(false)
    })
  };

  const uploadImage = (e:any) => {
    setForm({ ...form, baseImg: e.target.value })
    let files = e.target.files
    let file = files.item(0)
    loader(true)
    ApiClient.postFormData('api/upload/image?modelName=users', { file: file, modelName: 'users' }).then(res => {
      if (res.fileName) {
        let image = res.fileName
        setForm({ ...form, image: image, baseImg: '' })
      } else {
        setForm({ ...form, baseImg: '' })
      }
      loader(false)
    })
  }

 
  const imageResult = (e:any, key:any) => {
    images[key] = e.value
    setImages(images)
    console.log("imageResult", e)
}


  useEffect(
    () => {
      if (user.loggedIn) {
        gallaryData();
      }
    },[]);

  return (
    <>
     <Html
     handleSubmit={handleSubmit}
     setForm={setForm}
     imageResult={imageResult}
     images={images}
     form={form}
     uploadImage={uploadImage}
     getError={getError}
     submitted={submitted}
     />
    </>
  );
};

export default EditProfile;
