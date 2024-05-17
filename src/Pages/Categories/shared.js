const types = [
  { id: "product", name: "Product" },
  { id: "faq", name: "FAQ" },
];

const shared = {
  check: "Categories",
  title: "Categories",
  addTitle: "Category",
  url: "category",
  types: [...types],
  addApi: "category/add",
  editApi: "category/update",
  detailApi: "category/detail",
  listApi: "category/listing",
  statusApi: "category/update",
  deleteApi: "category/delete",
};

export default shared;
