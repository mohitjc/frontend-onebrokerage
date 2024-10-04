import { AiOutlineCloseCircle } from "react-icons/ai";
import { SlCheck } from "react-icons/sl";

const Html = ({

}) => {

  return (
    <>
     <div className="h-screen flex items-center justify-center bgimgssuc">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
            <div className="mb-6">
            <AiOutlineCloseCircle className="w-16 h-16 mx-auto text-red-500 "  />

            
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
            {/* <p className="text-gray-600 mb-6">Your submission has been received. We will get back to you shortly.</p> */}

            <a href="/" className="inline-block bg-red-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out">
              Go back to Home
            </a>
          </div>
        </div>
   
     
    </>
  );
};

export default Html;