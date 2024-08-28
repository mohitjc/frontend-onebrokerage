import React from "react";
import methodModel from "../../../methods/methods";
import { FiPlus } from "react-icons/fi";
import { LuUpload } from "react-icons/lu";

const Html = ({
  inputElement,
  uploadImage,
  img,
  remove,
  loader,
  model,
  multiple,
  required,
  err,
  label = "",
}) => {
  return (
    <>
      <label
        className={`block cursor-pointer text-gray-500 bg-white border border-dashed border-[#00000078] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-8 py-2.5 text-center ${
          img && !multiple ? "d-none" : ""
        }`}
      >
        <input
          type="file"
          className="hidden"
          ref={inputElement}
          accept="image/*"
          multiple={multiple ? true : false}
          disabled={loader}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div className="flex  items-center justify-center">
        <LuUpload className="text-xl text-[#00000078] me-2"/>

       
          <span>{label || "Please upload image"}</span>
        </div>
      </label>

      {loader ? (
        <div className="text-success text-center mt-2">
          Uploading... <i className="fa fa-spinner fa-spin"></i>
        </div>
      ) : (
        <></>
      )}

      {multiple ? (
        <>
          <div className="imagesRow">
            {img &&
              img.map((itm, i) => {
                return (
                  <div className="imagethumbWrapper">
                    <img
                      src={methodModel.noImg(itm, model)}
                      className="thumbnail "
                    />
                    <i
                      className="fa fa-times"
                      title="Remove"
                      onClick={(e) => remove(i)}
                    ></i>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <>
          {img ? (
            <div className="imagethumbWrapper">
              <img src={methodModel.noImg(img, model)} className=" w-[100px] h-[100px] object-cover" />
              <i
                className="fa fa-times"
                title="Remove"
                onClick={(e) => remove()}
              ></i>
            </div>
          ) : (
            <></>
          )}
        </>
      )}

      {required && !img ? (
        <div className="text-danger">{err ? err : "Image is Required"}</div>
      ) : (
        <></>
      )}
    </>
  );
};
export default Html;
