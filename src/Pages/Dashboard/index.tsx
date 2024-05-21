import { useEffect, useState } from "react";
import Layout from "../../components/global/layout";
import Chart from "../../components/Charts/Chart";

const Dashboard = () => {
  return (
    <>
      <Layout>
        <h4 className="text-lg font-bold mb-3">My Dashboard</h4>
        <Chart />
      </Layout>
    </>
  );
};

export default Dashboard;
