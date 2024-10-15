import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { useParams } from "react-router-dom";
import PageLayout from "../../components/global/PageLayout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import { useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import GooglePlaceAutoComplete from "../../components/common/GooglePlaceAutoCompleteNew";
import addressModel from "../../models/address.model";
import ImageUpload from "../../components/common/ImageUpload";
import { useNavigate } from "react-router-dom";
import { FaTruck, FaUserAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import environment from "../../environment";
import { Autocomplete } from "@react-google-maps/api";
import moment from "moment";
import { RiWeightFill } from "react-icons/ri";

const AddEdit = () => {
  const { role, id } = useParams();

  const [form, setForm] = useState({stops:[]});
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  const [Vin, setVin] = useState("");
  const user = useSelector((state) => state.user);
  const [Stops, SetStops] = useState([{ address: "" }]);
  const [num, setnum] = useState(1);
  const [data, setdata] = useState([]);
  const AddTag = () => {
    Stops.push({
      address: "",
    });
    SetStops([...Stops]);
  };

  const removetag = (index) => {
    SetStops([...Stops.filter((itm, i) => i != index)]);
    setForm({
      ...form,
      stops: [...Stops.filter((itm, i) => i != index)],
    });

    setnum(num - 1);
  };

  const handleFieldChange = (index, event) => {
    const { value } = event?.target; // Extract value safely
    const newStopsData = Stops.map((stp, i) => {
      if (i === index) {
        return { ...stp, address: value };
      }
      return stp;
    });
    SetStops([...newStopsData]);
    setForm({ ...form, stops: newStopsData });
  };

  const updatetag = (index, key, value) => {
    console.log(value, "value");
    let arr = Stops;
    arr[index][key] = value;
    SetStops([...arr]);
    setForm({
      ...form,
      stops: [...arr],
      // no_of_reservation: arr.length,
    });
    setnum(arr.length);

    // if (num > data[0]?.sizeOfVenue) {
    //   toast.warn("You have Exceed the limit of booking");
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      !form.customer_name ||
      !form?.load_id ||
      !form?.load_start_date ||
      !form?.origin_address ||
      !form?.origin_location_city ||
      !form?.origin_location_state ||
      !form?.origin_location_postal_code ||
      !form?.load_end_date ||
      !form?.destination_address ||
      !form?.destination_location_city ||
      !form?.destination_location_state ||
      !form?.destination_location_postal_code ||
      !form?.est_volume ||
      !form?.capacity ||
      !form?.frequency ||
      !form?.dispatch_days ||
      !form?.all_in_rate ||
      !form?.lane_duration ||
      !form?.total_weight
    ) {
      return;
    }

    const LoadID = Math.floor(Math.random() * 1000000000);
    let method = "post";
    let url = shared?.addApi;
    let value = {};

    value = {
      customer_name: form?.customer_name,
      notes: form?.notes,
      total_weight: form?.total_weight,
      load_start_date:
        moment(form?.load_start_date).format("YYYY-MM-DDTHH:mm") + ":00.000Z",
      load_end_date:
        moment(form?.load_end_date).format("YYYY-MM-DDTHH:mm") + ":00.000Z",
      // load_start_date:moment(form?.load_start_date).format("YYYY-MM-DDTHH:mm")+":00.000Z",
      // load_end_date: form?.load_end_date,

      origin_location_street: form?.origin_location_street,
      origin_location_city: form?.origin_location_city,
      origin_location_state: form?.origin_location_state,
      origin_location_country: form?.origin_location_country,
      origin_location_postal_code: form?.origin_location_postal_code,

      destination_location_city: form?.destination_location_city,
      destination_location_state: form?.destination_location_state,
      destination_location_country: form?.destination_location_country,
      destination_location_postal_code: form?.destination_location_postal_code,
      destination_location_street: form?.destination_location_street,
      // load_id: parseInt(form?.load_id),

      est_volume: form?.est_volume,
      capacity: form?.capacity,
      dispatch_days: form?.dispatch_days,
      load_id: Number(form?.load_id),
      lane_duration: form?.lane_duration,
      all_in_rate: form?.all_in_rate,
      frequency: form?.frequency,
      origin_address: form?.origin_address,
      destination_address: form?.destination_address,
      stops: form?.stops,
      chat_user:true,
      // shipment_status:"pending"
    };

    if (id) {
      // value.fullName=value.firstName+" "+value.lastName
      method = "put";
      url = shared?.editApi;
      value = {
        customer_name: form?.customer_name,
        total_weight: form?.total_weight,
        comments: form.comments || "",
        notes: form.notes || "",
        // total_distance: form?.total_distance,
        load_start_date: form?.load_start_date,
        load_end_date: form?.load_end_date,
        // total_volume: form?.total_volume,
        // total_pallets: form?.total_pallets,
        // total_pieces: form?.total_pieces,
        // auction_type: form?.auction_type,
        origin_location_street: form?.origin_location_street,
        origin_location_city: form?.origin_location_city,
        origin_location_state: form?.origin_location_state,
        origin_location_country: form?.origin_location_country,
        origin_location_postal_code: form?.origin_location_postal_code,
        id: form?.id,
        customer_id: form?.customer_id,
        division_code: form?.division_code,
        tm_equipment_type: form?.tm_equipment_type,
        // customer_id: form?.customer_id,
        // division_code: "TESTINGID",
        destination_location_city: form?.destination_location_city,
        destination_location_state: form?.destination_location_state,
        destination_location_country: form?.destination_location_country,
        destination_location_postal_code:
          form?.destination_location_postal_code,
        destination_location_street: form?.destination_location_street,
        load_id: Number(form?.load_id),
        // max_rate: Number(form?.max_rate),
        // min_rate: Number(form?.min_rate),
        est_volume: form?.est_volume,
        capacity: form?.capacity,
        dispatch_days: form?.dispatch_days,
        lane_duration: form?.lane_duration,
        all_in_rate: form?.all_in_rate,
        origin_address: form?.origin_address,
        destination_address: form?.destination_address,
        stops: form?.stops,
        //  request_status:"awarded",
        // shipment_status:"pending"
      };
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);

        history("/loads");
      }
      loader(false);
    });
  };

  const DestinationAddress = async (e) => {
    let address = {};
    if (e) {
      address = await addressModel.getAddress2(e);
    }
    setForm({
      ...form,
      destination_address: e.formatted_address || "",
      destination_location_city: address.city || "",
      destination_location_state: address.state || "",
      destination_location_country: address.country || "",
      destination_location_postal_code: address.zipcode || "",
      // lat: `${address.lat}` || '',
      // lng: `${address.lng}` || ''
    });
  };

  const addressResult = async (e) => {
    let address = {};
    if (e) {
      address = await addressModel.getAddress(e);
    }

    setForm({
      ...form,
      origin_address: e.formatted_address,
      origin_location_country: address.country || "",
      origin_location_city: address.city || "",
      origin_location_state: address.state || "",
      origin_location_postal_code: address.zipcode || "",
      origin_lat: `${address.lat}` || "",
      origin_lng: `${address.lng}` || "",
    });
  };

  const back = () => {
    history.push("/drivers");
  };

  const GetLoadDetails = () => {
    ApiClient.get("load", { id }).then((res) => {
      if (res.success) {
        setForm(res?.data);
        let stops = res?.data?.stops || [];
        if (!stops.length) stops = [{ address: "" }];
        SetStops(stops);
      }
    });
  };
  useEffect(() => {
    setSubmitted(false);

    if (id) {
      GetLoadDetails();
    }
  }, [id]);

  const [licence, setLicence] = useState([]);
  const [licenceLoader, setLicenceLoader] = useState(false);
  const getLicence = (p) => {
    setLicenceLoader(true);
    ApiClient.get("driver-by-license", { licence_number: p }).then((res) => {
      setLicenceLoader(false);
      if (res.success) {
        setLicence(res.data);
      }
    });
  };

  useEffect(() => {
    if (form.licence_number) {
      getLicence(form.licence_number);
    }
  }, [form.licence_number]);

  
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
              Here you can see all about your Loads
            </p>
          </div>
        </div>
        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <FaUserAlt className="text-[#494f9f]" />
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">
              Basic Information
            </h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Customer Name"
                pattern="^[a-zA-Z]+$"
                onKeyPress={(e) => {
                  var regex = new RegExp("^[a-zA-Z]+$");
                  var key = String.fromCharCode(
                    !e.charCode ? e.which : e.charCode
                  );
                  if (!regex.test(key)) {
                    e.preventDefault();
                    return false;
                  }
                }}
                maxLength={10}
                value={form.customer_name}
                onChange={(e) => setForm({ ...form, customer_name: e })}
                required
              />
              {submitted && !form.customer_name && (
                <div className="invalid-feedback d-block star text-[12px]">
                  Customer Name is Required
                </div>
              )}
            </div>

            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                {" "}
                Load ID <span className="text-danger star">*</span>
              </label>

              <div className="">
                <input
                  type="text"
                  pattern="^[0-9]+$"
                  onKeyPress={(e) => {
                    var regex = new RegExp("^[0-9]+$");
                    var key = String.fromCharCode(
                      !e.charCode ? e.which : e.charCode
                    );
                    if (!regex.test(key)) {
                      e.preventDefault();
                      return false;
                    }
                  }}
                  className=" bg-white w-full rounded-lg h-10 flex items-center gap-2  border border-[#00000036] px-3"
                  // required
                  value={form.load_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      load_id: e.target.value,
                    })
                  }
                />
              </div>

              {submitted && !form.load_id ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Load Id is Required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Load Start Date<span className="star">*</span>
              </label>
              <div className="set-input-width">
                <DatePicker
                  selected={form?.load_start_date}
                  className="bg-white w-full rounded-lg h-10 flex items-center gap-2  border border-[#00000036] px-3 w-100"
                  minDate={Date.now()}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onChange={(e) => {
                    setForm({ ...form, load_start_date: e });
                  }}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy h:mm a"
                />
                {!form.load_start_date && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Load Start Date is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Load End Date<span className="star">*</span>
              </label>
              <div className="set-input-width">
                <DatePicker
                  selected={form?.load_end_date}
                  className="bg-white w-full rounded-lg h-10 flex items-center gap-2  border border-[#00000036] px-3 w-100"
                  minDate={Date.now()}
                  onKeyDown={(e) => {
                    e.preventDefault();
                  }}
                  onChange={(e) => {
                    setForm({ ...form, load_end_date: e });
                  }}
                  showTimeSelect
                  dateFormat="dd-MM-yyyy h:mm a"
                />
                {!form.load_end_date && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Load End Date is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border  rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <FaLocationDot className="text-[#494f9f]" />
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">Address</h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Origin Location<span className="star">*</span>
              </label>
              <div>
                <GooglePlaceAutoComplete
                  value={form.origin_address}
                  result={addressResult}
                  id="address"
                  placeholder=""
                />
                {!form.origin_address && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Origin Location is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Origin City"
                value={form.origin_location_city}
                onChange={(e) => setForm({ ...form, origin_location_city: e })}
                required
              />
              {!form.origin_location_city && submitted ? (
                <div className="invalid-feedback d-block star">
                  Origin City is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Origin State"
                value={form.origin_location_state}
                onChange={(e) => setForm({ ...form, origin_location_state: e })}
                required
              />
              {!form.origin_location_state && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Origin State is required
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Origin ZipCode"
                value={form.origin_location_postal_code}
                onChange={(e) =>
                  setForm({ ...form, origin_location_postal_code: e })
                }
                required
              />
              {!form.origin_location_postal_code && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Origin Zipcode is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Destination Location<span className="star">*</span>
              </label>
              <div>
                <GooglePlaceAutoComplete
                  value={form?.destination_address}
                  result={DestinationAddress}
                  id="address"
                  placeholder=""
                />
                {!form.destination_address && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Destination Location is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Destination City"
                value={form.destination_location_city}
                onChange={(e) =>
                  setForm({ ...form, destination_location_city: e })
                }
                required
              />
              {!form.destination_location_city && submitted ? (
                <div className="invalid-feedback d-block star">
                  Destination City is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Destination State"
                value={form.destination_location_state}
                onChange={(e) =>
                  setForm({ ...form, destination_location_state: e })
                }
                required
              />
              {!form.destination_location_state && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Destination State is required
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="mb-3 lg:col-span-6 col-span-12">
              <FormControl
                type="text"
                label="Destination ZipCode"
                value={form.destination_location_postal_code}
                onChange={(e) =>
                  setForm({ ...form, destination_location_postal_code: e })
                }
                required
              />
              {!form.destination_location_postal_code && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Destination Zipcode is required
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <div className="border  rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed justify-between">
            <div className="flex items-center">
              <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
                <FaUserAlt className="text-[#494f9f]" />
              </div>
              <h3 className="text-[16px] font-[500] text-[#494f9f]">
                Stops details
              </h3>
            </div>
            <button
              type="button"
              className="  bg-primary leading-10  h-10 flex items-center shadow-btn px-6 hover:opacity-80 text-sm text-white rounded-lg "
              onClick={AddTag}
            >
              <i class="fa fa-plus mr-2" aria-hidden="true"></i>Add Stop
            </button>
          </div>

          <div className="">
            <div className="grid grid-cols-12 gap-4 p-4">
              {Stops.map((itm, i) => {
                return (
                  <div
                    className={`${
                      Stops?.length > 1 ? " lg:col-span-6" : " col-span-12"
                    }  mb-3`}
                    onChange={(e) => {
                      if (num > data[0]?.sizeOfVenue) {
                        removetag(i);
                      }
                    }}
                  >
                    <div className="">
                      <div className=" flex items-center w-full ">
                        <div className="w-full">
                        <GooglePlaceAutoComplete
                          key={`Stop${i}`}
                          value={itm?.address}
                          name={"origin"}
                          result={async (e) => {
                            let address = {};
                            if (e) {
                              address = await addressModel.getAddress(e);
                            }
                            updatetag(i, "address", e.formatted_address);
                          }}
                          id={`StopsAddress${i}`}
                          required
                          placeholder=""
                        />
                            </div>

                        {Stops?.length > 1 ? (
                          <div className="ml-2 text-white border bg-[#eeeff6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            <i
                              className="fa fa-trash text-sm text-[#c02e2e]"
                              onClick={(e) => removetag(i)}
                            ></i>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          
          </div>
        </div>
        {submitted && form?.stops?.length == 0 ? (
              <div className="invalid-feedback d-block star text-[12px]">
                Stop Address is Required
              </div>
            ) : (
              <></>
            )}

        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className=" p-3 border-b flex items-center border-[#474e9c3b] border-dashed">
            <div className="bg-[#eeeff6] p-3 me-3 rounded-md">
              <RiWeightFill className="text-[#494f9f]"/>
            </div>
            <h3 className="text-[16px] font-[500] text-[#494f9f]">
              Load Detail
            </h3>
          </div>

          <div className="grid grid-cols-12 gap-4 p-4">
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Average Weight of the load<span className="star">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name=""
                  // min={0}
                  // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                  className="form-control"
                  value={form?.total_weight}
                  // required
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^\d*\.?\d{0,2}$/;
                    if (regex.test(inputValue) || inputValue === "") {
                      setForm({
                        ...form,
                        total_weight: inputValue,
                      });
                    }
                  }}
                />
                {!form.total_weight && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Weight is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Capacity<span className="star">*</span>
              </label>
              <div>
                <input
                  type="text"
                  // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                  // min={0}
                  name=""
                  className="form-control"
                  id=""
                  value={form?.capacity}
                  // required
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    const regex = /^\d*\.?\d{0,2}$/;
                    if (regex.test(inputValue) || inputValue === "") {
                      setForm({
                        ...form,
                        capacity: inputValue,
                      });
                    }
                  }}
                />
                {!form.capacity && submitted ? (
                  <div className="invalid-feedback d-block star text-[12px]">
                    Capacity is Required
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                EST Volume Based on Frequency<span className="star">*</span>
              </label>
              <input
                type="text"
                // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                // min={0}
                name=""
                className="form-control"
                id=""
                value={form?.est_volume}
                // required
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(inputValue) || inputValue === "") {
                    setForm({
                      ...form,
                      est_volume: inputValue,
                    });
                  }
                }}
              />
                 {submitted && !form?.est_volume ? (
              <div className="invalid-feedback d-block star text-[12px]">
               EST Volume is Required
              </div>
            ) : (
              <></>
            )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Frequency<span className="star">*</span>
              </label>
              <input
                type="text"
                // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                // min={0}
                name=""
                className="form-control"
                id=""
                value={form?.frequency}
                // required
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(inputValue) || inputValue === "") {
                    setForm({
                      ...form,
                      frequency: inputValue,
                    });
                  }
                }}
              />

              {!form.frequency && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Frequency is required
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Dispatch Days<span className="star">*</span>
              </label>
              <input
                type="text"
                // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                // min={0}
                name=""
                className="form-control"
                id=""
                value={form?.dispatch_days}
                // required
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const regex = /^\d*\.?\d{0,2}$/;
                  if (regex.test(inputValue) || inputValue === "") {
                    setForm({
                      ...form,
                      dispatch_days: inputValue,
                    });
                  }
                }}
              />

              {!form.dispatch_days && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Dispatch Days is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                All in Rate<span className="star">*</span>
              </label>
              <input
                type="text"
                // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                // min={0}
                name=""
                className="form-control"
                id=""
                value={form?.all_in_rate}
                // required
                onChange={(e) => {
                  setForm({
                    ...form,
                    all_in_rate: methodModel.isNumber(e),
                  });
                }}
                maxLength={10}
              />

              {!form.all_in_rate && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  All in Rate is required
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="mb-3 lg:col-span-6 col-span-12">
              <label className="text-sm mb-2 block">
                Duration of the lane<span className="star">*</span>
              </label>
              <input
                type="text"
                // pattern="^[0-9]+(\.[0-9]{0,2})?$"
                // min={0}
                name=""
                className="form-control"
                id=""
                value={form?.lane_duration}
                // required
                onChange={(e) => {
                  setForm({
                    ...form,
                    lane_duration: methodModel.isNumber(e),
                  });
                }}
                maxLength={10}
              />

              {!form.lane_duration && submitted ? (
                <div className="invalid-feedback d-block star text-[12px]">
                  Lane Duration is required
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="mb-3 lg:col-span-12 col-span-12">
              <FormControl
                type="textarea"
                label="Comment"
                rows={5}
                cols={5}
                value={form?.comments}
                onChange={(e) => {
                  setForm({ ...form, comments:e});
                }}
              />
            </div>
            <div className="mb-3 lg:col-span-12 col-span-12">
              <FormControl
                type="textarea"
                label="Note"
                rows={5}
                cols={5}
                value={form?.notes}
                onChange={(e) => {
                  setForm({ ...form, notes: e });
                }}
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
