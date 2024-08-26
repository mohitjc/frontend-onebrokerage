import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Layout from '../../../components/global/layout';
import ApiClient from '../../../methods/api/apiClient';
import loader from '../../../methods/loader';
import './style.scss';
import { useSelector } from 'react-redux';
import moment from 'moment';

const RoleDetail = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const { id, userId } = useParams();
    const [data, setData] = useState();

    const getDetail = () => {
        loader(true);
        ApiClient.get(`plan`, { id: id }).then(res => {
            if (res.success) {
                setData(res.data);
            }
            loader(false);
        });
    };

    const back = () => {
        navigate(-1);
    };

    useEffect(() => {
        getDetail(userId ? userId : id);
    }, [id, userId]);

    return (
        <Layout>
            <div className="text-right">
                <div>
                    <a href="#" onClick={back}>
                        <i className="fa fa-arrow-left mr-4 mb-3" title='Back' aria-hidden="true"></i>
                    </a>
                </div>
            </div>
          
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12">
                    <div className="shadow-box overflow-hidden rounded-lg bg-white gap-4 shrink-0">
                        <div className="grid grid-cols-12 p-4">
                            <div className="col-span-6 flex items-center mb-4">
                                <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Name:</label>
                                <p className="text-[14px] text-black font-medium ms-3">
                                    {data && data.name}
                                </p>
                            </div>
                            <div className="col-span-6 flex items-center mb-4">
                                <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Created At:</label>
                                <p className="text-[14px] text-black font-medium ms-3">
                                    {data && moment(data.createdAt).format('DD-MM-YYYY')}
                                </p>
                            </div>
                            <div className="col-span-6 flex items-center mb-4">
                                <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Pricing:</label>
                                <div className="text-[14px] text-black font-medium ms-3">
                                    {data && data.pricing.map((price, index) => (
                                        <div key={index} className="mb-2">
                                            <p>{`${price.interval_count} ${price.interval} - ${price.unit_amount}`}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="col-span-6 flex items-center mb-4">
                                <label className="text-[14px] text-[#0000009c] tracking-wider w-[160px]">Features:</label>
                                <ul className="text-[14px] text-black font-medium ms-3">
                                    {data && data.featureDetails.map((feature, index) => (
                                        <li key={index} className="mb-2">{feature?.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RoleDetail;
