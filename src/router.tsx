import type { RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import FountList from "./pages/FountList";
import FountDetail from "./pages/FountDetail";
import InviteList from "./pages/InviteList";
import InviteDetail from "./pages/InviteDetail";
import ReceiptList from "./pages/ReceiptList";
import ReceiptDetail from "./pages/ReceiptDetail";
import AdminLayout from "./layouts/AdminLayout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "founts", element: <FountList /> },
      { path: "founts/:id", element: <FountDetail /> },
      { path: "invites", element: <InviteList /> },
      { path: "invites/:id", element: <InviteDetail /> },
      { path: "receipts", element: <ReceiptList /> },
      { path: "receipts/:id", element: <ReceiptDetail /> }
    ]
  }
];
// Central route definitions placeholder.
