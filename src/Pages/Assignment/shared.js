const status=[
  {id:'accepted',name:'Accepted'},
  {id:'rejected',name:'Rejected'},
  {id:'completed',name:'Completed'},
  {id:'pending',name:'Pending'},
]

const shared = {
  check: "Assignment",
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
