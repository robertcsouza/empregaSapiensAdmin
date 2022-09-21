

import { useState, useEffect, forwardRef } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
//import { Redirect } from "react-router";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Slide from '@mui/material/Slide';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/MARK-2.jpg";


import { login } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";




function Basic() {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(eval(localStorage.getItem('remember')));
  const [ra, setRa] = useState(localStorage.getItem('ra'));
  const [password, setPassword] = useState("");
  const [warningSB, setWarningSB] = useState(false);
  const openWarningSB = () => setErrorSB(true);
  const closeWarningSB = () => setWarningSB(false);
  let navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  //confirmatiopn


  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);


  async function Login(e) {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('ra', ra);
      localStorage.setItem('remember', rememberMe);

    } else {
      localStorage.setItem('ra', '');
      localStorage.setItem('remember', rememberMe);
    }

    const result = await dispatch(login({ ra, password }))

    if (!!result.payload.token) {
      navigate('/dashboard')
    } else {
      openErrorSB();
    }


  }

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Error ao Fazer Login"
      content="verifique o usuario ea Senha e tente novamente."
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="warning"
      title="Recuperar senha"
      content="A senha da plataforma é a mesma do portal do aluno, pra resetar a senha procure a cordenação"
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />

  );

  return (
    <BasicLayout image={bgImage}>
      <MDBox mt={6}>
      <form  onSubmit={Login}>
      <Card >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          {renderErrorSB}
          {renderWarningSB}

          
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 3 }}>

            <Grid item xs={4}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                Login
              </MDTypography>
            </Grid>

          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="RA" fullWidth onChange={(event) => { setRa(event.target.value) }} value={ra} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Senha" fullWidth onChange={(event) => { setPassword(event.target.value) }} value={password} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Lembrar RA
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>

              <MDButton variant="gradient" type="submit" color="info" fullWidth onClick={Login}>
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Esqueceu sua Senha?
                <MDButton variant="text" color="info" onClick={openWarningSB} textGradient>Clique Aqui</MDButton>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      </form>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
