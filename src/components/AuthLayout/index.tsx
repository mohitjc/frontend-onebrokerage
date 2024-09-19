import { Link } from "react-router-dom";
import { GoLock } from "react-icons/go";

const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="bg-img">
        <div className="flex justify-between gap-2 h-screen">
               <div className="absolute right-0 h-full xl:w-[600px] flex md:items-center md:justify-center px-10 py-4 bg-black/80 border-l-8 border-primary  overflow-auto ">
               <div className="w-full xl:w-3/4 ">
                  <Link to="/" className="  mb-10 block mx-auto text-center">
                      <img
                        src="../../../assets/img/logo-white.png"
                        className=" h-12 xl:h-24 object-contain  mx-auto"
                        alt="logo"
                      />
                    </Link>
                    {children}
               </div>
                    
                </div>
        </div>
     
      </div>
    </>
  );
};

export default AuthLayout;
