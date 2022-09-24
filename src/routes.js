// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";

import SignIn from "layouts/authentication/sign-in";


// @mui icons
import Icon from "@mui/material/Icon";
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import NewPassword from "layouts/authentication/reset-password/newPassword";
import CompaniesPending from "layouts/companiesPending";
import CreateUser from "layouts/createUser";
import Cover from "layouts/authentication/reset-password/cover";

const routes = [
  {
    key: "sign-in",
    route: "/",
    component: <SignIn />,
  },

  {
    key: "reset-password",
    route: "/reset",
    component: <Cover />,
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
    name: "Aprovar Empresa",
    key: "companies",
    icon: <ApartmentIcon />,
    route: "/companies",
    component: <CompaniesPending />,
  },
  {
    type: "collapse",
    name: "Criar Usuário",
    key: "users",
    icon: <PeopleIcon />,
    route: "/users",
    component: <CreateUser />,
  },







];

export default routes;
