import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Error from "../pages/Error";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import RecycleBin from "../pages/RecycleBin";
import TaskDetails from "../pages/TaskDetails";
import Tasks from "../pages/Tasks";
import Users from "../pages/Users";

const Routes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "completed/:status",
          element: <Tasks />,
        },
        {
          path: "in-progress/:status",
          element: <Tasks />,
        },
        {
          path: "todo/:status",
          element: <Tasks />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "recycleBin",
          element: <RecycleBin />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "task-details/:id",
          element: <TaskDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
