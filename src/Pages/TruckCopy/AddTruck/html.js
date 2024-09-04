import React, { useEffect, useState } from "react";
import Layout from "../../../components/global/layout";
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
  console.log(setform, "setform");
  //   const user = useSelector((state) => state.user);
  const [boards, setBoards] = useState([]);
  const [data, setdata] = useState([]);

  let [Truck, setTrucks] = useState([{ truck_number: "", vin_number: "" }]);
  const [num, setnum] = useState(1);
  const AddTag = () => {
    Truck.push({
      truck_number: "",
      vin_number: "",
    });
    setTrucks([...Truck]);
  };

  const removetag = (index) => {
    setTrucks([...Truck.filter((itm, i) => i != index)]);
    setform({ ...form, truck_data: [...Truck.filter((itm, i) => i != index)] });
    setnum(num - 1);
  };

  const updatetag = (index, key, value) => {
    let arr = Truck;
    arr[index][key] = value;
    setTrucks([...arr]);
    setform({ ...form, truck_data: [...arr] });
    setnum(arr.length);
  };

  return (
    <>
      <Layout title2={` Trucks`}>
        <div className="flex items-center mb-8">
          <Tooltip placement="top" title="Back">
            <Link
              to="/trucks"
              className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
            >
              <i className="fa fa-angle-left text-lg"></i>
            </Link>
          </Tooltip>
          <div>
            <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
              {form && form.id ? "Edit" : "Add"} Truck
            </h3>
            <p className="text-sm font-normal text-[#75757A]">
              Here you can see all about your Plan
            </p>
          </div>
        </div>
        <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
          <div className="bg-[#1245940a] p-4 border-b flex md:items-center justify-between flex-col md:flex-row items-start">
            <h3 className="text-[20px] font-[500]">Truck Details</h3>
            <button
              type="button"
              className="btn btn-primary light_white "
              onClick={AddTag}
            >
              <i class="fa fa-plus me-2" aria-hidden="true"></i>Add Truck
            </button>
          </div>

            {/* <div className="grid grid-cols-12 gap-4 p-4">
              <div className="col-span-6">
                <label className="text-[14px] text-[#0000009c] tracking-wider mb-1 block">
                Truck Number<span className="star">*</span>
                </label>
                <input
                  type="text"
                  className="relative  bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
              
                  required
                />
              </div>
            
            
            </div> */}

        </div>
        <div className="mainareas">
          <form onSubmit={handleSubmit}>
            <div className="pprofile1 add-truck-sect  new-edit">
              <div className="row">
               

                {Truck.map((itm, i) => {
                  return (
                    <div
                      className={`${
                        Truck.length == 1 ? "col-lg-12" : "col-lg-6"
                      } `}
                    >
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
                                  var regex = new RegExp("^[a-zA-Z0-9]+$");
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
                                  updatetag(i, "truck_number", e.target.value)
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
                                      var regex = new RegExp("^[a-zA-Z0-9]+$");
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
                                      updatetag(i, "vin_number", e.target.value)
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
              <button
                type="submit"
                className="btn btn-primary text-end d-block btn-end-save"
              >
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
