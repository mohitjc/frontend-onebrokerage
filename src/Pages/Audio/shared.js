const types = [
  { id: "how", name: "How to" },
  { id: "history", name: "History" },
];

const shared = {
  check: "Audio",
  title: "Audio",
  addTitle: "Audio",
  url: "audio",
  types: [...types],
  addApi: "audio/add",
  editApi: "audio/update",
  detailApi: "audio/detail",
  listApi: "audio/listing",
  statusApi: "audio/update",
  deleteApi: "audio/delete",
};

export default shared;
