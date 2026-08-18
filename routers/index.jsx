import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/menu",
    element: <>Menu</>,
  },
]);

export default router;