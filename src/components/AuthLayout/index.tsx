import { Link } from "react-router-dom";
import { GoLock } from "react-icons/go";

const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="bg-img">
        <div className="flex justify-between gap-2 h-screen">
               <div className="absolute right-0 h-full w-[100%] md:w-[600px] flex lg:items-center lg:justify-center px-10 py-4 bg-black/80 border-l-8 border-primary  overflow-auto ">
               <div className="w-full  h-[450px] xl:h-[auto] overflow-x-hidden overflow-y-auto">
                  <Link to="/" className="  mb-10 block mx-auto text-center">
                      <img
                        src="../../../assets/img/logo-white.png"
                        className=" h-12 xl:h-16 object-contain  mx-auto"
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
