// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Profile from "layouts/profile"
// @mui icons
import Icon from "@mui/material/Icon";

import NewPassword from "layouts/authentication/reset-password/newPassword";

const routes = [
  {
    key: "sign-in",
    route: "/",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    route: "/cadastro",
    component: <SignUp />,
  },


  {
    key: "reset-password",
    route: "/reset/newpassword/",
    component: <NewPassword />,
  },

  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },



  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },






];

export default routes;
