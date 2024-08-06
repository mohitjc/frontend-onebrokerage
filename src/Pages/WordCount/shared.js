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
  addApi: "word-count/add",
  editApi: "word-count/update",
  detailApi: "word-count/detail",
  listApi: "word-count/list",
  statusApi: "word-count/update",
  deleteApi: "assignment/delete",
  counterListApi: "counter-offer/listing"
};

export default shared;
