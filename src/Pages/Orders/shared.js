const types = [
  { id: "s551sadd51", name: "How to" },
  { id: "634b063e3e4c97eed2d0ab75", name: "History" },
];

const shared = {
  check: "Orders",
  title: "Orders",
  addTitle: "Video",
  url: "orders",
  types: [...types],
  addApi: "video/add",
  editApi: "video/update",
  detailApi: "video/detail",
  listApi: "video/list",
  statusApi: "video/update",
  deleteApi: "video/delete",
};

export default shared;
