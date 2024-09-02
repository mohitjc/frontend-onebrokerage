import React, { useEffect, useState } from 'react';
import Layout from '../../../components/global/layout';
import { Link } from "react-router-dom";
import { Tooltip } from "antd";


const Html = ({
  role,
  form,
  handleSubmit,
  setform,
  addressResult,
  submitted,
  back,
  detail,
}) => {
//   const user = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [data, setdata] = useState([]);

  let [Truck, setTrucks] = useState([{ truck_number: '', vin_number: '' }]);
  const [num, setnum] = useState(1);
  const AddTag = () => {
    
    Truck.push({
      truck_number: '',
      vin_number: '',
    });
    setTrucks([...Truck]);
  };

  const removetag = (index) => {
    setTrucks([...Truck.filter((itm, i) => i != index)]);
    setform({  ...form,
      truck_data: [...Truck.filter((itm, i) => i != index)]})
     setnum(num - 1);
  };

  const updatetag = (index, key, value) => {
    let arr = Truck;
    arr[index][key] = value;
    setTrucks([...arr]);
   setform({ ...form,
   truck_data: [...arr]})
  setnum(arr.length);
  };


  return (
    <>
      <Layout title2={` Trucks`}>
        <div className="mainareas">
          <form onSubmit={handleSubmit}>
            <div className="pprofile1 add-truck-sect  new-edit">
              <div className="row">
                <div className="col-lg-12 mx-auto">
                  <div className=" title-head px-0 mx-0">
                    <div className="heddings d-flex justify-content-between align-items-center">
                      <h4 className="viewUsers mb-0 user-back ">
                        {' '}
                        <Link to="/trucks" className="">
                          <i
                            className="fa fa-arrow-left text-black me-2"
                            title="Back"
                            aria-hidden="true"
                          ></i>
                        </Link>
                        {form && form.id ? 'Edit' : 'Add'} Truck
                      </h4>
                    </div>
                    <div className="">
                      <button
                        type="button"
                        className="btn btn-primary light_white "
                        onClick={AddTag}
                      >
                        <i class="fa fa-plus me-2" aria-hidden="true"></i>Add
                        Truck
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* <div className="col-lg-12 mx-auto">
                  <div class=" white-head mb-3">
                    <h5 class="profilelist">Basic Information</h5>
                  </div>
                </div> */}
              
                    {Truck.map((itm, i) => {
                      return (
                        <div className={`${Truck.length==1?"col-lg-12":"col-lg-6"} `}>
                        <div class=" white-bg-main mb-4">
                        <div
                          className="row"
                          onChange={(e) => {
                            if (num > data[0]?.sizeOfVenue) {
                              removetag(i);
                            }
                          }}
                        >
                          <div className="col-md-6 mb-3">
                            <label>
                              Truck Number
                              <span className="text-danger">*</span>
                            </label>
                            <div className="input-new-design">
                          
                              <input
                                type="text"
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
                                className="form-control"
                                value={itm?.truck_number}
                                required
                                onChange={(e) =>
                                  updatetag(i, 'truck_number', e.target.value)
                                }
                              />
                            </div>
                            {submitted && !itm.truck_number ? (
                              <div className="invalid-feedback d-block">
                                Truck Number is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="col-md-6 mb-3">
                            <div className="d-flex w-100 justify-content-end align-items-end">
                              <div className="w-100">
                                <label>VIN Number</label>
                                <span className="text-danger">*</span>
                                <div className="input-new-design">
                          
                                  <input
                                    type="text"
                                    className="form-control"
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
                                    required
                                    value={itm?.vin_number}
                                    onChange={(e) =>
                                      updatetag(i, 'vin_number', e.target.value)
                                    }
                                  />
                                </div>
                              </div>

                              <div
                                className="d-flex justify-content-end h-100 align-items-end   ms-2  delete-btn-red
                          "
                              >
                                {Truck?.length > 1 && (
                                  <i
                                    className="fa fa-trash text-danger pointer"
                                    onClick={(e) => {
                                      removetag(i);
                                    }}
                                  ></i>
                                )}
                              </div>
                            </div>
                            {submitted && !itm.vin_number ? (
                              <div className="invalid-feedback d-block">
                                VIN Number is Required
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                        </div>
                </div>
                      );
                    })}
                  
              </div>

            </div>
            <div className="text-right  mt-2 d-flex justify-content-end">
              <button type="submit" className="btn btn-primary text-end d-block btn-end-save">
                Save
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default Html;
