import { SlCheck } from "react-icons/sl";



const Html = ({

}) => {

  return (
    <>
    
        <div className="h-screen flex items-center justify-center bgimgssuc">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
            <div className="mb-6">
            <SlCheck className="w-16 h-16 mx-auto text-blue-800 animate-bounce"  />

            
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
            <p className="text-gray-600 mb-6">Thanks for your purchase</p>

            <a href="/trucks/add" className="inline-block bg-primary hover:bg-green-600 text-white font-semibold py-2 px-4   rounded transition duration-300 ease-in-out">
             Ok
            </a>
          </div>
        </div>
     
    </>
  );
};

export default Html;
