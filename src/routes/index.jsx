import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Home from '../pages/Home/Home'
import SignIn from "../pages/SignIn/SignIn";
import Signup from "../pages/SignUp/SignUp";
import Quizz from "../pages/Quizzes/Quizz.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    index: true
  },
  {
    path: '/signin',
    element: <SignIn/>
  },
  {
    path: '/signup',
    element: <Signup/>
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/quizz',
        element: <Quizz/>
      }
    ]
  },
  {
    path: '*',
    element: <p>404 Error</p>
  }
]);

const Index = () => {
    return <RouterProvider router={router} />
}

export default Index;
//