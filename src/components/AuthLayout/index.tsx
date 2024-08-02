import { Link } from "react-router-dom";
import { GoLock } from "react-icons/go";

const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="grid items-center grid-cols-12 bg-img">
        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 ">
          <div className="relative flex flex-col items-center justify-center h-screen ">
            <div className=" w-full   mx-auto  ">
              {/* <Link to="/" className="absolute top-[10px] left-[10px] xl:w-[180px] z-[99] "><img src="/assets/img/logo-w.png" className="md:w-[160px] lg:w-[150px]  mx-auto  " alt="logo" /></Link> */}

              <div className="relative w-full h-screen  ">
                
                
                  <div className="flex items-center justify-center h-full  w-full   relative z-20 py-6 px-3 xs:px-4 md:px-4  xl:px-12 xl:py-16 relative z-20">
                    {children}
                  </div>
               
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 h-screen hidden md:block">
          <div className=" absolute bottom-0 xl:pl-30 lg:pl-0">
            <img src="/assets/img/b-girls.png" alt="bg-logon" className="  xl:h-[900px] lg:h-[700px] md:h-[600px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
