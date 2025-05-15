import {
  LuHandCoins,
  LuLayoutDashboard,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {id: "01", label: "Inicio", icon: LuLayoutDashboard, path: "/inicio"},
  {id: "02", label: "Ingresos", icon: LuWalletMinimal, path: "/ingresos"},
  {id: "03", label: "Gastos", icon: LuHandCoins, path: "/gastos"},
  {id: "06", label: "Salir", icon: LuLogOut, path: "salir"},
];
