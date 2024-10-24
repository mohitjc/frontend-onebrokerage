import { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Chart from "../../components/Charts/Chart";
import { IoHandRightOutline } from "react-icons/io5";
import PieChart from "../../components/Charts/Piechart";
import DoughnutChart from "../../components/Charts/DonutChart";
import ApiClient from "../../methods/api/apiClient";
import SelectDropdown from "../../components/common/SelectDropdown";
import loader from "../../methods/loader";
import LineChart from "../../components/common/LineChart";
import { useSelector } from "react-redux";
import PageLayout from "../../components/global/PageLayout";
import methodModel from "../../methods/methods";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const user=useSelector(state=>state.user)
  const [data, setData] = useState();
  const [productData, setProductData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [totalAmounts, setTotalAmount] = useState([]);
  const [dates, setDates] = useState([]);
  const [filters, setFilter] = useState({monthly:'monthly',type:'monthly',startDate:'',endDate:''});
  const [aggregation, setAggregation] = useState("monthly");
  const history=useNavigate()
  const list = [
    { id: "daily", name: "Daily" },
    { id: "weekly", name: "Weekly" },
    { id: "monthly", name: "Monthly" },
    { id: "yearly", name: "Yearly" },
  ];

   const getAllCounts = () => {
    ApiClient.get("total-loads",{addedBy:user?.id}).then((res) => {
      if (res.success) {
      
        setData(res);
      }
    });
  };

  

  const getOrders=(p={})=>{
    let f={
      ...filters,
      ...p
    }
    
    ApiClient.get('orders/graph/data',f).then(res=>{
      if(res.success){
        let data=res.data
        // let arr=Object.keys(data)
        data=data.map(itm=>{
          let date=`${itm._id.date_year}-${itm._id.date_month}-${itm._id.day}`
          if(f.type=='monthly') date=`${itm._id.date_year}-${itm._id.date_month}`
          if(f.type=='yearly') date=`${itm._id.date_year}`
          return {
            avgOrderValue:itm.avgOrderValue.toFixed(2),
            totalOrders:itm.totalOrders,
            totalSale:itm.totalSale.toFixed(2),
            date:date
          }
        }) 
        setOrderData(data)
      }
    })
  }

  useEffect(() => {
    getAllCounts();
    // getOrders();
  }, []);

  useEffect(() => {
    // getRewardGraph();
  }, [aggregation]);

  const getRewardGraph = () => {
    loader(true)
    const payload = {
      Token: "sFov-YObWxbL-o2y9PTBh7PG7XwqDRb85FuDK4yEcbQ",
      email: "maheshm%2B1071%40parasightsolutions.com",
      aggregation: aggregation,
    };
    ApiClient.post("dashboard/graph/rewards", payload).then((res) => {
      if (res.success) {
        loader(false)

        let data=res.data
        let arr=Object.keys(data)
        arr=arr.map(itm=>{
          return {
            totalAmount:data[itm].totalAmount?.toFixed(2),
            count:data[itm].count,
            date:itm
          }
        }) 

        setDates(arr)
        // for (const date in res.data) {
        //   if (res.data.hasOwnProperty(date)) {
        //     totalAmounts?.push(res.data[date].totalAmount);
        //     dates?.push(date);
        //     setTotalAmount(totalAmounts)
        //     setDates(dates)
        //   }
        // }
       
      }
    });
  };

  const changestatus = (e) => {
    setAggregation(e);
  };

 const filter=(p={})=>{
  setFilter({...filters,...p})
  // getProducts(p)
  getOrders(p)
 }

 

  return (
    <>
      <PageLayout>
        <h4 className="text-2xl font-bold mb-3 flex items-center gap-2">
          <IoHandRightOutline className="text-3xl slow-shake text-[#494f9f]" />
          <span className="">Hi,</span> {methodModel.capitalizeFirstLetter(user?.fullName)}
        </h4>

        <div className=" w-full bg-white rounded-lg mt-6 ">
        <div className=" grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {user?.role=="driver"?<>       
        
            </>:<>  
            <div className="  border text-center border-gray-200 px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow cursor-pointer" onClick={(e)=>history("/loads")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d1.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
                Total Loads
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
                {data?.total_loads} 
              </dd>
            </div>
            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow cursor-pointer" onClick={(e)=>history("/drivers")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d1.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              Total Drivers
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.totalDriversCount} 
              </dd>
            </div>
            <div className="  border text-center border-gray-200 px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow cursor-pointer" onClick={(e)=>history("/trucks")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d1.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
                Total Trucks
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
                {data?.totalTrucksCount} 
              </dd>
            </div>
         </>}

         
       
            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/carrierstaff")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              Total Carrier's Staff
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.totalStaffCount} 
              </dd>
            </div>

            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/loads")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              {user?.role=="driver"?"Total Tasks":"Total Loads"}
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.total_loads} 
              </dd>
            </div>

            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/pendingpickuptask")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              {user?.role=="driver"?"Pending Pickup Tasks":"Pending Pickup Loads"}
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.pending_loads} 
              </dd>
            </div>
            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/pickeduptask")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              {user?.role=="driver"?"Pickedup Tasks":"Pickedup Loads"}
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.pickedup_loads} 
              </dd>
            </div>
            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/intransittask")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              {user?.role=="driver"?"Intransit Tasks":"Intransit Loads"}
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.intransit_loads} 
              </dd>
            </div>

            <div className="  border text-center border-gray-200  px-6 py-2 rounded-lg relative bg-[#fff] inner-shadow  cursor-pointer" onClick={(e)=>history("/deliveredtask")}>
              <div className="bg-[#494f9f17] w-[80px] h-[80px] rounded-[50px] p-4 mx-auto flex mb-6 mt-5 ">
                <img
                  src="../assets/img/d4.svg"
                  className="mx-auto  w-[30px]"
                  alt=""
                />
              </div>
              <dt className="text-base leading-7 text-black/40 mb-1">
              {user?.role=="driver"?"Delivered Tasks":"Delivered Loads"}
              </dt>
              <dd className="text-3xl font-bold leading-9  text-black mb-3 ">
              {data?.delivered_loads} 
              </dd>
            </div>
          
            
          </div>
          <div className="grid grid-cols-12 gap-4 mt-6">
            {/* <div className="col-span-12 md:col-span-12">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Categories</h5>
                </div>
                <Chart />
              </div>
            </div> */}

            {/* <div className="col-span-12 md:col-span-6">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Products</h5>
                </div>
                <PieChart />
              </div>
            </div> */}

            {/* <div className="col-span-12 md:col-span-6">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="names_heads">
                  <h5 className="font-semibold text-xl">Questions</h5>
                </div>
                <DoughnutChart />
              </div>
            </div> */}
            <div className="col-span-12 md:col-span-12">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-xl">Assignment</h5>
                  <div className="">
                  <SelectDropdown
                  // id="statusDropdown"
                  displayValue="name"
                  intialValue={aggregation}
                  result={(e) => {
                    changestatus(e.value);
                  }}
                  options={list}
                />
                  </div>
                </div>
               
                {/* <Chart
                  totalAmounts={totalAmounts}
                  dates={dates}
                  name={"Reward Points"}
                  type={""}
                /> */}
                 <LineChart
                  legends={[
                    {label:'Total Assignment',key:'count'},
                    // {label:'Total Amount',key:'totalAmount'},
                  ]}
                  data={dates}
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-12">
              <div className="chatr_ones border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold text-xl">Students</h5>
                  <div className="">
                  <SelectDropdown
                  // id="statusDropdown"
                  displayValue="name"
                  intialValue={filters.type}
                  result={(e) => {
                    filter({type:e.value})
                  }}
                  options={list}
                />
                  </div>
                </div>

                <LineChart
                  legends={[
                    {label:'Total Students',key:'totalOrders'},
                    // {label:'Total Sale',key:'totalSale'},
                    // {label:'Avg Order Value',key:'avgOrderValue'},
                  ]}
                  data={orderData}
                />
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Dashboard;
