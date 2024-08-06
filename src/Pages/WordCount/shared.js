const status=[
  {id:'accepted',name:'Accepted'},
  {id:'rejected',name:'Rejected'},
  {id:'completed',name:'Completed'},
  {id:'pending',name:'Pending'},
]

const shared = {
  check: "WordCount",
  title: "Word Estimates",
  addTitle: "Word Estimate",
  url: "word-estimate",
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
