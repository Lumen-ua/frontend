import {
  FiHome,
  FiBriefcase,
  FiZap,
  FiTool,
  FiFile,
  FiCreditCard,
  FiUser,
  FiPlayCircle,
} from "react-icons/fi";

export const NAV_ITEMS = [
  { to: "/", label: "Головна", icon: FiHome, end: true },
  { to: "/budget", label: "Бюджет та рахунки", icon: FiBriefcase },
  { to: "/energy", label: "Економія та енергоефективність", icon: FiZap },
  { to: "/repairs", label: "Ремонт та звернення", icon: FiTool },
  { to: "/legal", label: "Правові аспекти", icon: FiFile },
  { to: "/payments", label: "Оплата комунальних послуг", icon: FiCreditCard },
  { to: "/profile", label: "Профіль", icon: FiUser },
  { to: "/simulations", label: "Симуляції", icon: FiPlayCircle },
];