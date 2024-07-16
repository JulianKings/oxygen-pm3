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
                      },
                      {   
                        path: "left_photo/:id",
                        element: <PhotoInformation slideProp={'left'} />
                      },
                      {   
                        path: "right_photo/:id",
                        element: <PhotoInformation slideProp={'right'} />
                      }
                  ],
              }
          ],
        },
    ]);
  
    return <RouterProvider router={router} />;
  };
  
  export default Router;