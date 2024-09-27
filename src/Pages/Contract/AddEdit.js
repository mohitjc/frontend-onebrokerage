import React, { useState, useEffect } from "react";
import ApiClient from "../../methods/api/apiClient";
import loader from "../../methods/loader";
import methodModel from "../../methods/methods";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/global/layout";
import { Tooltip } from "antd";
import FormControl from "../../components/common/FormControl";
import shared from "./shared";
import moment from "moment";
import ImageUpload from "../../components/common/ImageUpload";

const AddEdit = () => {
  const { id } = useParams();

  const [images, setImages] = useState({ image: "" });
  const [form, setform] = useState({ 
    title: "",
    terms: "", 
    startDate : "",
    endDate : "",
    total_amount:''
  });
  const history = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [doc, setDoc] = useState('');

  const formValidation = [ 
    { key: "title", required: true, message: "Title is required", },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    let invalid = methodModel.getFormError(formValidation, form);

    if (invalid) return;
    let method = "post";
    let url = shared.addApi;
    let value = {
      ...form, 
      doc_url:doc,
      assignment_id:methodModel.getPrams('assignment')
    };

    if (value.id) {
      method = "put";
      url = `${shared.editApi}?id=${id}`;
    } else {
      delete value.id;
    }

    loader(true);
    ApiClient.allApi(url, value, method).then((res) => {
      if (res.success) {
        // ToastsStore.success(res.message)
        history(`/${shared.url}`);
      }
      loader(false);
    });
  };



  useEffect(() => {
    if (id) {
      loader(true);
      ApiClient.get(shared.detailApi, { id }).then((res) => {
        if (res.success) {
          let value = res.data;
          let payload = form;
          Object.keys(payload).map((itm) => {
            payload[itm] = value[itm];
          }); 
          payload.id = id;
          setform({
            ...payload,
          });
          
          setDoc(value.doc_url)
        }
        loader(false);
      });
    }
  }, [id]);


  return (
    <>
      <Layout>
        <form onSubmit={handleSubmit}>
          <div className="pprofile1">
            <div className="flex items-center mb-8">
              <Tooltip placement="top" title="Back">
                <Link
                  to={`/${shared.url}`}
                  className="!px-4  py-2 flex items-center justify-center  rounded-lg shadow-btn hover:bg-[#F3F2F5] border transition-all  mr-3"
                >
                  <i className="fa fa-angle-left text-lg"></i>
                </Link>
              </Tooltip>
              <div>
                <h3 className="text-lg lg:text-2xl font-semibold text-[#111827]">
                  {form && form.id ? "Edit" : "Add"} {shared.addTitle}
                </h3> 
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className=" mb-3">
                <FormControl
                  type="text"
                  label="Title"
                  value={form.title}
                  onChange={(e) => setform({ ...form, title: e })}
                  required
                />
              </div> 
              <div className="mb-3">
                <FormControl
                  type="date"
                  label="Start date"
                  value={form.startDate}
                  onChange={(e) => setform({ ...form, startDate: e })}
                  required
                />
              </div>
              <div className="mb-3">
                <FormControl
                  type="date"
                  label="End date"
                  value={form.endDate}
                  onChange={(e) => setform({ ...form, endDate: e })}
                  required
                />
              </div>    

              <div className="mb-3">
                <FormControl
                  type="number"
                  label="Total Amount"
                  value={form.total_amount}
                  maxlength="10"
                  onChange={(e) => setform({ ...form, total_amount: e })}
                  required
                />
              </div>   
              
              <div className="col-span-full mb-3">
                <FormControl
                      type="editor"
                      label="terms"
                      value={form.terms}
                      
                      onChange={(e) => setform({ ...form, terms: e })}
                      required
                    />
            
            </div>

            <div className="mb-3">
                <label className="text-sm">Document</label>
                <div>
              <ImageUpload
                value={doc}
                model="document"
                apiUrl="upload/upload/document"
                type="doc"
                accept=""
                label="Upload Docs"
                result={e=>{
                  setDoc(e.value)
                }}
                />
                </div>
               
            </div>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="text-white bg-[#494f9f] bg-[#494f9f] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  mb-2"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Layout>
    </>
  );
};

export default AddEdit;
