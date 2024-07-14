import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import BasicLayout from "./basicLayout";
import MyPhotos from "./pages/my_photos";
import PhotoInformation from "./pages/photoInformation";

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
                      },
                      {   
                        path: "photo/:id",
                        element: <PhotoInformation />
                      }
                  ],
              }
          ],
        },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;