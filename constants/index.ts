export const navItems = [
    { name:"Dashboard", url:'/'},
    { name:"Documents", url:'/documents'},
    { name:"Media", url:'/media'},
    { name:"User", url:'/user'},
]

export const actionsDropDownItems = [
    { label:"Rename", value:'rename' },
    { label:"Details", value:'details' },
    { label:"Share", value:'share' },
    { label:"Download", value:'download' },
    { label:"Delete", value:'delete' },
]

export const profilePlaceholder = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

export const MAX_FILE_SIZE = 50 * 1024 * 1024

export const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "Name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "Name-desc",
  },
  {
    label: "Size (Highest)",
    value: "Size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "Size-asc",
  },
];