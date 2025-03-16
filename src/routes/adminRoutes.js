import DashBoard from "../components/dashboard/DashBoard";

import ProductTable from "../components/products/ProductTable";

export const adminRoutes = [
  { path: "/products", element: <ProductTable /> },

  { path: "*", element: <DashBoard /> },
];
