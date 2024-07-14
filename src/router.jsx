import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import BasicLayout from "./basicLayout";
import MyPhotos from "./pages/my_photos";

const Router = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <BasicLayout />,
          children: [
              {
                  children: [
                      {index: true, element: <Home />},
                      {   
                          path: "my_photos",
                          element: <MyPhotos />
                      }
                  ],
              }
          ],
        },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;