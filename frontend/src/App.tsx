import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";

import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/quiz/:id",
      element: <Quiz />,
    },
    {
      path: "/result/:id",
      element: <Result />,
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
