import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import PersonalInformation from "./components/PersonalInformation";
import PersonalForm from "./components/personalForm";



// Overview page components
import Header from "layouts/profile/components/Header";
import { Icon } from '@mui/material';
import Tooltip from "@mui/material/Tooltip";
import { UsuarioHK } from '../../hooks/usuario/usuarioHK'
import { HabilidadesHK } from 'hooks/habilidade/habilidadeHk';
import auth from '../../service/auth'

import { useSelector, useDispatch } from "react-redux";
import { profile, load } from 'slices/userSlice';


function Overview() {
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
          navigate('/', { replace: true });
        }

        if (profile.id === -1) {
          usuariohook();
        }
        if (!habilidadesRd) {
          habilidadeshook();
        }

      } catch (error) {

        navigate('/', { replace: true });

      }

    }
    isAuthenticate();
  }, [])


  function alterContent() {

    if (content.name === 'form') {
      setContent({ 'name': 'information', 'content': <PersonalInformation /> })
    } else {
      setContent({ 'name': 'form', 'content': <PersonalForm /> })

    }
  }

  const [content, setContent] = useState({ 'name': 'information', 'content': <PersonalInformation /> })
  return (
    <DashboardLayout className="teste">
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header name="Jhon Doe">
        <MDBox mt={5} mb={3}>

        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Informações Pessoais

            <MDButton variant="text" color="secondary" onClick={() => { alterContent() }}>
              <Tooltip title="Editar" placement="top">
                <Icon>edit</Icon>
              </Tooltip>
            </MDButton>
          </MDTypography>

          {content.content}
        </MDBox>

      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
