import {
  BiBasket,
  BiCategory,
  BiUser,
  BiMessageSquareDots,
  BiInfoCircle,
} from "react-icons/bi";

export const sidebarlinks = [
  {
    name: "Products",
    link: "/",
    icon: <BiBasket />,
  },
  {
    name: "Categories",
    link: "/categories",
    icon: <BiCategory />,
  },
  {
    name: "Users",
    link: "/users",
    icon: <BiUser />,
  },
  {
    name: "Messages",
    link: "/messages",
    icon: <BiMessageSquareDots />,
  },
  {
    name: "Information",
    link: "/info",
    icon: <BiInfoCircle />,
  },
];
