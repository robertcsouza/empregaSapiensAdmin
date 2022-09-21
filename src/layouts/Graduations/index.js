import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch,useSelector } from "react-redux";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import GraduationInformation from "./components/GraduationInformation";
import CourseInformation from "./components/CourseInformation";
import Footer from "components/Footer";

import { Link, useNavigate } from "react-router-dom";
import auth from '../../service/auth'

import { UsuarioHK } from '../../hooks/usuario/usuarioHK'
import { SubscriptionHK } from 'hooks/subscription/subscriptionHK';
import { HabilidadesHK } from 'hooks/habilidade/habilidadeHk';

function Graduation() {

  const usuariohook = UsuarioHK();
  const habilidadeshook = HabilidadesHK();
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile)
  const habilidadesRd = useSelector(state => state.habilidades.habilidades);

  let navigate = useNavigate();
  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/');
        }

        if (profile.id === -1) {
          usuariohook();
        }
        if (!habilidadesRd) {
          habilidadeshook();
        }

      } catch (error) {

        navigate('/');

      }

    }
    isAuthenticate();
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
    
    <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
            <GraduationInformation/>
            </Grid>
            <Grid item xs={12} md={6}>
            <CourseInformation/>
            </Grid>
          </Grid>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Graduation;