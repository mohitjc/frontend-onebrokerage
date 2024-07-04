const types = [
  { id: "Beginner", name: "Beginner" },
  { id: "Intermediate", name: "Intermediate" },
  { id: "Experienced", name: "Experienced" },
];

const shared = {
  check: "Notifications",
  title: "Notifications",
  addTitle: "Notifications",
  url: "notifications",
  addApi: "notification/add",
  editApi: "notification",
  detailApi: "notification/detail",
  listApi: "notification/list",
  statusApi: "notification/status/change",
  deleteApi: "notification/remove",
  sendNotification: "notifications/send",
  types: [...types],
};

export default shared;
