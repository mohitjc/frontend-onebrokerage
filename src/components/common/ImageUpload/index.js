import React, { useEffect, useRef, useState } from "react";
import ApiClient from "../../../methods/api/apiClient";
import Html from "./html";
import "./style.scss";
import loader from "../../../methods/loader";

const ImageUpload = ({
  idd,
  model,
  result,
  value,
  multiple,
  required,
  err,
  label = "",
}) => {
  const inputElement = useRef();
  const [img, setImg] = useState("");
  const [loading, setLoader] = useState(false);

  const uploadImage = async (e,id) => {
    let url = "upload/document/multiple";
    let files = e.target.files;
    if (files?.length > 1) {
      url = "upload/document/multiple";
    }

    let images = [];
    if (img) images = img;
    setLoader(true);
    ApiClient.multiImageUpload(url, files,{modelName:'users'}, "file").then((res) => {
      if (res?.data?.imagePath?.length) {
        let image = res.data?.imagePath;
        if (!multiple) {
          setImg(image[0]);
          result({ event: "value", value: image[0], id: id });
        } else {
          images=[...images,...image]
          result({ event: "value", value: images, id: id });
        }
        //  e.target.setValue('')
      }
      document.getElementById(idd).value=""
      setLoader(false);
      loader(false)
    });
  };

  const remove = (index) => {
    if (multiple) {
      let images = img.filter((itm, idx) => idx !== index);
      result({ event: "remove", value: images });
      setImg(images);
    } else {
      result({ event: "remove", value: "" });
      setImg("");
    }
  };

  useEffect(() => {
    setImg(value);
  }, [value]);

  return (
    <>
      <Html
        idd={idd}
        label={label}
        multiple={multiple}
        inputElement={inputElement}
        uploadImage={uploadImage}
        img={img}
        model={model}
        required={required}
        loader={loading}
        err={err}
        remove={remove}
      />
    </>
  );
};
export default ImageUpload;
