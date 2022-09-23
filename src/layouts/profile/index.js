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

import auth from '../../service/auth'

import { useSelector, useDispatch } from "react-redux";
import { profile, load } from "slices/userSlice";
import SnackBarComponent from 'components/SnackBarComponent';
import baseURL from 'service/baseUrl';


function Overview() {
  const dispatch = useDispatch();

  // if (profile.id === -1) {
  //   dispatch(load())
  // }
  let navigate = useNavigate();

  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/', { replace: true });
        }

        dispatch(load());

      } catch (error) {

        navigate('/', { replace: true });

      }

    }
    isAuthenticate();

  }, [])

  const status = useSelector(state => state.user.status)
  const company = useSelector(state => state.user.company)
  const [content, setContent] = useState({ 'name': 'information', 'content': <PersonalInformation /> })
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };
  function callSnack(result){
    if(result.payload.status === 200){
      openSnack({ type: 'success', title: "Informações Pessoais", body: "Informações Pessoais Atualizadas com sucesso", dateTime: "1 min ago" });
    }else{
      openSnack({ type: 'error', title: "Informações Pessoais", body: "Nâo foi possivel atualizar as informações", dateTime: "1 min ago" });
    }
    
  }
  function alterContent() {

    if (content.name === 'form') {
      setContent({ 'name': 'information', 'content': <PersonalInformation /> })
    } else {
      setContent({ 'name': 'form', 'content': <PersonalForm callSnack={callSnack} /> })

    }
  }


  if (status === 'sucess' && !!company.data) {

    let empresa = company.data
    

    return (
      <DashboardLayout className="teste">
        <DashboardNavbar />
        <MDBox mb={2} />
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
        <Header name={empresa.nome} responsavel={empresa.responsavel} image={`${baseURL}/${empresa.thumbnail}`}>
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
  } else {
    return <div></div>
  }
}

export default Overview;
