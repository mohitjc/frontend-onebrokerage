import { TiStarFullOutline } from 'react-icons/ti';
import PageLayout from '../components/global/PageLayout';

const Home = () => {
  return (
    <>
      <PageLayout>
        <div className="container mx-auto">
          <div className="">

          <section className='bg-white py-16'>
            <div className="container items-center  px-8 mx-auto xl:px-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                  <div className='col-span-12 md:col-span-7 lg:col-span-6'>
                      <div className='box-inner relative'>
                          <img className='absolute lg:top-0 lg:left-0 lg:h-16 left-10 top-8 lg:w-16 h-10 w-10 '  src='assets/img/skill/h1.png'/>
                          <img className='absolute lg:left-20 md:left-20 md:top:5 lg:top-10 lg:h-20 lg:w-20 md:h-12 md:w-12 h-8 w-8'  src='assets/img/skill/h3.png'/>
                          <img className='absolute lg:right-14 lg:h-28 lg:w-28 md:h-16 md:w-16 md:right-10 right-0 h-20 w-20'  src='assets/img/skill/h4.png'/>
                          <div className='img_ceter relative'>
                              <img src="assets/img/skill/h2.png" className='object-contain lg:w-1/2 mx-auto lg:h-1/2 sm:w-1/2 ' />
                              <div className=' left-1/2 transform -translate-x-1/2 lg:absolute md:absolute relative md:bottom-0 lg:bottom-14 bottom-10 w-62 md:w-72'>
                                  <div className='bg-white rounded-md p-4 shadow-md  flex justify-center items-center'>
                                      <div className='flex flex-col gap-y-2 justify-center items-center'>
                                          <div className='img_lists flex flex-wrap'>
                                            <img className='h-6 w-6 -mr-2 rounded-full object-contain' src='assets/img/skill/avatar.png'  />
                                            <img className='h-6 w-6  -mr-2 rounded-full object-contain' src='assets/img/skill/avatar.png'  />
                                            <img className='h-6 w-6 -mr-2 rounded-full object-contain' src='assets/img/skill/avatar.png'  />
                                            <img className='h-6 w-6 -mr-2 rounded-full object-contain' src='assets/img/skill/avatar.png'  />
                                          </div>
                                          <div className='textitems text-center gap-y-2'>
                                            <h6>120+ Collaborations</h6>
                                           
                                          </div>
                                          <div>
                                            <p className='flex gap-x-2 items-center text-gray-600 text-sm'> <TiStarFullOutline className='text-yellow-500 h-5 w-5' />5.0 (3.1K Reviews)</p>
                                          </div>
                                      </div>
                                  </div>

                              </div>  
                          </div>
                      </div>
                  </div>
                  <div className='col-span-12 md:col-span-5 lg:col-span-6'>
                      <div className='text-sec1 text-center md:text-left'>
                        <h1 className='lg:text-4xl md:text-2xl sm:text-lg font-bold '>Connect, Refer & Grow Your Business with Our Solutions.</h1>
                        <p className='mt-4 text-xl'>We help you to connect with other professionals, schedule appointments, meet and increase your referral potential.</p>
                        <div className='flex flex-wrap  justify-center md:justify-start mt-10 gap-x-4 gap-y-4 sm:mt-6 md:mt-8 lg:mt-20'>
                              <button className='p-2 text-white rounded-lg bg-yellow-500 px-6'>Explore More</button>
                              <div className='flex items-center gap-x-2 '> 
                                   <img src="assets/img/skill/Button.png" className='h-10 w-10' />
                                   <div className='w-36 text-left'>
                                      <p>Watch our introduction video</p>
                                   </div>
                              </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </section>

          <section className='bg-white py-16'>
            <div className="container items-center  px-8 mx-auto xl:px-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                  <div className='col-span-12'>
                     <h2 className='text-center text-lg font-semibold'> Trusted by greatest companies</h2>
                  </div>
                  <div className='col-span-12 mt-8'>
                      <div className='flex flex-wrap justify-center gap-16 items-center '>
                          <img src="assets/img/skill/l1.png" />
                          <img src="assets/img/skill/l2.png" />
                          <img src="assets/img/skill/l3.png" />
                          <img src="assets/img/skill/l4.png" />
                          <img src="assets/img/skill/l5.png" />
                      </div>
                  </div>
              </div>
            </div>

          </section>


          <section className='py-16 bg-white'>
              <div className='container items-center  px-8 mx-auto xl:px-5'>
                  <div className='heading-data'>
                      <h2 className='font-bold text-4xl mb-2'>WHAT WE DO?</h2>
                      <p>A Business Networking Platform Designed to Meet Your Needs</p>
                  </div>
                  <div className='mt-20 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      <div className='shadow p-4 bg-white'>
                         

                          

                          <h6>Meeting Administration</h6>
                          <p>Group facilitators can now easily configure, prepare, and run meetings and spend more time and focus delivering value to their group members.</p>
                      </div>
                     
                  </div>
              </div>
          </section>


          <section className='py-16 bg-white'>
              <div className='container items-center  px-8 mx-auto xl:px-5'>
                  <div className='heading-data'>
                      <h2 className='font-bold text-4xl mb-2'>We create world-class digital products</h2>
                      <p>By information about design the world to the best instructors, heatc helping By information</p>
                  </div>
                  <div className='mt-20 grid grid-cols-12 gap-4'>
                      <div className='col-span-12 md:col-span-12 lg:col-span-6'>
                          <div className='idimng_data_text'>
                              <div className='oneimages'>
                                  <img src="assets/img/skill/t1.png" className='w-full h-76' />
                              </div>
                              <div className='textings gap-y-2 flex flex-col mt-4'>
                                  <span className='text-sm text-gray-400'>App Design - June 20, 2022</span>
                                  <h5 className='font-bold text-xl line-clamp-1'>App Redesign</h5>
                                  <p className='text-md text-gray-500 line-clamp-2'>By information about design the world to the best instructors, heatc helping By information about design the world to the best instructors, heatc helping</p>
                              </div>
                          </div>
                      </div>
                      <div className='col-span-12 md:col-span-12 lg:col-span-6'>
                          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-x-4 gap-y-4'>
                          <div className='idimng_data_text'>
                              <div className='oneimages'>
                                  <img src="assets/img/skill/t2.png" className='w-full lg:56 object-cover' />
                              </div>
                              <div className='textings gap-y-2 flex flex-col mt-4'>
                                  <span className='text-sm text-gray-400'>App Design - June 20, 2022</span>
                                  <h5 className='font-bold md:text-lg text-sm lg:text-lg line-clamp-2'>Redesign channel website landng page</h5>
                              </div>
                          </div>
                          <div className='idimng_data_text'>
                              <div className='oneimages'>
                                  <img src="assets/img/skill/t3.png" className='w-full lg:56 object-cover' />
                              </div>
                              <div className='textings gap-y-2 flex flex-col mt-4'>
                                  <span className='text-sm text-gray-400'>App Design - June 20, 2022</span>
                                  <h5 className='font-bold md:text-lg text-sm lg:text-lg line-clamp-2'>New Locator App For a New Company</h5>
                              </div>
                          </div>
                          <div className='idimng_data_text'>
                              <div className='oneimages'>
                                  <img src="assets/img/skill/t3.png" className='w-full lg:56 object-cover' />
                              </div>
                              <div className='textings gap-y-2 flex flex-col mt-4'>
                                  <span className='text-sm text-gray-400'>App Design - June 20, 2022</span>
                                  <h5 className='font-bold md:text-lg text-sm lg:text-lg line-clamp-2'>Rental Rooms Web  App Platform </h5>
                              </div>
                          </div>
                          <div className='idimng_data_text'>
                              <div className='oneimages'>
                                  <img src="assets/img/skill/t4.png" className='w-full lg:56 object-cover' />
                              </div>
                              <div className='textings gap-y-2 flex flex-col mt-4'>
                                  <span className='text-sm text-gray-400'>App Design - June 20, 2022</span>
                                  <h5 className='font-bold md:text-lg text-sm lg:text-lg line-clamp-2'>Calendar App for Big SASS Company</h5>
                              </div>
                          </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>


            <section className=" bg-white py-16">
              <div className="container items-center  px-8 mx-auto xl:px-5">
                <div className="flex flex-wrap items-center sm:-mx-3">
                  <div className="w-full md:w-1/2 md:px-3">
                    <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-1xl md:text-2xl lg:text-3xl xl:text-5xl">
                        <span className="block xl:text-lg">Benefits</span>
                        <span className="block text-orange-500 xl:inline">
                        Take Professional Business Networking to New Heights

                        </span>
                      </h1>
                      <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                      Improve how your networking meetings are facilitated, tracked, and managed. Provide more value to facilitators and participants. Easily refer business opportunities to other members of your network. Use data and analytic capabilities to optimize your meetings, connections, and referrals to maximize the effectiveness of all your networking efforts.


                      </p>
                      <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                        <a
                          href="#_"
                          className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-orange-500 rounded-md sm:mb-0 hover:bg-orange-700 sm:w-auto"
                        >
                          Try It Free
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 ml-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                          </svg>
                        </a>
                        <a
                          href="#_"
                          className="flex items-center px-6 py-3 text-gray-500 bg-gray-100 rounded-md hover:bg-gray-200 hover:text-gray-600"
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 text-center">
                    <div className="w-full h-auto overflow-hidden rounded-md ">
                      <img src="assets/img/skill/f1.png" className='mx-auto' />
                    </div>
                  </div>
                </div>
              </div>
            </section>
        

            <section className=' bg-white py-16'>
            <div className="container items-center  px-8 mx-auto xl:px-5">
              <div className="rounded-lg overflow-hidden  relative">
                <img
                  className="w-full  object-cover"
                  src="assets/img/skill/projects.png"
                  alt=""
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <h4 className="font-semibold text-white tracking-tight text-4xl mb-5">
                    Partnerships & Projects
                  </h4>
                  <p className="text-gray-100 leading-normal text-base">
                    Lorem Ipsum is simLorem Ipsum is simply dummy text of the
                    printing and typesetting industry ply dummy text of the
                    printing and typesetting industry.
                  </p>
                  <button className="bg-orange-500 text-white	py-2 px-8 text-base	 rounded-3xl font-bold	mt-8">All Projects</button>
                </div>
              </div>
              </div>
            </section>
           
           
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
