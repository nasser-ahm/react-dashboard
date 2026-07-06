import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings } from "lucide-react";

export const menuLinks = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
    id: 1
  },
  {
    name: "Products",
    path: "/Products",
    icon: Package,
    id:2,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingCart,
    id:3
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
    id:4
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
    id:5
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
    id:6
  },
];