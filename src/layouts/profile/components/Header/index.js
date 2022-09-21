

import { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { Avatar } from "@mui/material";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";

import { useSelector, useDispatch } from "react-redux";

import { updateStudentImage } from "slices/userSlice";
import baseURL from "service/baseUrl";

function Header({ children }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const dispatch = useDispatch()

  let image = "";
  let name = ""

  const user = useSelector(state => state.user)
  console.log(user)
  if (user.status === "sucess") {
    image = `${baseURL}${user.profile.thumbnail}`
    name = user.profile.nome
  }

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  async function handleUploadImage(event) {
    //console.log(event.target.files)
    await dispatch(updateStudentImage(event.target.files[0]));

  }

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDBox display="flex">
              {!image ? <div></div> : <Avatar size="xxl" src={image} sx={{
                backgroundSize: "cover",
                backgroundPosition: "50%",
                overflow: "hidden",
              }}
                alt="profile-image" shadow="sm" />}

              <IconButton color="text" aria-label="upload picture" component="label">
                <input hidden accept="image/*" type="file" onChange={handleUploadImage} />
                <Tooltip title="Alterar Imagem" placement="top">
                  <EditIcon />
                </Tooltip>

              </IconButton>
            </MDBox>
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {name}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                RA {user.profile.ra} / {user.profile.curso}
              </MDTypography>
            </MDBox>
          </Grid>

        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string
};

export default Header;
