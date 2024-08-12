const status=[
  {id:'accepted',name:'Accepted'},
  {id:'rejected',name:'Rejected'},
  {id:'completed',name:'Completed'},
  {id:'pending',name:'Pending'},
]

const shared = {
  check: "contract",
  title: "Contract",
  addTitle: "Contract",
  status:status,
  url: "contract",
  addApi: "contracts/create",
  editApi: "contracts/update",
  detailApi: "contracts/detail",
  listApi: "contracts/listing",
  statusApi: "contracts/update",
  deleteApi: "contracts/delete",
  stafflist : "user/listing"
};

export default shared;
