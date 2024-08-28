import React from "react";
import "./style.scss";
import PhoneInput from "react-phone-input-2";
import SelectDropdown from "../../common/SelectDropdown";
import { Link, useNavigate } from "react-router-dom";
import ImageUpload from "../../common/ImageUpload";

import FormControl from "../../common/FormControl";

const Html = ({
  handleSubmit,
  setForm,
  form,
  getError,
  imageResult,
  images,
  uploadImage,
  submitted,
}) => {
  const history = useNavigate();
  return (
    <>
      <div className="wrapper_section">
        <form name="" className="" onSubmit={handleSubmit}>
          <div className=" mb-4  border  bg-white rounded-[10px] border mt-6">
            <div className=" ">
              <div className="bg-[#1245940a] p-4 border-b ">
                <h3 className="text-[20px] font-[500] flex items-center">
                  {" "}
                  <button
                    onClick={() => history(-1)}
                    className="!px-4  py-2 cursor-pointer flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3 bg-[#494f9f] text-white hover:text-black"
                  >
                    <i className="fa fa-angle-left text-lg"></i>
                  </button>
                  Edit Profile
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-12 p-6 gap-4">
              <div className="col-span-12 md:col-span-6">
                <FormControl
                  type="text"
                  label="Full Name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e })}
                  required
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-sm mb-2 block">Email</label>
                <input
                  type="email"
                  className="relative border  border-[#00000036] [#bg-white w-full rounded-lg h-11 flex items-center gap-2 overflow-hidden px-2"
                  value={form.email}
                  autoComplete="false"
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  required
                  disabled
                />
              </div>
            
              <div className="col-span-12 md:col-span-6">
                <label className="text-sm mb-2 block">Role</label>
                <input
                  type="text"
                  className="relative border  border-[#00000036] [#bg-white w-full rounded-lg h-11 flex items-center gap-2 overflow-hidden px-2"
                  value={form.role}
                  autoComplete="false"
                  onChange={(e) => {
                    setForm({ ...form, role: e.target.value });
                  }}
                  required
                  disabled
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <label className="text-sm mb-2 block">Image</label>

                <ImageUpload
                  model="users"
                  result={(e) => imageResult(e, "image")}
                  value={images.image || form.image}
                  multiple={false}
                />
              </div>
            </div>
          </div>
          <div className="text-right mt-3">
            <button
              type="submit"
              className="text-white bg-[#494f9f] bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Html;
