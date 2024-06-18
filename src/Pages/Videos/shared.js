const types = [
  { id: "how", name: "How to" },
  { id: "history", name: "History" },
];

const shared = {
  check: "Videos",
  title: "Videos",
  addTitle: "Video",
  url: "videos",
  types: [...types],
  addApi: "videos/add",
  editApi: "videos/update",
  detailApi: "videos/detail",
  listApi: "videos/listing",
  statusApi: "videos/update",
  deleteApi: "videos/delete",
};

export default shared;
