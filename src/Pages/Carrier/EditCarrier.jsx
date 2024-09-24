import React, { useState, useEffect } from 'react';
import ApiClient from '../../methods/api/apiClient';
import loader from '../../methods/loader';
import { useSelector } from 'react-redux';
import methodModel from '../../methods/methods';
import { roleType } from '../../models/type.model';
import { Link, useNavigate, useParams } from 'react-router-dom';
import PageLayout from '../../components/global/PageLayout';
import { toast } from 'react-toastify';
import GooglePlacesAutocomplete from '../../components/common/GooglePlaceAutoComplete';
import PhoneInput from 'react-phone-input-2';
import addressModel from '../../models/address.model';
import { IoIosCamera } from 'react-icons/io';
import ImageUpload from '../../components/common/ImageUpload';
const EditCarrier = () => {
  const { id, CarrierID } = useParams();

  const [form, setform] = useState(roleType);
  const history = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const Name=searchParams.get("Name")
  const [submitted, setSubmitted] = useState(false);
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState({ image: '' });
  const [emailErr, setEmailErr] = useState('');
  const [Boards, setBoards] = useState([]);
  const [emailLoader, setEmailLoader] = useState(false);


   const emailvalidation=()=>
    { 
      if(form?.email)
      {
       let splitEmail=form?.email?.split("@")[1]
       if(splitEmail && (splitEmail.includes("yahoo.com")||splitEmail.includes("gmail.com")||splitEmail.includes("outlook.com")||splitEmail.includes("hotmail.com")))
        {
          return false
        }
        else
        {
          return true
        }
      }
      
    }

  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmitted(true);
    if (

      !emailvalidation()||
      !form?.firstName ||
      !form?.email ||
      !form?.address ||
      !form?.city ||
      !form?.country ||
      !form?.position ||
      // !form?.mobileNo ||
      !form?.pincode
    ) {
      return false;
    }
    loader(true);

    let url = 'admin/add-user';
    let method = 'post';
    let dvalue = {
      firstName: form?.firstName,
      lastName: form?.lastName,
      image: form?.image,
      address: form?.address,
      city: form?.city,
      country: form?.country,
      state: form?.state,
      pincode: form?.pincode,
      carrier_id: user?.id,
      mobileNo: form?.mobileNo,
      telephoneNo:form?.telephoneNo,
      telephoneExt:form?.telephoneExt,
      email: form?.email,
      dialCode: form?.dialCode,
      board_id: user.board_id,
      trailer_type: user.trailer_type,
      mc_description: user.mc_description,
      tax_number: user.tax_number,
      dot_description: user.dot_description,
    };
    let value = {
      ...dvalue,
      role: 'user',
      position: form?.position,
    };
    if (id) {
      method = 'put';
      url = 'admin/edit-user';
      value = {
        id: id,
        ...dvalue,
      };
    }


    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history(-1);
      }
      loader(false);
    });
  };

//   const emailCheck = (email) => {
//     let isValid = methodModel.emailvalidation(email);
//     if (isValid) {
//       setEmailLoader(true);
//       ApiClient.get('check/Email', { email: email }).then((res) => {
//         if (!res.success) {
//           if (detail?.email != email) {
//             setEmailErr(res.error.message);
//           }
//         } else {
//           setEmailErr('');
//         }
//         setEmailLoader(false);
//       });
//     }
//   };

  const GetUser = () => {
    setform({});
    loader(true);
    ApiClient.get('user/detail', { id: id }).then((res) => {
      if (res.success) {
        setform(res?.data);
      }
      loader(false);
    });
  };
  useEffect(() => {
    if (id) {
      GetUser();
    }
  }, [id]);

  useEffect(() => {
    setform({ ...form, permissions: roleType.permissions });
  }, [id]);

  const addressResult = async (e) => {
    let address = {};
    if (e.place) {
      address = await addressModel.getAddress(e.place);
    }

    setform({
      ...form,
      address: e.value,
      country: address.country || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.zipcode || '',
      // lat: `${address.lat}` || '',
      // lng: `${address.lng}` || ''
    });
  };

  const uploadImage = (e) => {
    setform({ ...form, baseImg: e.target.value });
    let files = e.target.files;
    let file = files.item(0);
    loader(true);
    ApiClient.postFormData('upload/image?modelName=users', { file: file }).then(
      (res) => {
        if (res.success) {
          let image = res?.data?.fullpath;
          setform({ ...form, image: image, baseImg: '' });
        } else {
          setform({ ...form, baseImg: '' });
        }
        loader(false);
      }
    );
  };

  const imageResult = (e, key) => {

    images[key] = e.value;
    setImages(images);
    setform({ ...form, image: images?.image });

  };

  const Carrier = () => {
    ApiClient.get('user/detail', { id: CarrierID }).then((res) => {
      if (res.success) {
        setform({ ...form, carrierName: res?.data?.fullName });
      }
    });
  };
  useEffect(() => {
   
    if (CarrierID) {
      Carrier();
    }
  }, []);
  return (
    <>
      <PageLayout>
        <div className=" bg-white shadow-md rounded-lg p-4 border border-gray-100">
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-12 gap-6'>
                <div className='col-span-12 '>
                    <div className='images_datas flex items-center justify-center'>
                    <div className="imagethumbWrapper">
                        <img
                          src={
                            // form?.image
                            //   ? `http://74.208.206.18:4020/images/users/${form?.image}`
                            //   : '/assets/img/person.jpg'
                            methodModel.userImg(form?.image)
                          }
                          className="h-32 w-32 rounded-full object-contain"
                        />
                        <div className="mt-4">
                          {form?.image ? (
                            <>
                              <label
                                className={`btn  `}
                                onClick={() => {
                                  setform({ ...form, image: '' });
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </label>{' '}
                            </>
                          ) : (
                            <label className={`bg-primary cursor-pointer hover:shadow-md text-white px-2 rounded-lg gap-2 py-2 flex items-center justify-center   `}>
                              <input
                                type="file"
                                className="d-none"
                                accept="image/*"
                                onChange={(e) => {
                                  uploadImage(e);
                                }}
                              />
                              <IoIosCamera />
                              Upload image
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                </div>

                <div className='col-span-12 '>
                    <div className='ineers_dats'>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="border border-gray-200">
                      <div className=" bg-gray-100 rounded-b-lg p-4 ">
                        <h5 className="profilelist">Basic Information</h5>
                      </div>
                      <div className="p-4">
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label>
                              First Name
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fa fa-user"></i>
                              </div>
                              <input
                                type="text"
                                className="pl-2"
                                value={form.firstName}
                                onChange={(e) =>
                                  setform({
                                    ...form,
                                    firstName: e.target.value,
                                  })
                                }
                                // required
                              />
                            </div>
                            {submitted && !form.firstName ? (
                              <div className="invalid-feedback d-block">
                                First Name is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <label>Last Name</label>

                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fa fa-user"></i>
                              </div>
                              <input
                                type="text"
                                className="pl-2"
                                value={form.lastName}
                                onChange={(e) =>
                                  setform({
                                    ...form,
                                    lastName: e.target.value,
                                  })
                                }
                                // required
                              />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="row">
                              <div className="col-md-12 mb-3">
                                <label> Position</label>

                                <div className="input-new-design">
                                  <div className="input-icon">
                                    <i className="fas fa-hand-point-down"></i>
                                  </div>
                                  <select
                                    name=""
                                    className="pl-2 w-full bg-white"
                                    id=""
                                    value={form?.position}
                                    onChange={(e) => {
                                      setform({
                                        ...form,
                                        position: e.target.value,
                                      });
                                    }}
                                  >
                                    <option value="">Select Position</option>
                                    <option value="owner">Owner</option>
                                    <option value="manager">Manager</option>
                                    <option value="accounting_manager">
                                      Account Manager
                                    </option>
                                    <option value="dispatcher">
                                      Dispatcher
                                    </option>
                                  </select>
                                </div>

                                {submitted && !form.position ? (
                                  <div className="invalid-feedback d-block">
                                    Position is Required
                                  </div>
                                ) : (
                                  <></>
                                )}
                              </div>
                              {form?.isInvited?  <div className="col-md-12 mb-3">
                                <label className="">Telephone No</label>
                                
                                <div className="bg-white border border-gray-200 h-[45px] rounded-lg flex p-0">
                                

                                <PhoneInput
                                        country={'us'}
                                        value={form?.telephoneExt}
                                        countryCodeEditable={false}
                                        enableSearch={true}
                                        className="namephones"
                                        placeholder=""
                                        onChange={(phone, country) => {
                                          setform({
                                            ...form,
                                            telephoneExt: country.telephoneExt,
                                          });
                                        }}
                                      />
  
                                      <input
                                        type="text"
                                        className="bg-white text-black  phph"
                                        placeholder="Mobile No."
                                        value={(form && form.telephoneNo) || ''}
                                        maxLength={12}
                                        onChange={(e) =>
                                          setform({
                                            ...form,
                                            telephoneNo: methodModel.isNumber(e),
                                          })
                                        }
                                      />
                                </div>

                                
                              
                              </div>: 
                             
                              <div className="bg-white h-[45px] rounded-lg flex p-0">
                                

                              <PhoneInput
                                      country={'us'}
                                      value={form?.dialCode}
                                      countryCodeEditable={false}
                                      enableSearch={true}
                                      className="namephones"
                                      placeholder=""
                                      onChange={(phone, country) => {
                                        setform({
                                          ...form,
                                          dialCode: country.dialCode,
                                        });
                                      }}
                                    />

                                    <input
                                      type="text"
                                      className="bg-white text-black phph"
                                      placeholder="Mobile No."
                                      value={(form && form.mobileNo) || ''}
                                      maxLength={12}
                                      onChange={(e) =>
                                        setform({
                                          ...form,
                                          mobileNo: methodModel.isNumber(e),
                                        })
                                      }
                                    />
                              </div>
                              }
                             

                              <div className="col-md-12 mb-3">
                                <label>
                                  Email <span className="text-danger">*</span>
                                </label>
                                <div className="input-new-design">
                                  <div className="input-icon">
                                    <i className="fas fa-envelope"></i>
                                  </div>
                                  <input
                                    type="email"
                                    className="pl-2"
                                    value={form.email}
                                    disabled={id}
                                    onChange={(e) => {
                                      setform({
                                        ...form,
                                        email: e.target.value,
                                      });
                                      // emailCheck(e.target.value);
                                    }}
                                    // required
                                  />
                                </div>

                                {submitted ?  (
                                <>{!form.email ?<div className="invalid-feedback d-block">
                                  Email is Required
                                </div>:!emailvalidation()?<div className="invalid-feedback d-block">
                                This email domain not allowed. Please use a different email address.
                                </div>:<></>}</>                             
                              ) : (
                                <></>
                              )} 

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="border border-gray-200">
                      <div className=" bg-gray-100 rounded-b-lg p-4 ">
                        <h5 className="profilelist">Address</h5>
                      </div>
                      <div className="p-4">
                        <div className="">
                          <div className="col-md-12 mb-3">
                            <label>
                              Address<span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-address-book"></i>
                              </div>
                              <div className='w-full flex items-center pl-2'>
                              <GooglePlacesAutocomplete
                                value={form.address}
                                result={addressResult}
                                id="address"
                                placeholder=""
                                className='  w-full  relative   text-sm placeholder:text-gray-500 h-full flex items-center gap-2 overflow-hidden px-2 hover:ring-orange-500 focus:border-orange-500'
                              />
                              </div>
                            </div>

                            {submitted && !form.address ? (
                              <div className="invalid-feedback d-block">
                                Address is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label>
                              City<span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-building"></i>
                              </div>
                              <input
                                type="text"
                                className="pl-2"
                                value={form.city}
                                onChange={(e) =>
                                  setform({ ...form, city: e.target.value })
                                }
                                // required
                              />
                            </div>

                            {submitted && !form.city ? (
                              <div className="invalid-feedback d-block">
                                City is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label>
                              State<span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-building"></i>
                              </div>
                              <input
                                type="text"
                                className="pl-2"
                                value={form.state}
                                onChange={(e) =>
                                  setform({ ...form, state: e.target.value })
                                }
                                // required
                              />
                            </div>

                            {submitted && !form.state ? (
                              <div className="invalid-feedback d-block">
                                State is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="col-md-6 mb-3">
                            <label>
                              Country<span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-globe-asia"></i>
                              </div>
                              <input
                                type="text"
                                className="pl-2"
                                value={form.country}
                                onChange={(e) =>
                                  setform({ ...form, country: e.target.value })
                                }
                                // required
                              />
                            </div>

                            {submitted && !form.country ? (
                              <div className="invalid-feedback d-block">
                                Country is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>

                          <div className="col-md-6 mb-3">
                            <label>
                              Zipcode<span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                              <div className="input-icon">
                                <i className="fas fa-map-pin"></i>
                              </div>
                              <input
                                type="numeric"
                                pattern="^[a-zA-Z0-9]+$"
                                onKeyPress={(e) => {
                                  var regex = new RegExp('^[a-zA-Z0-9]+$');
                                  var key = String.fromCharCode(
                                    !e.charCode ? e.which : e.charCode
                                  );
                                  if (!regex.test(key)) {
                                    e.preventDefault();
                                    return false;
                                  }
                                }}
                                className="pl-2"
                                value={form.pincode}
                                onChange={(e) =>
                                  setform({ ...form, pincode: e.target.value })
                                }
                                // required
                              />
                            </div>

                            {submitted && !form.pincode ? (
                              <div className="invalid-feedback d-block">
                                Zipcode is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                </div>
            </div>

           
            <div className="text-right mt-4">
                {
                  <button
                    type="submit"
                    className="btn btn-primary text-end d-block btn-end-save"
                    onClick={() => {
                      setSubmitted(true);
                    }}
                  >
                    Save
                  </button>
                }
              </div>
          </form>
        </div>
      </PageLayout>
    </>
  );
};

export default EditCarrier;
