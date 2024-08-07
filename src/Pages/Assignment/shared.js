const status=[
  {id:'accepted',name:'Accepted'},
  {id:'rejected',name:'Rejected'},
  {id:'completed',name:'Completed'},
  {id:'pending',name:'Pending'},
]

const getWordPrice=(word=0,estimates=[])=>{
  let price=0
  estimates.map(itm=>{
    if(word<=itm.wordCount) price=itm.price
  })

  return price
}


const shared = {
  check: "Assignment",
  getWordPrice:getWordPrice,
  title: "Assignment",
  addTitle: "Assignment",
  url: "assignment",
  status:status,
  addApi: "assignment/add",
  editApi: "assignment/update",
  detailApi: "assignment/detail",
  listApi: "assignment/listing",
  statusApi: "user/status/change",
  deleteApi: "assignment/delete",
  counterListApi: "counter-offer/listing"
};

export default shared;
