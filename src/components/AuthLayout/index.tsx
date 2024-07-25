import { Link } from "react-router-dom"

const AuthLayout=({children}:any)=>{
    return <>
      <div className='grid items-center grid-cols-12 bg_images'>
       
       <div className="col-span-12 md:col-span-4 lg:col-span-4 hidden md:block">
         <div className="relative flex flex-col items-center justify-center h-screen py-8 overflow-auto">
         <div className=" w-full max-w-md px-8 py-6 mx-auto overflow-y-auto rounded-lg">
           {/* <Link to="/"><img src="/assets/img/logo.png" className="w-[35 0px] mb-6 mx-auto" alt="logo" /></Link> */}
           <img src="/assets/img/login-s.png" alt="bg-logon" width="auto" height="auto" className=" object-center object-cover absolute inset-0 w-full h-full z-10" />
           </div>
          

         </div>
       </div>
       <div className="col-span-12 md:col-span-8 lg:col-span-8 ">
         <div className="relative w-full h-screen overflow-auto-auto">
       
           <div className="flex flex-col justify-between h-full   py-6 px-3 xs:px-4 md:px-4  xl:px-12 xl:py-16 relative z-20">
           <div className="flex items-center justify-center h-full  w-full  lg:pl-14 relative z-20">
                 {children}
           </div>
           </div>
         </div>
       </div>
     </div>
    </>
}

export default AuthLayout