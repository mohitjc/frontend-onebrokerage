export const rolePermissions = [
  {
    name: "Dashboard",
    key: "Dashboard",
  },
  {
    name: "Staff",
    key: "staff",
  },
  {
    name: "Students",
    key: "Customers",
  },
  {
    name: "Content",
    key: "Content",
  },
  {
    name: "Assignment",
    key: "Assignment",
  },
];

export const rolePermission = [
  { name: "Read", key: "read" },
  { name: "Add", key: "add" },
  { name: "Edit", key: "edit" },
  { name: "Delete", key: "delete" },
];

export const roleGetAllKeys = () => {
  let keys = {};
  rolePermissions.map((itm) => {
    rolePermission.map((pitm) => {
      keys = { ...keys, [`${pitm.key}${itm.key}`]: false };
    });
  });

  return keys;
};

export const userType = {
  id: "",
  fullName: "",
  role: "",
  email: "",
  mobileNo: "",
  aboutUs: "",
  address: "",
  image: "",
  logo: "",
};
export const CategoryType = {
  id: "",
  name: "",
  catType: "",
  subParentCategory: "",
  description: "",
  image: "",
  order: "",
  parentCategory: "",
  status: "active",
  icon: "",
  banner: "",
  altImageName: "",
  altIconName: "",
  bannerOverlayHeading: "",
  bannerOverlayBody: "",
  description: "",
  featured: "No",
  urlKey: "",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};
export const roleType = {
  id: "",
  name: "",
  status: "active",
  permissions: {
    carrier_delete: false,
    carrier_get: false,
    carrier_edit: false,
    carrier_add: false,
    faq_add: false,
    faq_delete: false,
    faq_edit: false,
    faq_get: false,

    load_add: false,
    load_delete: false,
    load_edit: false,
    load_get: false,

    bid_add: false,
    bid_delete: false,
    bid_edit: false,
    bid_get: false,

    board_add: false,
    board_delete: false,
    board_edit: false,
    board_get: false,
    invite_user_get: false,
    dashboard_get:false,
    statistics_get:false,
    performance_matrix_get:false,
    // shipment_note_get: false,
    notes_get: false,
    query_get: false,
    carrier_request_get:false,
    news_letter_get:false,
    notifications_get:false,
    shipment_notes_get:false,
    content_management_get:false,
    // content_management_add:false,
    content_management_edit:false,
    // content_management_delete:false,
    settings_get:false,
    settings_edit:false,
    //  Done
    // readDashboard:false,
    // readContent:false,
    // addContent:false,
    // deleteContent:false,
    // editContent:false,
    // readAssessment:false,
    // addAssessment:false,
    // editAssessment:false,
    //  deleteAssessment:false,
    //  addQuestion:false,
    //  editQuestion:false,
    //  readQuestion:false,
    //  deleteQuestion:false,
    // readRole:false,
    // addRole:false,
    // editRole:false,
    // deleteRole:false,
    // readSkillType:false,
    // addSkillType:false,
    // editSkillType:false,
    // deleteSkillType:false,
    // readAdmins:false,
    // addAdmins:false,
    // editAdmins:false,
    // deleteAdmins:false,
    // readTypes:false,
    // addTypes:false,
    // editTypes:false,
    // deleteTypes:false,
    // readSkills:false,
    // addSkills:false,
    // editSkills:false,
    // deleteSkills:false,
  },
};
export const resellerCategoryType = {
  id: "",
  name: "",
  catType: "Reseller",
  description: "",
  image: "",
};
export const planType = {
  id: "",
  name: "",
  price: "",
  status: "active",
  interval: "Monthly",
  category: "",
  recommended: "",
  allowedProducts: "",
  feature: [],
  monthlyPrice: "",
  threeMonthPrice: "",
  sixMonthPrice: "",
  yearlyPrice: "",
  extraProductPrice: "",
};
export const continentType = { id: "", name: "", status: "active" };
export const featureType = {
  id: "",
  name: "",
  description: "",
  status: "active",
};
export const emailType = { id: "", subject: "", content: "", status: "active" };
export const cityType = {
  id: "",
  name: "",
  status: "active",
  countryId: "",
  regionId: "",
  continent: "",
};
export const bookingSystemType = {
  id: "",
  name: "",
  apiKey: "",
  secretKey: "",
};
export const holidaysType = {
  id: "",
  discOrPre: "",
  name: "",
  type: "",
  country: "",
  counties: "",
  amountOrPercent: "",
  number: "",
  applyFor: [],
  preOrPost: "",
  preDays: "",
  postDays: "",
  changesApply: "",
  changesDate: "",
  changesDateTo: "",
};
export const earlybirdpricingType = {
  id: "",
  name: "",
  discOrPre: "",
  startDate: "",
  country: "",
  counties: "",
  applyEarlyBirdPricing: [],
  endDate: "",
  inventory: [],
  lastMinutePricingFromDate: "",
  lastMinutePricingToDate: "",
  applyPriceType: "",
  changesDate: "",
  changesDateTo: "",
  notApply: "",
  notApplyCondition: "",
  notApplicableFor: [],
  blackOutDates: [],
  amountOrPercent: "",
  number: "",
  applyToDaysTimeSlot: "",
  daysToApply: [],
  timeSlots: [],
};
export const posType = { id: "", name: "", apiKey: "", url: "" };

export const resellerType = {
  id: "",
  name: "",
  logo: "",
  category: "",
  contractDate: "",
  booking: "",
  country: "",
  contactPerson: "",
  contactPhone: "",
  contactEmail: "",
  website: "",
};
export const couponType = {
  id: "",
  title: "",
  status: "active",
  description: "",
  couponCode: "",
  usesPerCoupon: "",
  usesPerCustomer: "",
  dateFrom: "",
  dateTo: "",
  discountType: "",
  discountAmount: "",
};
