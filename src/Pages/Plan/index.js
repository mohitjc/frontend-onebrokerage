import { useEffect, useState } from 'react';
import ApiClient from '../../methods/api/apiClient';
// import './style.scss';
import loader from '../../methods/loader';
import Html from './html';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import environment from '../../environment';
import { toast } from 'react-toastify';
import crendentialModel from '../../models/credential.model';

const Plans = (p) => {
  const user = crendentialModel.getUser()
  const searchState = {data:''};
  const [filters, setFilter] = useState({ page: 1, count: 50, search: '' })
  const [data, setData] = useState([])
  const [tab, setTab] = useState('list')
  const [total, setTotal] = useState(0)
  const [loaging, setLoader] = useState(true)
  const [cardsData, setcardsaData] = useState()
  const [activeplan, setActiveplan] = useState()
  const history = useNavigate()
  const [pricing, setpricing] = useState()
  const [appliedcurrency, setappliedcurrency] = useState()
  const [currencyiso, setcurrencyiso] = useState('aud')
  const [features, setFeatures] = useState()
  const [interval, setInterval] = useState(1)

  useEffect(() => {
    getCards()
    getappliedcurrency()
    getFeatures()
  }, [])

  useEffect(() => {
    if (user && user.loggedIn) {
      setFilter({ ...filters, search: searchState.data })
      getData({ search: searchState.data, page: 1 })
    }
  }, [])

  const getactivePlan = () => {
    let filter={};
    if(user?.subRole?.id==environment.SubRolePartner){
      filter = { id :user.id||user?._id}
    }else{
      filter={}
    }
    ApiClient.get('api/my/plan', filter).then(res => {
      if (res.success) {
        setActiveplan(res.data)
        let userDetail = {}
        let userData = {}
        if (user?._id) {
          ApiClient.get(`api/user/profile`, { id: user?._id }).then(response => {
            if (response.success) {
              userData = response.data
              setcurrencyiso(userData?.subscription_currency || 'aud')
              if (res?.data?.isActive) {
                userDetail = { ...userData, subscriptionId: res?.data?.subscriptionId, subRole: { ...userData.subRole, id: userData?.subRole?._id } }
              } else {
                userDetail = { ...userData, subscriptionId: '',subRole:{...userData.subRole,id:userData?.subRole?._id} }
              }
              crendentialModel.setUser(userDetail)
            }
          })
        }
      }
    })
  }

  const getFeatures = () => {
    ApiClient.get('api/grouped/features', { page: 1, count: 100, status: 'active' }).then(res => {
      if (res.success) {
        setFeatures(res.data)
      }
    })
  }

  const getData = (p = {}) => {
    getactivePlan()
    setLoader(true)
    let filter = { ...filters, ...p }
    loader(true)

    const response=(res)=>{
      if (res.success) {
        setData(res.data.map(itm => {
          itm.id = itm._id
          return itm
        }))
        setTotal(res.total)
      }
      loader(false)
      setLoader(false)
    }

    ApiClient.get('api/plan/list',filter).then(response)
  }


  const clear = () => {
    setFilter({ ...filters, search: '', page: 1 })
    getData({ search: '', page: 1 })
  }

  const filter = (p = {}) => {
    setFilter({ ...filters, page: 1, ...p })
    getData({ page: 1, ...p })
  }

  const reset = () => {
    let p = {
      interval: '',
      currencyId: ''
    }
    setFilter({ ...filters, page: 1, ...p })
    getData({ page: 1, ...p })
  }


  const deleteItem = (id) => {
    if (window.confirm("Do you want to delete this")) {
      loader(true)
      ApiClient.delete('', { id: id }).then(res => {
        if (res.success) {
          toast.success(res.message)
          clear()
        }
        loader(false)
      })
    }
  }

  const exportCsv = () => {
    loader(true)
    ApiClient.get('user/csv').then(res => {
      if (res.success) {
        let url = res.path
        let downloadAnchor = document.getElementById("downloadJS")
        downloadAnchor.href = url
        downloadAnchor.click()
      }
      loader(false)
    })
  }

  const isChecked = (item, fitm) => {
    let value = false
    if (item.feature) {
      Object.keys(item.feature).map(oitm => {
        let farr = item.feature[oitm]
        let ext = farr.find(itm => itm.id == fitm.id)
        if (ext?.checked) value = true
      })
    }
    return value
  }

  const changeInterval = (p) => {
    setInterval(p)
  }

  const getPrice = (p) => {
    let value = 0
    let intervalKey = 'monthlyPrice'
    if (interval == 1) intervalKey = 'monthlyPrice'
    if (interval == 3) intervalKey = 'threeMonthPrice'
    if (interval == 6) intervalKey = 'sixMonthPrice'
    if (interval == 12) intervalKey = 'yearlyPrice'

    value = p?.[intervalKey]?.[currencyiso] || 0
    return Number(value)
  }

  const exportfun = async () => {
    const token = await localStorage.getItem("token");
    const req = await axios({
      method: "get",
      url: `${environment.api}`,
      responseType: "blob",
      body: { token: token }
    });
    var blob = new Blob([req.data], {
      type: req.headers["content-type"],
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `Plans.xlsx`;
    link.click();
  }

  const getCards = () => {
    ApiClient.get(`api/cards/listing`).then(res => {
      if (res.success) {
        setcardsaData(res.data)
      }
    })
  }

  const setprimary = (id) => {
    if (window.confirm(`Do you want to set this card primary`)) {
      ApiClient.put(`api/primary/card`, { card_id: id }).then(res => {
        getCards()
      })
    }
  }

  const getplandetails = (p) => {
    if (!currencyiso) {
      toast.error('Please Select Currency.')
      return
    }
    else {
      let price = getPrice(p)
      if (!price) {
        toast.error('Please Select Another Currency.')
        return
      }
      if (!user?.trial_ended && !user?.on_trial) {
        let payload = {
          customer:user._id,
          planId: p.id,
          planType: 'month',
          planInterval: interval,
          subscription_currency: currencyiso,
          stripe_price_id: p?.pricing.find(item => item?.interval_count == interval && item?.currency == currencyiso.toLowerCase()).stripe_price_id
        }
        setLoader(true)
        ApiClient.post(`api/purchase/plan`, payload).then(res => {
          if (res.success) {
            let UserDetail = { ...user, on_trial: true }
            crendentialModel.setUser(UserDetail)
            history('/pos')
          }
          setLoader(false)
        })
      } else {
        history(`detailcards/${p.id}/${interval}/${currencyiso}`)
      }
    }
  }

  const addcard = () => {
    document.getElementById("closePaymentModal").click()
    history("/cards/add")
  }

  const cancelplan = (id) => {
    if (window.confirm('Do you want to cancel this subscription.')) {
      ApiClient.delete(`api/cancel/subscription`, { id: id }).then(res => {
        if (res.success) {
          getData();
        }
      })
    }
  }

  const getappliedcurrency = () => {
    ApiClient.get('api/currency/applied?page=1&count=100&status=active').then(res => {
      if (res.success) {
        setappliedcurrency(res.data.map(itm => {
          return { ...itm, id: itm.isoCode.toLowerCase() }
        }))
      }
    })
  }

  return <><Html
    features={features}
    getPrice={getPrice}
    changeInterval={changeInterval}
    filter={filter}
    interval={interval}
    tab={tab}
    isChecked={isChecked}
    activeplan={activeplan}
    addcard={addcard}
    reset={reset}
    deleteItem={deleteItem}
    exportCsv={exportCsv}
    loaging={loaging}
    data={data}
    total={total}
    appliedcurrency={appliedcurrency}
    exportfun={exportfun}
    cardsData={cardsData}
    setprimary={setprimary}
    getplandetails={getplandetails}
    setpricing={setpricing}
    pricing={pricing}
    cancelplan={cancelplan}
    setcurrencyiso={setcurrencyiso}
    currencyiso={currencyiso}
    user={user}
  />
  </>;
};

export default Plans;
