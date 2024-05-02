import { useState } from "react";
import PageLayout from "../components/global/PageLayout";
import ApiClient from "../methods/api/apiClient";

const Thanku = () => {

const [loading,setLoader]=useState(false)
const [img,setImg]=useState('')

const uploadFile=(e:any)=>{
  let files=e.target.files;
  let file=files.item(0)
  console.log("file",file)
  if(file){
    setLoader(true)
    ApiClient.azureUpload({file:file}).then(res=>{
      setLoader(false)
      if(res.success){
        setImg(res.fileName)
      }
    })
  }
}


  return (
    <>
      <PageLayout>
          <div className="container mx-auto">
                <div className="shadow-xl w-full lg:w-[40%] mx-auto flex items-center justify-center lg:p-16 lg:mt-16 p-6 mb-4 mt-4">
                     <div className="">
                      <img className="h-48 mx-auto" src="assets/img/skill/thanks.png" />
                      <div className="text-center mt-10 pt-5 border-t border-gray-200 ">
                        <h4 className="text-2xl font-bold">Thanks For Your Response</h4>
                        <p>Login with your email to view events</p>
                      </div>
                     </div>
                     
                     {/* <input type="file" onChange={uploadFile} />
                     {loading?<>
                     <div className="text-center">Uploading...</div>
                     </>:<></>}

                     <img className="ext-image-section block w-50" width={100} src={methodModel.noImg(img)}/> */}
                </div>
          </div>
      </PageLayout>
    </>
  );
};

export default Thanku;
