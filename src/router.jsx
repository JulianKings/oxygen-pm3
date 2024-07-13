import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import BasicLayout from "./basicLayout";

const Router = () => {
    const router = createBrowserRouter([
      {
        path: "/",
        element: <BasicLayout />,
        children: [
          {
              children: [
                  {index: true, element: <Home />},
              ],
          }
        ],
      },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;