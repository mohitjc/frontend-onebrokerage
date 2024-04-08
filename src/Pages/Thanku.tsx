import PageLayout from "../components/global/PageLayout";

const Thanku = () => {
  return (
    <>
      <PageLayout>
          <div className="container mx-auto">
                <div className="shadow-xl w-[40%] mx-auto flex items-center justify-center p-16 mt-16">
                     <div className="">
                      <img className="h-48 mx-auto" src="assets/img/skill/thanks.png" />
                      <div className="text-center mt-10 pt-5 border-t border-gray-200 ">
                        <h4 className="text-2xl font-bold">Thanks For Your Response</h4>
                        <p>Login with your email to view events</p>
                      </div>
                     </div>
                     
                </div>
          </div>
      </PageLayout>
    </>
  );
};

export default Thanku;
