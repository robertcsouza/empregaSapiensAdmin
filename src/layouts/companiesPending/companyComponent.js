import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";



import auth from '../../service/auth'
import ListCompanies from "./components/ListCompanies";
import { listCompaniesPending } from "slices/companySlice";


function CompanyComponent() {

  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/');
        }

        dispatch(listCompaniesPending());

      } catch (error) {

        navigate('/');

      }

    }
    isAuthenticate();



  }, [])





  return (
    <MDBox mb={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <ListCompanies />
        </Grid>

      </Grid>
    </MDBox>
  );
}

export default CompanyComponent;
