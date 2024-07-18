import React, { useEffect, useState } from "react";
import ApiClient from "../../methods/api/apiClient";
import "./style.scss";
import loader from "../../methods/loader";
import Html from "./html";
import { useNavigate } from "react-router-dom";
import environment from "../../environment";
import axios from "axios";
import shared from "./shared";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import SweetAlert from "../../components/SweetAlert/SweetAlert";

const Video = () => {
  const user = useSelector((state) => state.user);
  const searchState = { data: "" };
  const [filters, setFilter] = useState({
    page: 1,
    count: 10,
    search: "",
    customerId: { value: "51TQ1AAFHREX2", label: "A Danielle Adams" },
  });

  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useNavigate();

  const handleUserChange = (e) => {
    setFilter((prev) => ({ ...prev, customerId: e }));
    const url = "orders/detail";
    let value = e.value || "";
    const parms = `Token=75b81fa3-bc28-3b1f-19df-8bc3d82c30f0&Cookie=heapSampling=0.7224022750841044; optimizelyEndUserId=oeu1720695541021r0.3829475046979349; gcl_au=1.1.56638464.1720695542; clAnalyticsId=7641554472643988; mkto_trk=id:215-EWB-051&token:_mch-clover.com-1720695542532-50641; tt_enable_cookie=1; ttp=cG_-4tgCi3JS3bBTI4mriKLMLSl; intercom-device-id-z49p7d1f=01b8ae76-e529-48c1-b544-7dac2cccebbc; ga=GA1.2.1388398470.1720680213; salesforcePartnerId=a077000000UioEH; evidon_suppress_notification_cookie={"date":"2024-07-11T10:59:28.301Z"}; fbp=fb.1.1720695587957.217241613850960703; intercom-id-z49p7d1f=004891ee-be51-43bd-bc09-e78eaa72d6a4; isCloverMerchant=true; mg=W8WV2BC4E2D3C|NQRCFW56ND65W|AGM687903RN4G|54WFXR0JWJ6R4|56JSK5YMR1JTW|1DANPV3T99JC6|K5ZSTKXWT23PE|SK88S16Q6HP6Y|1RM6MAR9KM1ZR|2N7CPRWGMC5W0|76NKQ28RCKS2G|54JXEW8K6RD7G|Z0SERP2SGT738|H91XYWCD7K922|964JW7XH9J238|WTNT2B7AXA25T|WEEC5MJCHWN32|F2GGW45TY4PBP|3Q32VKMVY0N8A|0YPAZ3PYT6N4R|SNQ9W7VG32JNG|12WRQW810Z5H0|22WJ340XSFHGY|5GJTJEWK7W082|72ZMBA6SC0QST|M7AAY85VE6E5C|G9QCV8QZVHZ02|ZW5S4N762ETK0|4J20MDT5FSWCY|CZTWSJM43PDPM|4Y30AWXP4PHCP|H4Y208ZKMK23J|V3BN06GQRRMCT|8SGDP1PZ8VNN4|Y9VY6RWP3NRNY|T2KRKC2V1N4ZA|0CCV9BPSCHEHR|7RPYDFM0ESF8C|CHGP8HDD12NQ6|QWSC9WAAQQPPA|V2YZ2C6Y4A59M|V58CBYF4HHPEC|9ERJZBZN9K6ET|8W86GESW5JP4C|TETCBFTZAPVS6|1QWN1395PXJ2M|1YMY5RA62ZKCM|DDVB5MMZJNV52|6B7KT61EHD12W|WJ5WB9JAZ6WTA|QQVYF2JSSPFDR|CC9QE1G9E4YHM|K33EKWHM9YHEG|7BCQYPT1AWXH8|2VVHAZ5ARRY3W|NTVWE5FFF0TCR|XHTGZ1TJ6DME6|8PTZPZJS6NDVW|W18NBY3JS54T4|XRX2SXPZ1PV6W|A9EVSGR2MXDC8|HEV8H2G0EGYTG|ZYX64T7ABXPAR|69PSKG8B0P5YY|AS76M9EER3Z0R|CB03ASTHJNP5G|1K3N6G626QZ30|2G089XP8DTXGG|X032Y268PA0SC|ZR835JBP9Z51W|SFKSDR7D949FE|XCZ5A6QD4C2Y6|GS4N5YYVQ84ZG|5KZDVRAXV032R|9XXMV1PTSNTXA|E0RYNBD6Z1VVR|AQXQ1H24396KE|YSBDBQNF38YJ6|EA404FCDBD3AC; rememberMe=3e8b1750423469a60c097c6e55547a62; isCloverMerchant=true; gaconnector_lc_content=; gaconnector_lc_medium=; gaconnector_fc_medium=; gaconnector_region=; gaconnector_GA_Client_ID=; gaconnector_fc_referrer=; gaconnector_lc_referrer=; gaconnector_fc_campaign=; gaconnector_lc_campaign=; gaconnector_all_traffic_sources=; gaconnector_fc_content=; gaconnector_fc_channel=; gaconnector_lc_channel=; clck=r0j778%7C2%7Cfnh%7C0%7C1653; intercom-session-z49p7d1f=; utag_main=v_id:0190a172511e004b15e64d6d70b005065001705d0086e$_sn:3$_ss:1$_st:1721043366139$_pn:1%3Bexp-session$ses_id:1721041566139%3Bexp-session; hp2_id.1285302910=%7B%22userId%22%3A%223429983775932588%22%2C%22pageviewId%22%3A%225475222746674479%22%2C%22sessionId%22%3A%222069023653461345%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; rdt_uuid=1720695542207.3cefb786-de63-4fbd-ac11-86029ca3f6a0; uetvid=952cbdf03f7411ef89bfc787c86e2a9f; agentId=526970240887; ga_E0HY8L2X5Z=GS1.2.1721041566.3.0.1721041570.56.0.0; ga_G417SXG087=GS1.2.1721041566.3.0.1721041570.56.0.0; ga_SSTH1SLK31=GS1.2.1721041566.3.0.1721041570.0.0.0; ga_94KD9B9TBM=GS1.2.1721041566.3.0.1721041570.0.0.0; ga_8BNMS5TPY2=GS1.2.1721049057.3.1.1721050459.58.0.0; sessionContext={"id":"3WF2DDDRWZS41","type":"merchant"}; hp2_id.2538680622=%7B%22userId%22%3A%224634200528955785%22%2C%22pageviewId%22%3A%228237949139166292%22%2C%22sessionId%22%3A%225127658700072143%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; gid=GA1.2.356368658.1721285414; hp2_ses_props.144423122=%7B%22ts%22%3A1721285414792%2C%22d%22%3A%22www.clover.com%22%2C%22h%22%3A%22%2Flogin%22%7D; sessionToken=494f8d9a-b3ca-46ba-b3e8-1f888f3724e0; gat=1; _hp2_id.144423122=%7B%22userId%22%3A%221683286691086799%22%2C%22pageviewId%22%3A%227850611896777889%22%2C%22sessionId%22%3A%221676480886441147%22%2C%22identity%22%3A%220817c4af4d9e6da942ea133d827d61056ce0f5606ccebd51d71084f831d16299%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%2C%22oldIdentity%22%3Anull%7D&id=${e.value}`;

    if (value) {
      loader(true);
      ApiClient.get(url + "?" + parms).then((res) => {
        if (res?.success) {
          getOrderDetails(res?.data?.customers?.elements?.[0]?.id);
        }
      });
    } else {
      loader(true);
      getOrderDetails("");
    }
  };

  const getOrderDetails = (customerId) => {
    let url = "orders/get";
    let encodedString = customerId
      ? "%20IN%20%28%27" + encodeURIComponent(customerId) + "%27%29"
      : "%20IN%20%28%2751TQ1AAFHREX2%27%29";

    let params = `expand=credits%2Cdiscounts%2Cemployee%2ClineItems%2ClineItems.discounts%2ClineItems.modifications%2CorderType%2Cpayments%2Crefunds%2CserviceCharge%2CorderAdditionalCharges&filter=customer.id${encodedString}&limit=${filters?.count}&offset=0&Token=718d05c3-dc86-40a6-b68b-c0e7134ab6c4&Cookie=heapSampling=0.7224022750841044; optimizelyEndUserId=oeu1720695541021r0.3829475046979349; gcl_au=1.1.56638464.1720695542; clAnalyticsId=7641554472643988; mkto_trk=id:215-EWB-051%26token:_mch-clover.com-1720695542532-50641; tt_enable_cookie=1; ttp=cG_-4tgCi3JS3bBTI4mriKLMLSl; intercom-device-id-z49p7d1f=01b8ae76-e529-48c1-b544-7dac2cccebbc; ga=GA1.2.1388398470.1720680213; salesforcePartnerId=a077000000UioEH; evidon_suppress_notification_cookie={"date":"2024-07-11T10:59:28.301Z"}; fbp=fb.1.1720695587957.217241613850960703; intercom-id-z49p7d1f=004891ee-be51-43bd-bc09-e78eaa72d6a4; isCloverMerchant=true; mg=W8WV2BC4E2D3C|NQRCFW56ND65W|AGM687903RN4G|54WFXR0JWJ6R4|56JSK5YMR1JTW|1DANPV3T99JC6|K5ZSTKXWT23PE|SK88S16Q6HP6Y|1RM6MAR9KM1ZR|2N7CPRWGMC5W0|76NKQ28RCKS2G|54JXEW8K6RD7G|Z0SERP2SGT738|H91XYWCD7K922|964JW7XH9J238|WTNT2B7AXA25T|WEEC5MJCHWN32|F2GGW45TY4PBP|3Q32VKMVY0N8A|0YPAZ3PYT6N4R|SNQ9W7VG32JNG|12WRQW810Z5H0|22WJ340XSFHGY|5GJTJEWK7W082|72ZMBA6SC0QST|M7AAY85VE6E5C|G9QCV8QZVHZ02|ZW5S4N762ETK0|4J20MDT5FSWCY|CZTWSJM43PDPM|4Y30AWXP4PHCP|H4Y208ZKMK23J|V3BN06GQRRMCT|8SGDP1PZ8VNN4|Y9VY6RWP3NRNY|T2KRKC2V1N4ZA|0CCV9BPSCHEHR|7RPYDFM0ESF8C|CHGP8HDD12NQ6|QWSC9WAAQQPPA|V2YZ2C6Y4A59M|V58CBYF4HHPEC|9ERJZBZN9K6ET|8W86GESW5JP4C|TETCBFTZAPVS6|1QWN1395PXJ2M|1YMY5RA62ZKCM|DDVB5MMZJNV52|6B7KT61EHD12W|WJ5WB9JAZ6WTA|QQVYF2JSSPFDR|CC9QE1G9E4YHM|K33EKWHM9YHEG|7BCQYPT1AWXH8|2VVHAZ5ARRY3W|NTVWE5FFF0TCR|XHTGZ1TJ6DME6|8PTZPZJS6NDVW|W18NBY3JS54T4|XRX2SXPZ1PV6W|A9EVSGR2MXDC8|HEV8H2G0EGYTG|ZYX64T7ABXPAR|69PSKG8B0P5YY|AS76M9EER3Z0R|CB03ASTHJNP5G|1K3N6G626QZ30|2G089XP8DTXGG|X032Y268PA0SC|ZR835JBP9Z51W|SFKSDR7D949FE|XCZ5A6QD4C2Y6|GS4N5YYVQ84ZG|5KZDVRAXV032R|9XXMV1PTSNTXA|E0RYNBD6Z1VVR|AQXQ1H24396KE|YSBDBQNF38YJ6|EA404FCDBD3AC; rememberMe=3e8b1750423469a60c097c6e55547a62; isCloverMerchant=true; gaconnector_lc_content=; gaconnector_lc_medium=; gaconnector_fc_medium=; gaconnector_region=; gaconnector_GA_Client_ID=; gaconnector_fc_referrer=; gaconnector_lc_referrer=; gaconnector_fc_campaign=; gaconnector_lc_campaign=; gaconnector_all_traffic_sources=; gaconnector_fc_content=; gaconnector_fc_channel=; gaconnector_lc_channel=; clck=r0j778%7C2%7Cfnh%7C0%7C1653; intercom-session-z49p7d1f=; utag_main=v_id:0190a172511e004b15e64d6d70b005065001705d0086e$_sn:3$_ss:1$_st:1721043366139$_pn:1%3Bexp-session$ses_id:1721041566139%3Bexp-session; hp2_id.1285302910=%7B%22userId%22%3A%223429983775932588%22%2C%22pageviewId%22%3A%225475222746674479%22%2C%22sessionId%22%3A%222069023653461345%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; rdt_uuid=1720695542207.3cefb786-de63-4fbd-ac11-86029ca3f6a0; uetvid=952cbdf03f7411ef89bfc787c86e2a9f; agentId=526970240887; ga_E0HY8L2X5Z=GS1.2.1721041566.3.0.1721041570.56.0.0; ga_G417SXG087=GS1.2.1721041566.3.0.1721041570.56.0.0; ga_SSTH1SLK31=GS1.2.1721041566.3.0.1721041570.0.0.0; ga_94KD9B9TBM=GS1.2.1721041566.3.0.1721041570.0.0.0; ga_8BNMS5TPY2=GS1.2.1721049057.3.1.1721050459.58.0.0; sessionContext={"id":"3WF2DDDRWZS41","type":"merchant"}; hp2_id.2538680622=%7B%22userId%22%3A%224634200528955785%22%2C%22pageviewId%22%3A%228237949139166292%22%2C%22sessionId%22%3A%225127658700072143%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; gid=GA1.2.356368658.1721285414; hp2_ses_props.144423122=%7B%22ts%22%3A1721285414792%2C%22d%22%3A%22www.clover.com%22%2C%22h%22%3A%22%2Flogin%22%7D; sessionToken=494f8d9a-b3ca-46ba-b3e8-1f888f3724e0; gat=1; _hp2_id.144423122=%7B%22userId%22%3A%221683286691086799%22%2C%22pageviewId%22%3A%227850611896777889%22%2C%22sessionId%22%3A%221676480886441147%22%2C%22identity%22%3A%220817c4af4d9e6da942ea133d827d61056ce0f5606ccebd51d71084f831d16299%22%2C%22trackerVersion%22%3A%224.0%22%2C%22identityField%22%3Anull%2C%22isIdentified%22%3A1%2C%22oldIdentity%22%3Anull%7D`;

    ApiClient.get(url + "?" + params).then((res) => {
      if (res.success) {
        setOrders(res.data.elements);
        // setTotal(res?.data?.total);
        setTotal(20);
      }
      loader(false);
    });
  };

  const clear = () => {
    let f = {
      type: "",
      search: "",
      status: "",
      category: "",
      page: 1,
    };
    setFilter({ ...filters, ...f });
    getOrderDetails("");
  };

  const filter = (p = {}) => {
    let f = {
      page: 1,
      ...p,
    };
    setFilter({ ...filters, ...f });
    getOrderDetails({ ...f });
  };

  const pageChange = (e) => {
    setFilter({ ...filters, page: e });
    // getData({ page: e });
  };
  const count = (e) => {
    setFilter({ ...filters, count: e });
    // getData({ ...filters, count: e });
  };

  const isAllow = (key = "") => {
    let permissions = user.role?.permissions?.[0];
    let value = permissions?.[key];
    // return true;
    return value;
  };

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data });
      // getData({ search: searchState.data, page: 1 });
    }
  }, []);

  useEffect(() => {
    if (user && user.loggedIn) {
      getOrderDetails();
    }
  }, []);

  return (
    <>
      <Html
        clear={clear}
        isAllow={isAllow}
        count={count}
        pageChange={pageChange}
        filters={filters}
        setFilter={setFilter}
        filter={filter}
        data={orders}
        total={total}
        hanldeUserChange={handleUserChange}
      />
    </>
  );
};

export default Video;
