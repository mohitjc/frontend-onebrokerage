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
    names: [{ name: "" }], // Initialize with one name field
  });
  const [submitted, setSubmitted] = useState(false);
  const history = useNavigate();
  const user = useSelector((state) => state.user);

  const formValidation = [
    { key: "names", required: true, message: "At least one name is required" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Validate the form
    let invalid = methodModel.getFormError(formValidation, {
      names: form.names,
    });
    if (invalid) return;

    let method = form.id ? "put" : "post";
    let url = form.id ? shared.editApi : shared.addApi;

    let value = form.id
      ? { id: form.id, name: form.names[0].name } // For editing, send a single name
      : { name: form.names }; // For adding, send an array of names

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        toast.success(res.message);
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };

  const handleNameChange = (index, event) => {
    const { value } = event.target; // Extract value safely
    const newNames = form.names.map((name, i) => {
      if (i === index) {
        return { ...name, name: value };
      }
      return name;
    });
    setForm({ ...form, names: newNames });
  };

  const handleAddName = () => {
    setForm({ ...form, names: [...form.names, { name: "" }] });
  };

  const handleRemoveName = (index) => {
    setForm({ ...form, names: form.names.filter((_, i) => i !== index) });
  };

  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          setForm({
            id: value.id,
            names: Array.isArray(value.name)
              ? value.name // If it's an array, use it as is
              : [{ name: value.name }], // Otherwise, wrap it in an array
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
                Here you can see all about your Features
              </p>
            </div>
          </div>

          <div className="border overflow-hidden rounded-lg bg-white  gap-4 shrink-0 mb-10 ">
            <div className="bg-[#1245940a] p-4 border-b flex justify-between items-center">
              <h3 className="text-[20px] font-[500]">Features </h3>
              <div className="">
                 {!form.id && (
                      <button
                        type="button"
                        className="text-white bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center mb-2"
                        onClick={handleAddName}
                      >
                        <i className=" fa fa-plus-circle me-2"></i>
                        Add More
                      </button>
                    )}
                  </div>
            </div>
            <div className=" grid grid-cols-12 gap-4 p-4">
          
              {form.names.map((name, index) => (
                <div className="col-span-6">
                  <div className="">
               
                    <div key={index} className="flex flex-col mb-3">
                      <label className="text-sm mb-2 block">Name</label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          className="relative  bg-white w-full rounded-lg h-10 flex items-center gap-2 overflow-hidden border border-[#00000036] px-3"
                          label={`Name ${index + 1}`}
                          value={name.name || ""} // Provide a default value if undefined
                          onChange={(e) => handleNameChange(index, e)}
                          required
                        />
                        {/* Show remove button only if there are more than one name */}
                        {form.names.length > 1 && !form.id && (
                          <button
                            type="button"
                            className="ml-2 text-white  border bg-[#eeeff6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                            onClick={() => handleRemoveName(index)}
                          >
                            <i className="fa fa-trash text-sm text-[#c02e2e]"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  
                  </div>
                </div>
              ))}
              {/* Show add button only if not in edit mode */}
            </div>
          </div>

          {submitted && form.names.length === 0 && (
            <div className="invalid-feedback d-block">
              At least one name is required
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
