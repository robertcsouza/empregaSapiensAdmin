
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import LanguagesInformation from "./components/LanguagesInformation";
import Footer from "components/Footer";
import { useEffect } from "react";
import auth from '../../service/auth'

import { Link, useNavigate } from "react-router-dom";
import { load } from "slices/userSlice";
import { useSelector, useDispatch } from "react-redux";



function Languages() {

  let navigate = useNavigate();
  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/');
        }

      } catch (error) {

        navigate('/');

      }

    }
    isAuthenticate();
  }, [])

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile)
  if (profile.id === -1) {
    dispatch(load())
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <LanguagesInformation />
          </Grid>
          <Grid item xs={12} md={6}>

          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Languages;