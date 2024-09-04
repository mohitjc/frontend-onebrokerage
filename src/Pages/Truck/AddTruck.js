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

const AddEdit = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    id: "",
    truck_data: [{ truck_number: "", vin_number: "" }], // Initialize with one set of fields
  });
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  const user = useSelector((state) => state.user);

  const formValidation = [
    { key: "truck_data", required: true, message: "At least one truck record is required" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate the form
    let invalid = methodModel.getFormError(formValidation, {
      truck_data: form.truck_data,
    });
    if (invalid) return;

    let method = form.id ? "put" : "post";
    let url = form.id ? shared.editApi : shared.addApi;

    let value = form.id
      ? { id: form.id, truck_data: form.truck_data }
      : { truck_data: form.truck_data };

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  const handleFieldChange = (index, event, field) => {
    const { value } = event.target; // Extract value safely
    const newTruckData = form.truck_data.map((truck, i) => {
      if (i === index) {
        return { ...truck, [field]: value };
      }
      return truck;
    });
    setForm({ ...form, truck_data: newTruckData });
  };

  const handleAddField = () => {
    setForm({ ...form, truck_data: [...form.truck_data, { truck_number: "", vin_number: "" }] });
  };

  const handleRemoveField = (index) => {
    setForm({ ...form, truck_data: form.truck_data.filter((_, i) => i !== index) });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          setForm({
            id: value.id,
            truck_data: Array.isArray(value.truck_data)
              ? value.truck_data // If it's an array, use it as is
              : [{ truck_number: value.truck_number, vin_number: value.vin_number }], // Otherwise, wrap it in an array
          });
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
                className="!px-4 py-2 cursor-pointer flex items-center justify-center rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all mr-3 bg-[#494f9f] text-white hover:text-black"
              >
                <i className="fa fa-angle-left text-lg"></i>
              </Link>
            </Tooltip>
            <div>
              <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                {form.id ? "Edit" : "Add"} {shared.addTitle}
              </h3>
              <p className="text-sm font-normal text-[#75757A]">
                Here you can see all about your Truck
              </p>
            </div>
          </div>

          <div className="border overflow-hidden rounded-lg bg-white gap-4 shrink-0 mb-10 ">
            <div className="bg-[#1245940a] p-4 border-b flex justify-between items-center">
              <h3 className="text-[20px] font-[500]">Truck Data</h3>
              <div className="">
                {!form.id && (
                  <button
                    type="button"
                    className="text-white bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center mb-2"
                    onClick={handleAddField}
                  >
                    <i className="fa fa-plus-circle me-2"></i>
                    Add More
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-4 p-4">
              {form.truck_data.map((truck, index) => (
                <div className="col-span-6" key={index}>
                  <div className="flex flex-col mb-3">
                    <label className="text-sm mb-2 block">Truck Number</label>
                    <input
                      type="text"
                      className="relative bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
                      value={truck.truck_number || ""}
                      onChange={(e) => handleFieldChange(index, e, "truck_number")}
                      required
                    />
                    <label className="text-sm mb-2 block mt-2">VIN Number</label>
                    <input
                      type="text"
                      className="relative bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
                      value={truck.vin_number || ""}
                      onChange={(e) => handleFieldChange(index, e, "vin_number")}
                      required
                    />
                    {/* Show remove button only if there are more than one set of fields */}
                    {form.truck_data.length > 1 && !form.id && (
                      <button
                        type="button"
                        className="ml-2 text-white border bg-[#eeeff6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-2"
                        onClick={() => handleRemoveField(index)}
                      >
                        <i className="fa fa-trash text-sm text-[#c02e2e]"></i>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {submitted && form.truck_data.length === 0 && (
            <div className="invalid-feedback d-block">
              At least one truck record is required
            </div>
          )}
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
