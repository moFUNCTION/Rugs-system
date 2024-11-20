import { IoAnalyticsOutline } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdPassword, MdQuiz } from "react-icons/md";
import { FaShop } from "react-icons/fa6";
export const TabsValues = [
  {
    title: "Account",
    Icon: CiUser,
    href: "/user",
  },
  {
    title: "Change Password",
    Icon: MdPassword,
    href: "/user",
  },
  {
    title: "Requests",
    Icon: FaShop,
    href: "/chat",
  },
  {
    title: "Analytics",
    Icon: IoAnalyticsOutline,
    href: "/analytics",
  },

  {
    title: "Customers",
    Icon: FaUsers,
  },
];
