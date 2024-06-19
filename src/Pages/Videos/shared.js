const types = [
  { id: "s551sadd51", name: "How to" },
  { id: "634b063e3e4c97eed2d0ab75", name: "History" },
];

const shared = {
  check: "Videos",
  title: "Videos",
  addTitle: "Video",
  url: "videos",
  types: [...types],
  addApi: "video/add",
  editApi: "video/update",
  detailApi: "video/detail",
  listApi: "video/list",
  statusApi: "video/update",
  deleteApi: "video/delete",
};

export default shared;
