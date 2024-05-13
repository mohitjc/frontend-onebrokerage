import { Link } from "react-router-dom"

const AuthLayout=({children}:any)=>{
    return <>
     <div className='grid items-center grid-cols-12'>
       
        <div className="col-span-12 md:col-span-6 lg:col-span-6">
          <div className="relative flex flex-col items-center justify-center h-screen py-8 overflow-auto">
            
            <div className="shadow-box w-full max-w-md px-8 py-6 mx-auto overflow-y-auto bg-white rounded-lg">
            <Link to="/"><img src="/assets/img/logo.png" className="w-[150px] mb-6 mx-auto" alt="logo" /></Link>
              {children}
            </div>

          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-6 hidden md:block">
          <div className="relative w-full h-screen">
            <img src="/assets/img/login_Img.png" alt="bg-logon" width="auto" height="auto" className=" object-center object-cover absolute inset-0 w-full h-full z-10" />
            <div className="flex flex-col justify-between h-full   py-6 px-3 xs:px-4 md:px-4  xl:px-12 xl:py-16 relative z-20">
              {/* <h6 className="text-lg xl:text-2xl  font-medium text-white mt-auto">Multipurpose
                tool you need to succeed
                in business</h6> */}
            </div>
          </div>
        </div>
      </div>
    </>
}

export default AuthLayout