import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import { useSelector } from "react-redux";
import environment from "../../environment";
import { toast } from "react-toastify";
import MultiSelectDropdown from "../../components/common/MultiSelectDropdown";

const AddEdit = () => {
  const { id } = useParams();
  const [form, setform] = useState({
    id: "",
    title:"",
    drivers:[]
  });
  const [submitted, setSubmitted] = useState(false);
  const [drivers,setDrivers ] = useState([])
  const history = useNavigate();
  const user = useSelector((state) => state.user);

  const formValidation = [
    { key: "title", required: true, message: "At least one name is required" },
  ];
const driverList =()=>{

  ApiClient.get(`${shared?.getList}?addedBy=${user?.id}`).then((res) => {
    if (res.success) {
  
      setDrivers(res?.data?.data)
    }
    loader(false);
  });
}



  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate the form
    let invalid = methodModel.getFormError(formValidation ,form);
    if (invalid) return;

    // let method = form.id ? "put" : "post";
    // let url = form.id ? shared.editApi : shared.addApi;
    let method = 'post'
    let url = 'group'
    let value = {
        ...form
    }
    if (value.id) {
        method = 'put'
        url = 'group'
          delete value.drivers
    } else {
        
        delete value.id
    }

    // let value = {...form}

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  useEffect(() => {
    driverList()
  }, []);
  const options =drivers?.map((itm) => ({
    id: itm?.id,
    name: itm?.fullName
  }));

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data
          let payload = form

          Object.keys(payload).map(itm => {
              payload[itm] = value[itm]
          })
          
          payload.id=id
          setform({
              ...payload ,drivers:res?.data?.associated_drivers?.map(driver => driver?.id) || []
          })
      }
        loader(false);
      });
    }
  }, [id]);

  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-8">
            <Tooltip placement="top" title="Back">
              <Link
                to={`/${shared.url}`}
                className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </Link>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {form.id ? "Edit" : "Add"} {shared.addTitle}
              </h3>
              <p className="text-sm font-normal text-[#75757A]">
                Here you can see all about your Group
              </p>
            </div>
          </div>

          <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
            <div className="bg-[#1245940a] p-4 border-b flex justify-between items-center">
              <h3 className="text-[20px] font-[500]">Group </h3>
              
            </div>
            <div className=" grid grid-cols-12 gap-4 p-4">
            <div className="mobile_number mb-3">
                <FormControl
                  type="text"
                  name="name"
                  label="Name"
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e })}
                  required
                />
                {submitted && !form.title && (
                  <div className="invalid-feedback d-block">
                    Name is required
                  </div>
                )}
              </div>
             
              {/* Show add button only if not in edit mode */}
            </div>
          </div>

          <div className=" mb-3">
            <label>Drivers</label>
              <MultiSelectDropdown
                displayValue="fullName"
                placeholder="Select Drivers"
                intialValue={form?.drivers}
                result={e => {
                  setform({ ...form, drivers: e.value })
                  
                }}
                options={drivers}
                theme="search"
                
              />
              
              </div>
          <div className="text-right">
            <button
              type="submit"
              className="text-white bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
            >
              Save
            </button>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;
// in the edit case when we have id those time the driver field is not added in the payload