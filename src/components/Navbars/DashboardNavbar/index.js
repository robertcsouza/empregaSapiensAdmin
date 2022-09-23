import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import Breadcrumbs from "components/Breadcrumbs";
import NotificationItem from "components/Items/NotificationItem";
import { Badge } from "@mui/material";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "components/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

import { useSelector } from "react-redux";

import baseURL from "service/baseUrl";
import { loadAlerts, deleteAlerts } from "slices/alertSlice";
import { load } from "slices/userSlice";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import MDTypography from "components/MDTypography";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const alerts = useSelector(state => state.alerts);
  const dispatchSlice = useDispatch();
  useEffect(() => {
    async function load() {
      await dispatchSlice(loadAlerts());
    }
    load();
    setNavbarType("static");
  }, []);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  let navigate = useNavigate();
  const profile = useSelector(state => state.user.company);

  function deleteAlerta(id) {

    dispatchSlice(deleteAlerts(id))
  }

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      {alerts.alerts.data.length === 0 ? <MDTypography variant="caption">Não há notificações</MDTypography> : alerts.alerts.data.map((item, index) => {
        return <NotificationItem key={index} icon={<Icon>email</Icon>} title={item.title} message={item.message} data={item.created_at} call={() => { deleteAlerta(item.id) }} route={"/vagas"} />
      })}

    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  async function logout() {
    await sessionStorage.setItem('token', '');
    navigate('/');
  }
  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>

            <MDBox color={light ? "white" : "inherit"}>
              {!!profile ?
                <Link to="/profile">
                  <IconButton sx={navbarIconButton} size="small" disableRipple>
                    <MDAvatar src={`${baseURL}${profile.data.thumbnail}`} alt="Profile" size="sm" />
                  </IconButton>
                </Link>
                : <Link to="/authentication/sign-in/basic">
                  <IconButton sx={navbarIconButton} size="small" disableRipple>
                    <Icon sx={iconsStyle}>account_circle</Icon>
                  </IconButton>
                </Link>}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                {alerts.status === 'sucess' && alerts.alerts.data.length > 0 ? <Badge badgeContent={alerts.alerts.data.length} color="info">
                  <Icon sx={iconsStyle}>notifications</Icon>
                </Badge> : <Icon sx={iconsStyle}>notifications</Icon>}

              </IconButton>
              {alerts.status === 'sucess' ? renderMenu() : null}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={() => { logout(); }}
              >
                <LogoutIcon sx={iconsStyle}></LogoutIcon>
              </IconButton>
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
