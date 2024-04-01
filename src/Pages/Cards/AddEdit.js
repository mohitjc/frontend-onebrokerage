import { useState, useEffect } from "react";
import { ToastsStore } from "react-toasts";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import { useSelector } from 'react-redux';
import methodModel from "../../methods/methods";
import { featureType } from "../../models/type.model";
import { useHistory, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import SelectDropdown from "../../components/common/SelectDropdown";
import pipeModel from "../../models/pipeModel";
import Breadcrumb from "../../components/common/Breadcrumb";
import environment from "../../environment";

const AddEditCards = () => {
  const [images, setImages] = useState({ image: '', banner: '', icon: '' });
  const [features, setFeatures] = useState([{ name: 'Option 1️⃣', id: 1 }, { name: 'Option 2️⃣', id: 2 }])

  const defaultvalue = () => {
    let keys = { ...featureType }
    Object.keys(featureType).map(itm => {
      if (itm != 'permissions') keys[itm] = ''
    })
    keys.status = 'active'
    return keys
  }
  const { id } = useParams()
  const [form, setform] = useState(featureType)
  const history = useHistory()
  const [submitted, setSubmitted] = useState(false)
  const [country, setcountry] = useState()
  const user = useSelector((state) => state.user);
  const formValidation = [
    // { key: 'status', required: true },
    { key: 'country', required: true },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // return
    let invalid = methodModel.getFormError(formValidation, form)
    if (invalid) return
    let method = 'post'
    let url = 'api/add/card'
    let value = {
      ...form,
      userId:user.id||user?._id,
      card_number:pipeModel.cardToNumber(form.card_number)
    }
    if (value.id) {
      method = 'put'
      url = ''
    } else {
      delete value.id
    }

    if(user?.subRole&&user?.subRole?.id==environment.SubRolePartner){
      delete value.userId
    }
    loader(true)
    ApiClient.allApi(url, value, method).then(res => {
      loader(false)
      if (res.success) {
        ToastsStore.success(res.message)
        history.push("/card")
      }
      
    })
  }

  useEffect(() => {
    if (id) {
      loader(true)
      ApiClient.get('', { id }).then(res => {
        if (res.success) {
          let value = res.data
          let payload = featureType

          Object.keys(payload).map(itm => {
            payload[itm] = value[itm]
          })
          if (value.permissions) {
            payload.permissions = { ...value.permissions[0] }
            // payload.permissions={ ...payload.permissions,...value.permissions}
          }
          if (value.category) {
            payload.category = value.category._id
          }
          setform({
            ...payload
          })
        }
        loader(false)
      })
    } else {
      setform(defaultvalue())
    }

  }, [id])

  const onSelect = (e) => {
    console.log("onSelect", e)
  }

  const onRemove = (e) => {
    console.log("onRemove", e)
  }

  const getCountry = () => {
    ApiClient.get(`api/country/listing`).then(res => {
      setcountry(res.data)
    })
  }
  useEffect(() => {
    getCountry()
  }, [])

  const numberChange = (value) => {
    return pipeModel.card(value)
  }

  return <>
    <Layout>
      <Breadcrumb
        links={[
          {
            name: "Payment methods",
            link: "/card",
          },
        ]}
        currentPage={"Add Card"}
      />
      <h3 className="text-2xl font-semibold text-typo mt-2">{form && form.id ? 'Edit' : 'Add'} Card</h3>
      <div className="bg-white shadow-box rounded-lg w-full  mt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-y-4 gap-x-5 !px-5 py-[18px]">
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">Card Number</label>
              <input
                type="text"
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                minLength={19}
                maxLength={19}
                value={form.card_number}
                onChange={e => setform({ ...form, card_number: numberChange(e.target.value) })}
                required
              />
            </div>
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">Expire Month</label>
              <input
                type="text"
                minLength={2}
                maxLength={2}
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                value={form.exp_month}
                onChange={e => setform({ ...form, exp_month: methodModel.isNumber(e) })}
                required
              />
            </div>
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">Expire Year</label>
              <input
                type="text"
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                minLength={4}
                maxLength={4}
                value={form.exp_year}
                onChange={e => setform({ ...form, exp_year: methodModel.isNumber(e) })}
                required
              />
            </div>
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">CVC</label>
              <input
                type="text"
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                minLength={3}
                maxLength={3}
                value={form.cvc}
                onChange={e => setform({ ...form, cvc: methodModel.isNumber(e) })}
                required
              />
            </div>
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">Zip Code</label>
              <input
                type="text"
                className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 !ring-primary !outline-primary"
                minLength={6}
                maxLength={6}
                value={form.zip_code}
                onChange={e => setform({ ...form, zip_code: methodModel.isNumber(e) })}
                required
              />
            </div>
            <div>
              <label className="text-[#75757A] text-sm font-normal !mb-3">Country</label>
              <SelectDropdown
                isSingle={true}
                id="statusDropdown"
                displayValue="name"
                placeholder="Select Country"
                intialValue={form.country}
                result={e => { setform({ ...form, country: e.value }) }}
                options={country}
                theme="search"
                className="w-full"
              />
              {submitted && !form.country ? <div className="text-danger">Country is Required</div> : <></>}
            </div>
          </div>
          <div className="px-6 !py-4 border-t border-[#EAECF0] flex justify-end items-center !gap-3">
            <button type="button" className="!px-4 text-typo text-sm font-medium py-2.5 flex items-center justify-center gap-2 bg-[#fff] rounded-lg shadow-btn hover:bg-[#F3F2F5] border border-[#D0D5DD] transition-all focus:ring-2 ring-[#F1F2F3] disabled:bg-[#F3F2F5] disabled:cursor-not-allowed" onClick={e => { history.goBack() }}>Back</button>
            <button type="submit" className="!px-4 text-sm font-medium text-white h-10 flex items-center justify-center gap-2 !bg-primary rounded-lg shadow-btn hover:opacity-80 transition-all focus:ring-2 ring-[#EDEBFC] disabled:bg-[#D0CAF6] disabled:cursor-not-allowed">Save</button>
          </div>
        </form>
      </div>
    </Layout>
  </>
}

export default AddEditCards