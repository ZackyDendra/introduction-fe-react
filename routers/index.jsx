import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import path from "path";
import CategorizedMenu from "../pages/CategorizedMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  path:"/CategorizedMenu",
  element: <CategorizedMenu/>,
  {
    path: "/menu",
    element: <>Menu</>,
  },
]);

export default router;