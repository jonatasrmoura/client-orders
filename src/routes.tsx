import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./app/Layout ";
import { OrdersPage } from "./app/OrdersPage";
import { NewOrderPage } from "./app/NewOrderPage";
import { OrderDetailPage } from "./app/OrderDetailPage";
import { ErrorPage } from "./app/ErrorPage";
import { UpdateOrderPage } from "./app/UpdateOrderPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrdersPage />,
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <OrdersPage />,
          },
          {
            path: "new",
            element: <NewOrderPage />,
          },
          {
            path: ":id",
            element: <OrderDetailPage />,
          },
          {
            path: "update/:id",
            element: <UpdateOrderPage />,
          },
        ],
      },
    ],
  },
]);
