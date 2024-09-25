import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import "./profile.scss";
import methodModel from "../../methods/methods";
import { useSelector, useDispatch } from "react-redux";
import PageLayout from "../../components/global/PageLayout";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import GooglePlacesAutocomplete from "../../components/common/GooglePlaceAutoComplete";
import addressModel from "../../models/address.model";
import PhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { login_success, logout } from "../actions/user";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  const [data, setData] = useState({});

  const history = useNavigate();
  const [nextForm, SetNextForm] = useState(false);
  const [edit, SetEdit] = useState(false);
  const [changepassword, setChangePassword] = useState(false);

  // console.log(edit,"editedit")
  const [addressSelected, setAddressSellected] = useState(false);
  const [form, setForm] = useState({
    trailers_number: '',
    confirmPassword: '',
    currentPassword: '',
    newPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const formValidation = [
    {
      key: 'confirmPassword',
      minLength: 8,
      confirmMatch: ['confirmPassword', 'newPassword'],
    },
    { key: 'currentPassword', minLength: 8 },
    { key: 'newPassword', minLength: 8 },
  ];
  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
    currentPassword: false,
  });
  const getError = (key) => {
    return methodModel.getError(key, form, formValidation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);
    if (invalid) return;

    loader(true);
    ApiClient.put('change/password', {
      currentPassword: form?.currentPassword,
      newPassword: form?.newPassword,
    }).then((res) => {
      if (res.success) {
        dispatch(logout());
        localStorage.removeItem('token');
        localStorage.removeItem('persist:admin-app');
        toast.success('Password Reset Successfully ');
        history('/login?message=' + res.message);
        setChangePassword(false)
      }
      loader(false);
    });
  };

  const gallaryData = () => {
    loader(true);
    ApiClient.get(`user/detail`, { id: user.id }).then((res) => {
      if (res.success) {
        if (res?.data?.request_status == "rejected") {
          document.getElementById("Showpopup").click();
        }
        setData(res.data);
        setForm(res?.data);
        const data = res.data;
        const newdata = { ...user, ...data };
        dispatch(login_success(newdata));
      }
      loader(false);
    });
  };

  useEffect(() => {
    if (user && user.id) {
      gallaryData();
    }
  }, [user?.id]);

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
      country: address.country || '',
      city: address.city || '',
      state: address.state || '',
      zipcode: address.zipcode || '',
      lat: address.lat || '',
      lng: address.lng || '',
    });
    if (e.place) {
      // setTimezoneLoader(true)
      // const apires = await addressModel.gettimeZone(e.place);
      // setTimezoneLoader(false)
      setForm({
        ...form,
        address: e.value,
        country: address.country || '',
        city: address.city || '',
        state: address.state || '',
        pincode: address.zipcode || '',
        lat: address.lat || '',
        lng: address.lng || '',
      });
    }
  };

  const uploadImage = (e) => {
    console.log(e, "images")
    setForm({ ...form, baseImg: e.target.value });
    let files = e.target.files;
    let file = files.item(0);
    loader(true);
    ApiClient.postFormData('upload/image?modelName=users', { file: file }).then(
      (res) => {
        if (res.success) {

          let image = res?.data?.fullpath;
          setForm({ ...form, image: image, baseImg: '' });
        } else {
          setForm({ ...form, baseImg: '' });
        }
        loader(false);
      }
    );
  };

  const handleSubmit2 = (e) => {
    console.log("hiii")
    e.preventDefault();
    // document.getElementById("closepopup").click()
    let value = {
      id: user?.id,
      email: form?.email,
      fullName: form?.fullName,
      address: form?.address,
      city: form?.city,
      state: form?.state,
      pincode: form?.pincode,
      country: form?.country,
      telephoneNo: form?.telephoneNo,
      telephoneExt: form?.telephoneExt,
      fax_number: form?.fax_number,
      tax_number: form?.tax_number,
      trailers_number: form?.trailers_number,
      truck_number: form?.truck_number,
      team_truck: form?.team_truck,
      solo_truck: form?.solo_truck,
      image: form?.image,
      trailer_type: form?.trailer_type,
    };
    ApiClient.put('user/profile', value).then((res) => {
      if (res.success) {
        dispatch(login_success(res?.data));
        toast.success(res.message);
        SetEdit(false);
        gallaryData();
        SetNextForm(false);
      }
    });

  };
  const changeRequestStatus = () => {
    ApiClient.put(`carrier-request?id=${data?.id}&status=pending`).then((res) => {
      if (res.success) {
        toast.success(res.message);
        gallaryData()
      }
    });
  }

  return (
    <PageLayout>
      <div className="wrapper_section">
        <div className="flex md:items-center items-start  justify-between md:flex-row flex-col">
          <h3 className=" text-lg lg:text-2xl font-semibold text-[#111827]">
            Profile Information
          </h3>

          <div className="flex items-center gap-4">



            <div onClick={() => {
              SetEdit(true);
              setChangePassword(false)
            }}> <Link
              to="/profile"
              title="Edit Profile"
              className="bg-primary px-4 py-2 text-white rounded-xl"
            >
                <i
                  className="fa fa-edit me-2"
                  title="Edit Profile"

                />
                Edit Profile
              </Link>

            </div>
            <div
              className="bg-gray-200 px-4 py-2 text-black rounded-xl"
              onClick={() => {
                setChangePassword(true);
                SetEdit(false)
              }}
            >
              <i class="fa fa-lock me-2" aria-hidden="true"></i>
              Change Password
            </div >

          </div>



        </div>



        {!edit && !changepassword ?
          <div className=" sm:mt-3 md:mt-8 mt-8">
            <div className="grid items-center grid-cols-12 gap-4 mb-5">
              <div className="col-span-12  p-6 shadow-box overflow-hidden rounded-lg bg-white  border inner_part">
                <div className="flex md:items-center items-start gap-4 shrink-0 flex-col md:flex-row">
                  <div className="">
                    <img
                      src={methodModel.userImg(data && data.image)}
                      className="h-36 w-36 rounded-full object-cover mx-auto"
                    />
                  </div>
                  <div className="flex flex-col gap-y-4 md:ml-4 ml-0 lg:border-l border-dashed border-gray-400 md:pl-5 pl-0">
                    <div className="">
                      <label className="text-black">Name</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {" "}
                        {/* <LiaUserSolid className="text-xl" /> */}
                        {data && methodModel.capitalizeFirstLetter(data.fullName)}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Email</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.email}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Address</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.address}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="grid items-center grid-cols-12 gap-4 mb-5">
              <div className="col-span-12  p-6 shadow-box overflow-hidden rounded-lg bg-white  border inner_part">
                <div className="flex md:items-center items-start gap-4 shrink-0 flex-col md:flex-row">

                  <div className="flex flex-col gap-y-4 md:ml-4 ml-0 lg:border-l border-dashed border-gray-400 md:pl-5 pl-0">
                    <div className="">
                      <label className="text-black">Fax Number</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {" "}
                        {/* <LiaUserSolid className="text-xl" /> */}
                        {data && data?.fax_number || "--"}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Tax Number</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.tax_number}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Total Truck</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.total_trucks}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Team Trucks</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.team_truck}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Solo Trucks</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {/* <MdOutlineEmail className="text-xl" /> */}
                        {data && data.solo_truck}
                      </p>
                    </div>
                    <div className="">
                      <label className="text-black">Trailer Type</label>
                      <p className="text-sm text-gray-700 flex items-center gap-2 text-lg">
                        {data?.trailer_type?.map(
                          (itm) => {
                            return (
                              <p className="mb-0 me-2">
                                {itm == "dry_van" ? "dry van" : itm}{" "}
                              </p>
                            );
                          }
                        )}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div> : changepassword ?
            <div className="p-6 shadow-box overflow-hidden rounded-lg bg-white  border sm:mt-3 md:mt-8 mt-8">
              <form className="pprofile" onSubmit={handleSubmit}>
                <div className="col-md-12 mb-3">

                  <label className="mb-2">
                    Current Password
                    <span className="start">*</span>
                  </label>
                  <div className="inputWrapper">
                    <input
                      type={
                        eyes.currentPassword ? 'text' : 'password'
                      }
                      className="pl-2 relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden focus-visible:outline-0 px-2 focus:ring-0 border-0 focus:ring-0 border-0"
                      value={form.currentPassword}
                      maxLength="20"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          currentPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <i
                      className={
                        eyes.currentPassword
                          ? 'fa fa-eye'
                          : 'fa fa-eye-slash'
                      }
                      onClick={() =>
                        setEyes({
                          ...eyes,
                          currentPassword: !eyes.currentPassword,
                        })
                      }
                    ></i>
                  </div>
                  {submitted &&
                    getError('currentPassword').invalid ? (
                    <div className="invalid-feedback d-block">
                      Min Length must be 8 characters long
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="mb-2">
                    New Password<span className="start">*</span>
                  </label>

                  <div className="inputWrapper">
                    <input
                      type={eyes.password ? 'text' : 'password'}
                      className="pl-2 relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden focus-visible:outline-0 px-2 focus:ring-0 border-0 focus:ring-0 border-0"
                      value={form.newPassword}
                      maxLength="20"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          newPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <i
                      className={
                        eyes.password
                          ? 'fa fa-eye'
                          : 'fa fa-eye-slash'
                      }
                      onClick={() =>
                        setEyes({
                          ...eyes,
                          password: !eyes.password,
                        })
                      }
                    ></i>
                  </div>
                  {submitted &&
                    getError('newPassword').invalid ? (
                    <div className="invalid-feedback d-block">
                      Min Length must be 8 characters long
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="col-md-12 mb-3">
                  <label className="mb-2">
                    Confirm Password
                    <span className="start">*</span>
                  </label>

                  <div className="inputWrapper">
                    <input
                      type={
                        eyes.confirmPassword ? 'text' : 'password'
                      }
                      className="pl-2 relative shadow-box bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden focus-visible:outline-0 px-2 focus:ring-0 border-0 focus:ring-0 border-0"
                      value={form.confirmPassword}
                      maxLength="20"
                      onChange={(e) =>
                        setForm({
                          ...form,
                          confirmPassword: e.target.value,
                        })
                      }
                      required
                    />
                    <i
                      className={
                        eyes.confirmPassword
                          ? 'fa fa-eye'
                          : 'fa fa-eye-slash'
                      }
                      onClick={() =>
                        setEyes({
                          ...eyes,
                          confirmPassword: !eyes.confirmPassword,
                        })
                      }
                    ></i>
                  </div>
                  {submitted &&
                    getError('confirmPassword').invalid ? (
                    <>
                      {/* {getError('confirmPassword').err.minLength ? <div>Min Length must be 8 characters long</div> : <></>} */}
                      {getError('confirmPassword').err
                        .confirmMatch ? (
                        <div className="invalid-feedback d-block">
                          Confirm Password is not matched with New
                          Password
                        </div>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex gap-2 justify-end mt-3">

                  <Link
                    onClick={() => {
                      SetEdit(false)
                      setChangePassword(false)
                    }}
                    className="bg-gray-200 px-4 py-2 text-black rounded-lg mt-4"
                  >
                    Back
                  </Link>

                  <button
                    type="submit"
                    className="bg-primary px-4 py-2 text-white rounded-lg mt-4"
                  >
                    Update
                  </button>
                </div>
              </form>

            </div> :
            <div className="p-6 shadow-box overflow-hidden rounded-lg bg-white  border sm:mt-3 md:mt-8 mt-8">
              <div className="d-flex justify-content-between align-items-center mb-3">

              </div>

              <form
                className="form-row"
                onSubmit={handleSubmit2}
              >
                <div className="row">
                  <div className="col-md-12">
                    <div className="profile_img_side">
                      <img
                        src={methodModel.userImg(
                          form && form.image
                        )}
                        className="profileImage"
                      />

                      <div>
                        <label className="new_images edit">
                          <input
                            id="bannerImage"
                            type="file"
                            className="d-none "
                            accept="image/*"
                            value={
                              form.baseImg ? form.baseImg : ''
                            }
                            onChange={(e) => {
                              uploadImage(e);
                            }}
                          />
                          <span className="uploader">
                            <i className="material-icons">
                              camera_alt
                            </i>
                          </span>
                        </label>
                      </div>
                      <div className="changes_image">
                        <div>
                          {form.image ? (
                            <label
                              className="deleticon  delete "
                              onClick={(e) =>
                                setForm({
                                  ...form,
                                  image: '',
                                })
                              }
                            ></label>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    {!nextForm && (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="label_profile">
                            Name
                            <span className="text-danger">
                              *
                            </span>
                          </label>

                          <div className="input-new-design">
                            <div className="input-icon">
                              <i className="fa fa-user"></i>
                            </div>
                            <input
                              type="text"
                              className="pl-2"
                              placeholder="Enter Name"
                              value={
                                form.fullName
                                  ? form.fullName
                                  : ''
                              }
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  fullName: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-6 mb-3">
                          <label className="label_profile">
                            Email
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <div>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-envelope"></i>
                              </div>
                              <input
                                type="email"
                                className="pl-2"
                                placeholder="Enter Name"
                                value={
                                  form.email ? form.email : ''
                                }
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mb-3">
                          <label className="label_profile">
                            Address
                            <span className="text-danger">
                              *
                            </span>
                          </label>
                          <div>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-address-book"></i>
                              </div>
                              <div className='w-100'>
                                <GooglePlacesAutocomplete
                                  value={form.address}
                                  result={addressResult}
                                  id="address"
                                  placeholder=""
                                />
                              </div>
                            </div>
                            {form.address == '' &&
                              submitted ? (
                              <div className="invalid-feedback d-block">
                                Please Select Location
                                Suggestion
                              </div>
                            ) : (
                              <></>
                            )}

                          </div>
                        </div>
                        {/* <div className="col-md-6 mb-3">
                                        <label className="label_profile">Identification Number</label>
                                        <div>
                                          <input
                                            type="text"
                                            className="pl-2"
                                            placeholder="Enter Carrier ID"
                                            value={form.identification_number}
                                            disabled
                                          />
                                        </div>
                                      </div> */}
                        <div className="col-md-6 mb-3">
                          <label className="label_profile">
                            Telephone{' '}

                          </label>
                          <div className="phoneInput_cls d-flex pl-2 p-0">
                            <PhoneInput
                              country={'us'}
                              value={form.telephoneExt}
                              countryCodeEditable={false}
                              enableSearch={true}
                              placeholder=""
                              onChange={(phone, country) => {
                                setForm({
                                  ...form,
                                  telephoneExt:
                                    country.dialCode,
                                });
                              }}
                              required
                            />

                            <input
                              type="text"
                              className="pl-2 phph"
                              placeholder="Telephone No."
                              value={
                                (form && form.telephoneNo) || (form && form.mobileNo) ||
                                ''
                              }
                              maxLength={12}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  telephoneNo:
                                    methodModel.isNumber(e),
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        {/* <div className="col-md-6 mb-3">
                                        <label className="label_profile">Role</label>
                                        <div>
                                          <input
                                            type="text"
                                            className="pl-2"
                                            placeholder="Enter Name"
                                            value={methodModel.capitalizeFirstLetter(
                                              form?.role
                                            )}
                                            disabled
                                          />
                                        </div>
                                      </div> */}

                        <div className="col-md-6 mb-3">
                          <label className="label_profile">
                            Fax
                          </label>


                          <div className="input-new-design">
                            <div className="input-icon">
                              <i class="fas fa-fax"></i>
                            </div>
                            <input
                              type="text"
                              pattern="^[a-zA-Z0-9]+$"
                              onKeyPress={(e) => {
                                var regex = new RegExp(
                                  '^[a-zA-Z0-9]+$'
                                );
                                var key = String.fromCharCode(
                                  !e.charCode
                                    ? e.which
                                    : e.charCode
                                );
                                if (!regex.test(key)) {
                                  e.preventDefault();
                                  return false;
                                }
                              }}
                              className="pl-2"
                              placeholder="Enter Fax"
                              value={form.fax_number}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  fax_number: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="label_profile">
                            Tax ID
                          </label>

                          <div className="input-new-design">
                            <div className="input-icon">
                              <i class="fas fa-portrait"></i>
                            </div>
                            <input
                              type="text"
                              pattern="^[a-zA-Z0-9]+$"
                              onKeyPress={(e) => {
                                var regex = new RegExp(
                                  '^[a-zA-Z0-9]+$'
                                );
                                var key = String.fromCharCode(
                                  !e.charCode
                                    ? e.which
                                    : e.charCode
                                );
                                if (!regex.test(key)) {
                                  e.preventDefault();
                                  return false;
                                }
                              }}
                              className="pl-2"
                              placeholder="Enter Tax ID"
                              value={
                                form.tax_number
                                  ? form.tax_number
                                  : ''
                              }
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  tax_number: e.target.value,
                                })
                              }
                            />
                          </div>
                        </div>

                        <div className="col-md-12 d-flex justify-content-end gap-2">
                          <a
                            onClick={() => SetEdit(false)}
                            className=" btn-save width-set"
                          >
                            Back
                          </a>
                          <a
                            onClick={() => SetNextForm(true)}
                            className=" btn dark-btn width-set"
                          >
                            Next
                          </a>
                        </div>
                      </div>
                    )}
                    {nextForm && (
                      <>
                        <div className="row ">
                          {/* <div className="col-md-6 mb-3">
                                        <label className="label_profile">Truck Number</label>
                                        <div>
                                          <input
                                            type="text"
                                            pattern="^[a-zA-Z0-9]+$"
                                            onKeyPress={(e) => {
                                              var regex = new RegExp("^[a-zA-Z0-9]+$");
                                              var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                                              if (!regex.test(key)) {
                                                e.preventDefault();
                                                return false;
                                              }
                                            }}
                                            className="pl-2"
                                            placeholder="Enter Number"
                                            value={form?.truck_number}
                                            onChange={(e) =>
                                              setForm({ ...form, truck_number: e.target.value })
                                            }
                                          />
                                        </div>
                                      </div> */}
                          <div className="col-md-6 mb-3">
                            <label className="label_profile">
                              Trailer Number
                            </label>
                            <div>
                              <input
                                type="text"
                                pattern="^[a-zA-Z0-9]+$"
                                onKeyPress={(e) => {
                                  var regex = new RegExp(
                                    '^[a-zA-Z0-9]+$'
                                  );
                                  var key =
                                    String.fromCharCode(
                                      !e.charCode
                                        ? e.which
                                        : e.charCode
                                    );
                                  if (!regex.test(key)) {
                                    e.preventDefault();
                                    return false;
                                  }
                                }}
                                className="pl-2"
                                placeholder="Enter Number"
                                value={form?.trailers_number}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    trailers_number:
                                      e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="label_profile">
                              Team Trucks
                            </label>
                            <div>
                              <input
                                min={0}
                                type="number"
                                className="pl-2"
                                placeholder="Enter Number"
                                value={form?.team_truck}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    team_truck:
                                      e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="label_profile">
                              Solo Truck
                            </label>
                            <div>
                              <input
                                min={0}
                                type="number"
                                className="pl-2"
                                placeholder="Enter Number"
                                value={form?.solo_truck}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    solo_truck:
                                      e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label ml-2">
                              Trailer Type
                              <span className="text-danger">
                                *
                              </span>
                            </label>
                            <div className="row">
                              <div className="col-md-6 ">
                                <div className="d-flex ">
                                  <input
                                    id="dry_van"
                                    type="checkbox"
                                    name="type"
                                    value="dry_van"
                                    checked={form?.trailer_type?.includes(
                                      'dry_van'
                                    )}
                                    onChange={(e) => {
                                      const isChecked =
                                        e.target.checked;
                                      let updatedTypes = [
                                        ...form?.trailer_type,
                                      ];
                                      if (isChecked) {
                                        updatedTypes.push(
                                          'dry_van'
                                        );
                                      } else {
                                        <div className="col-md-12 mb-3">
                                          <label className="form-label ml-2">
                                            Trailer Type
                                            <span className="text-danger">
                                              *
                                            </span>
                                          </label>
                                          <div className="row">
                                            <div className="col-md-6 ">
                                              <input
                                                id="dry_van"
                                                type="checkbox"
                                                name="type"
                                                value="dry_van"
                                                checked={form?.trailer_type?.includes(
                                                  'dry_van'
                                                )}
                                                onChange={(
                                                  e
                                                ) => {
                                                  const isChecked =
                                                    e.target
                                                      .checked;
                                                  let updatedTypes =
                                                    [
                                                      ...form?.trailer_type,
                                                    ];
                                                  if (
                                                    isChecked
                                                  ) {
                                                    updatedTypes.push(
                                                      'dry_van'
                                                    );
                                                  } else {
                                                    updatedTypes =
                                                      updatedTypes.filter(
                                                        (
                                                          type
                                                        ) =>
                                                          type !==
                                                          'dry_van'
                                                      );
                                                  }
                                                  setForm({
                                                    ...form,
                                                    trailer_type:
                                                      updatedTypes,
                                                  });
                                                }}
                                              />
                                              <label
                                                for="dry_van"
                                                className="ms-2"
                                              >
                                                Dry-Van
                                              </label>
                                            </div>
                                            <div className="col-md-6">
                                              <input
                                                id="dry_van"
                                                type="checkbox"
                                                name="type"
                                                value="reefer"
                                                checked={form?.trailer_type?.includes(
                                                  'reefer'
                                                )}
                                                onChange={(
                                                  e
                                                ) => {
                                                  const isChecked =
                                                    e.target
                                                      .checked;
                                                  let updatedTypes =
                                                    [
                                                      ...form?.trailer_type,
                                                    ];
                                                  if (
                                                    isChecked
                                                  ) {
                                                    updatedTypes.push(
                                                      'reefer'
                                                    );
                                                  } else {
                                                    updatedTypes =
                                                      updatedTypes.filter(
                                                        (
                                                          type
                                                        ) =>
                                                          type !==
                                                          'reefer'
                                                      );
                                                  }
                                                  setForm({
                                                    ...form,
                                                    trailer_type:
                                                      updatedTypes,
                                                  });
                                                }}
                                              />
                                              <label
                                                for="reefer"
                                                className="ms-2"
                                              >
                                                Reefer
                                              </label>
                                            </div>
                                          </div>
                                        </div>;
                                        updatedTypes =
                                          updatedTypes.filter(
                                            (type) =>
                                              type !==
                                              'dry_van'
                                          );
                                      }
                                      setForm({
                                        ...form,
                                        trailer_type:
                                          updatedTypes,
                                      });
                                    }}
                                  />
                                  <label
                                    for="dry_van"
                                    className="ms-2"
                                  >
                                    Dry Van
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="d-flex">
                                  <input
                                    id="reefer"
                                    type="checkbox"
                                    name="type"
                                    value="reefer"
                                    checked={form?.trailer_type?.includes(
                                      'reefer'
                                    )}
                                    onChange={(e) => {
                                      const isChecked =
                                        e.target.checked;
                                      let updatedTypes = [
                                        ...form?.trailer_type,
                                      ];
                                      if (isChecked) {
                                        updatedTypes.push(
                                          'reefer'
                                        );
                                      } else {
                                        updatedTypes =
                                          updatedTypes.filter(
                                            (type) =>
                                              type !==
                                              'reefer'
                                          );
                                      }
                                      setForm({
                                        ...form,
                                        trailer_type:
                                          updatedTypes,
                                      });
                                    }}
                                  />
                                  <label
                                    for="reefer"
                                    className="ms-2"
                                  >
                                    Reefer
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-12 d-flex justify-content-end gap-2">
                            <button
                              onClick={() => {
                                // SetEdit(false)
                                SetNextForm(false);
                              }}
                              className=" btn-save width-set"
                            >
                              Discard
                            </button>

                            <button
                              type="submit"
                              className="btn dark-btn width-set"
                            >
                              Update
                            </button>
                          </div>
                        </div>{' '}
                      </>
                    )}
                  </div>
                </div>
              </form>
            </div>}







      </div>
    </PageLayout>
  );
};

export default Profile;