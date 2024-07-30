import { Link } from "react-router-dom"

const AuthLayout=({children}:any)=>{
    return <>
      <div className='grid items-center grid-cols-12 '>
       
       <div className="col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 hidden md:block">
         <div className="relative flex flex-col items-center justify-center h-screen py-8 overflow-auto">
         <div className=" w-full max-w-md px-8 py-6 mx-auto overflow-y-auto rounded-lg ">
           <Link to="/" className="absolute top-[10px] left-[10px] xl:w-[180px] z-[99] "><img src="/assets/img/logo-w.png" className="md:w-[160px] lg:w-[150px]  mx-auto  " alt="logo" /></Link>
           <img src="/assets/img/login-s.png" alt="bg-logon" width="auto" height="auto" className=" object-center object-cover absolute inset-0 w-full h-full z-10" />
           </div>
          

         </div>
       </div>
       <div className="col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8">
         <div className="relative w-full h-screen overflow-auto-auto ">
       
           <div className="flex flex-col justify-between h-full   py-6 px-3 xs:px-4 md:px-4  xl:px-12 xl:py-16 relative z-20">
           <div className="flex items-center justify-center h-full  w-full   relative z-20">
                 {children}
           </div>
           </div>
         </div>
       </div>
     </div>
    </>
}

export default AuthLayout