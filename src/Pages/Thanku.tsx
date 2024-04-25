import { useState } from "react";
import PageLayout from "../components/global/PageLayout";
import { BlockBlobClient, AnonymousCredential } from '@azure/storage-blob';

const Thanku = () => {
  const sasKey:any='sp=racwdli&st=2024-04-25T09:28:38Z&se=2024-04-30T17:28:38Z&sv=2022-11-02&sr=c&sig=qfRZ%2B%2Bb7z9aBHmlcE2XM0XQDIKa2WLcieACpb%2B4S9PU%3D'
  const sasurl:any='https://skillprobackendstore.blob.core.windows.net';
  function buildBlobName(file:any) {
    var filename = file.name.substring(0, file.name.lastIndexOf('.'));
    var ext = file.name.substring(file.name.lastIndexOf('.'));
    return filename + '_' + Math.random().toString(16).slice(2) + ext;
}

const [loading,setLoader]=useState(false)

const blobUpload = function(file:any, url:any=sasurl, container:any='exel', sasKeys=sasKey) {
    var blobName = buildBlobName(file);
    var login = `${url}/${container}/${blobName}?${sasKeys}`;
    var blockBlobClient = new BlockBlobClient(login, new AnonymousCredential());
    setLoader(true)
    blockBlobClient.uploadBrowserData(file).then(res=>{

      let url=res._response.request.url
      console.log("res",res)
      console.log("url",url)
      setLoader(false)
    }).catch(err=>{
      console.log("err",err)
      setLoader(false)
    });
}

const uploadFile=(e:any)=>{
  let files=e.target.files;
  let file=files.item(0)
  console.log("file",file)
  if(file){
    blobUpload(file)
  }
}


  return (
    <>
      <PageLayout>
          <div className="container mx-auto">
                <div className="shadow-xl w-[40%] mx-auto flex items-center justify-center p-16 mt-16">
                     <div className="">
                      <img className="h-48 mx-auto" src="assets/img/skill/thanks.png" />
                      <div className="text-center mt-10 pt-5 border-t border-gray-200 ">
                        <h4 className="text-2xl font-bold">Thanks For Your Response</h4>
                        <p>Login with your email to view events</p>
                      </div>
                     </div>
                     
                     <input type="file" onChange={uploadFile} />
                     {loading?<>
                     <div className="text-center">Uploading...</div>
                     </>:<></>}
                </div>
          </div>
      </PageLayout>
    </>
  );
};

export default Thanku;
