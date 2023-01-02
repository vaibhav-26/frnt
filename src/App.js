import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import { AuthProvider } from "./components/Auth";
import RequireAuth from "./components/RequireAuth";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import MultiFactorAuthentication from "./Pages/Login/MultiFactorAuthentication";
import "./app.scss";
import AllSkills from "./Pages/Skills/AllSkills";
import MySkills from "./Pages/Skills/MySkills";
import TeamSkills from "./Pages/Skills/TeamSkills";
import Team from "./Pages/Team/Team";
import Report from "./Pages/Report/Report";
import Users from "./Pages/User/Users";
import AddSkill from "./Pages/Skills/AddSkill";
import EditSkill from "./Pages/Skills/EditSkill";
import AddUser from "./Pages/User/AddUser";
import EditUser from "./Pages/User/EditUser";
import Layouts from "./Layouts";
import Root from "./components/Root";
// import Layout from "./components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layouts />,
    children: [
      {
        path: "/skills",
        element: <MySkills />,
      },
      { path: "/skills/all", element: <AllSkills /> },
      { path: "/skills/add", element: <AddSkill /> },
      { path: "/skills/edit/:id", element: <EditSkill /> },
      { path: "/skills/team", element: <TeamSkills /> },
      { path: "/team", element: <Team /> },
      { path: "/report", element: <Report /> },
      { path: "/users", element: <Users /> },
      { path: "/users/add", element: <AddUser /> },
      { path: "/users/edit/:id", element: <EditUser /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/auth",
    element: <MultiFactorAuthentication />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
