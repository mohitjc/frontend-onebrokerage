import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoComplete";
import addressModel from "../../models/address.model";
import ImageUpload from "../../components/common/ImageUpload";
import { useNavigate } from "react-router-dom";
import PageLayout from "../../components/global/PageLayout";

const AddEdit = () => {
  const { role, id } = useParams();
  const [images, setImages] = useState({ image: "", logo: "" });
  // const defaultvalue = userType;
  const [form, setForm] = useState({});
  const [isSearch, setisSearch] = useState(false);
  const [Trucks, SetTruck] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  const [filter, setfilter] = useState({});
  const [Vin, setVin] = useState('')
  const user = useSelector((state) => state.user);
  const [addressSellected, setAddressSellected] = useState(false);
  const formValidation = [
    { key: "firstName", message: "Name is required", required: true },
    { key: "email", required: true, message: "Email is required", email: true },
    { key: "license_image", message: "License Image is required" },
    { key: "license_number", required: true, message: "License Number is required" },
    { key: "address", required: true, message: "Address is required" },
    { key: "city", required: true, message: "City is required" },
    { key: "state", required: true, message: "State is required" },
    { key: "country", required: true, message: "Country is required" },
    { key: "pincode", required: true, message: "Pin Code is required" },
    // { key: "truck_id", required: true ,message: "Truck is required" },
  ];

  const getError = (key) => {
    // return methodModel.getError(key, form, formValidation)
  };
  const GetTruck = (e) => {
    if (e?.search) {
      setisSearch(true);
    } else {
      setisSearch(false);
    }
    ApiClient.get('trucks', { ...e, addedBy: user?.id }).then((res) => {
      if (res.success) {
        SetTruck(res?.data?.data);
        // setVin()
      }
    });
  };
  const emailvalidation = () => {
    if (form?.email) {
      let splitEmail = form?.email?.split("@")[1]
      if (splitEmail && (splitEmail.includes("yahoo.com") || splitEmail.includes("gmail.com") || splitEmail.includes("outlook.com") || splitEmail.includes("hotmail.com"))) {
        return false
      }
      else {
        return true
      }
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (
      !emailvalidation() ||
      !form?.firstName ||
      !form?.licence_number ||
      !form?.city ||
      !form?.address ||
      !form?.pincode ||
      !form?.state ||
      !form?.country ||
      !form?.truck_id ||
      !form?.license_image
    ) {
      return false;
    }

    let method = id ? "put" : "post";
    let url = id ? shared.editApi : shared.addApi;
    let value = {
      address: form?.address,
      city: form?.city,
      state: form?.state,
      country: form?.country,
      dialCode: form?.dialCode,
      mobileNo: form?.mobileNo,
      firstName: form?.firstName,
      lastName: form?.lastName,
      pincode: form?.pincode,
      email: form?.email,
      licence_number: form?.licence_number,
      license_image: form?.license_image,
      truck_id: form?.truck_id,
    };
    if (form.id) {

      value = {
        id: form?.id,
        pincode: form?.pincode,
        address: form?.address,
        city: form?.city,
        state: form?.state,
        country: form?.country,
        dialCode: form?.dialCode,
        mobileNo: form?.mobileNo,
        firstName: form?.firstName,
        lastName: form?.lastName,
        licence_number: form?.licence_number,
        license_image: form?.license_image,
        truck_id: form?.truck_id,
      };
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        history(`/${shared.url}`);
        toast.success(res?.message);
      }
      loader(false);
    });
  };


  const addressResult = async (e) => {
    let address = {};
    if (e.place) {
      address = addressModel.getAddress(e.place);
      setAddressSellected(true);
    } else {
      setAddressSellected(false);
    }
    setForm({
      ...form,
      address: e.value,
      country: address.country || "",
      city: address.city || "",
      state: address.state || "",
      pincode: address.pincode || "",
      // lat: address.lat || "",
      // lng: address.lng || "",
    });
    if (e.place) {
      // setTimezoneLoader(true)
      const apires = await addressModel.gettimeZone(e.place);
      // setTimezoneLoader(false)
      setForm({
        ...form,
        address: e.value,
        country: address.country || "",
        city: address.city || "",
        state: address.state || "",
        pincode: address.pincode || "",
        // lat: address.lat || "",
        // lng: address.lng || "",
      });
    }
  };

  const back = () => {
    history.push("/drivers");
  };




  const GetLoadDetails = () => {
    ApiClient.get("driver", { id }).then((res) => {
      if (res.success) {

        setForm(res?.data);
        setVin(res?.data?.truck_details?.vin_number)
      }
    });
  };
  useEffect(() => {
    setSubmitted(false);
    GetTruck();
    if (id) {
      GetLoadDetails();
    }

  }, [id]);


  const [licence, setLicence] = useState([]);
  const [licenceLoader, setLicenceLoader] = useState(false);
  const getLicence = (p) => {
    setLicenceLoader(true)
    ApiClient.get('driver-by-license', { licence_number: p }).then(res => {
      setLicenceLoader(false)
      if (res.success) {
        setLicence(res.data)
      }
    })
  }

  useEffect(() => {
    if (form.licence_number) {
      getLicence(form.licence_number)
    }
  }, [form.licence_number])
  return (
    <PageLayout>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-8">
          <Tooltip placement="top" title="Back">
            <div
              onClick={() => history(-1)}
              className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
            >
              <i className="fa fa-angle-left text-lg"></i>
            </div>
          </Tooltip>
          <div>
            <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
              {id ? "Edit" : "Add"} {shared.addTitle}
            </h3>
            <p className="text-sm font-normal text-[#75757A]">
              Here you can see all about your Carriers
            </p>
          </div>
        </div>
        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className="bg-[#1245940a] p-4 border-b">
            <h3 className="text-[20px] font-[500]">Basic information</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            <div className="">
              <FormControl
                type="text"
                label="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e })}
                required
              />
            </div>
            <div className="">
              <FormControl
                type="text"
                label="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e })}
              />
            </div>
            <div className="">
              <FormControl
                type="text"
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e })}
                required
                disabled={id ? true : false}
              />
              {form.email && submitted && (
                <div className="invalid-feedback d-block">
                  Please enter a valid email
                </div>
              )}
            </div>

            <div className="col-md-6 ">
              <label className="">Mobile No</label>
              <div className="phoneInput_cls d-flex form-control p-0">
                {/* <PhoneInput
                  country={'us'}
                  value={form?.dialCode}
                  countryCodeEditable={false}
                  enableSearch={true}
                  placeholder=""
                  onChange={(phone, country) => {
                    setForm({
                      ...form,
                      dialCode: country.dialCode,
                    });
                  }}
                /> */}

                <input
                  type="text"
                  className="form-control phph"
                  placeholder="Mobile No."
                  value={(form && form.mobileNo) || ''}
                  maxLength={12}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      mobileNo: methodModel.isNumber(e),
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 ">
              <label> License Number <span className="text-danger">*</span></label>

              <div className="input-new-design">
                <input
                  type="text"
                  pattern="^[a-zA-Z0-9]+$"
                  onKeyPress={(e) => {
                    var regex = new RegExp(
                      '^[a-zA-Z0-9]+$'
                    );
                    var key = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    );
                    if (!regex.test(key)) {
                      e.preventDefault();
                      return false;
                    }
                  }}
                  className="form-control"
                  required
                  value={form.licence_number}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      licence_number: e.target.value,
                    })
                  }
                />
              </div>

              {submitted && !form.licence_number ? (
                <div className="invalid-feedback d-block">
                  licence number is Required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="col-md-12 ">
              <label> License Upload <span className="text-danger">*</span></label>

              <div className='d-block license-upload'>
                <ImageUpload
                  idd="LicenceImage"
                  value={form?.license_image}
                  // multiple={true}
                  result={(e) => {
                    setForm({ ...form, license_image: e.value })
                  }}
                />
                {submitted && !form.license_image ? (
                  <div className="invalid-feedback d-block">
                    license Image is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>


          </div>


        </div>

        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className="bg-[#1245940a] p-4 border-b">
            <h3 className="text-[20px] font-[500]">Address </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {/* <div className="">
              <FormControl
                type="text"
                label="Address*"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e })}
                required
              />
            </div> */}
            <div className="">
              <label className="label_profile">
                Address<span className="star">*</span>
              </label>
              <div>
                <GooglePlaceAutoComplete
                  value={form.address}
                  result={addressResult}
                  id="address"
                  placeholder=""
                />
                {form.address == "" && submitted ? (
                  <div className="invalid-feedback d-block">
                    Please Select Location Suggestion
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="">
              <FormControl
                type="text"
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e })}
                required
              />
            </div>
            <div className="">
              <FormControl
                type="text"
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e })}
                required
              />
            </div>
            <div className="">
              <FormControl
                type="text"
                label="Country"
                value={form.country}
                onChange={(e) => setForm({ ...form, country: e })}
                required
              />
            </div>
            <div className="">
              <FormControl
                type="text"
                label="ZipCode"
                value={form.pincode}
                onChange={(e) => setForm({ ...form, pincode: e })}
                required
              />
            </div>
          </div>


        </div>


        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className="bg-[#1245940a] p-4 border-b flex justify-between">
            <h3 className="text-[20px] font-[500]">Truck Details </h3>

            {/* <div className="relative">

         
<i className='fa fa-search absolute right-4 top-1/2 -translate-y-1/2'></i>
<input
  placeholder="Search Trucks"
  value={filter?.search}
  className="form-control"
  type="text"
  onChange={(e) => {
    GetTruck({ search: e.target.value });
    setfilter({
      ...filter,
      search: e.target.value,
    });
  }}
/>
</div>
{isSearch && (
<>
{Trucks &&
  Trucks?.map((itm) => {
    if (itm)
      return (<div className="dropspdiv dropsdivTwo">
        <span
          className="dropspans"
          onClick={() => {
            setForm({
              ...form,
              truck_id: itm?.id,
              vin_number: itm?.vin_number,
            });
            setVin(itm?.vin_number);
            setisSearch(false);
            setfilter({ search: '' });
          }}
        >
          {itm?.truck_number}
        </span>


      </div>);
    else
      return <></>
  })}
</>

)} */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
            {/* <img src="/assets/img/fast.svg" className='' /> */}
           
           
            <div className="">
         
              <label>
                Truck
                <span className="text-danger">*</span>
              </label>
          
              <select
                required
                className="form-control"
                onChange={(e) => {
                  setForm({
                    ...form,
                    truck_id: e.target.value,
                    vin_number: e.target.id,
                  });
                  let fltr = Trucks?.filter(
                    (itm) => itm?.id == e.target.value
                  );
                  setVin(e.target.value == "" ? "" : fltr[0]?.vin_number);
                }}
                value={form?.truck_id}
              >
                <option value="" id="">Select Truck</option>
                {Trucks?.map((itm) => {
                  return (
                    <option value={itm.id} id={itm?.vin_number}>
                      {itm?.truck_number}
                    </option>
                  );
                })}
              </select>
            </div>
            {submitted && !form.firstName ? (
              <div className="invalid-feedback d-block">
                Truck is Required
              </div>
            ) : (
              <></>
            )}
            <div className="">
              <label>VIN Number</label>
              <input
                type="text"
                required
                disabled
                className="form-control"
                value={Vin}
              />
            </div>
          </div>


        </div>


        <div className="flex justify-end mt-4">
          <button type="submit" className="btn btn-primary">
            {/* {id ? "Update" : "Add"} {shared.addTitle} */}
            Save
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default AddEdit;
