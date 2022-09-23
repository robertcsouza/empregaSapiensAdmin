

import { useState, useEffect } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";
//import { Redirect } from "react-router";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/MARK-2.jpg";


import { login } from "slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import MDSnackbar from "components/MDSnackbar";








function Basic() {
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(eval(localStorage.getItem('remember')));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [errorSB, setErrorSB] = useState(false);


  async function Login(e) {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('email', email);
      localStorage.setItem('remember', rememberMe);

    } else {
      localStorage.setItem('email', '');
      localStorage.setItem('remember', rememberMe);
    }

    const result = await dispatch(login({ email, password }))



    if (!!result.payload.token) {
      if (result.payload.isAdmin === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }
    } else {
      openErrorSB();
    }


  }

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Erro Login"
      content="Usuario ou senha Incorreta"
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    <BasicLayout image={bgImage}>
      {renderErrorSB}
      <MDBox mt={10}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="warning"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >

          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 3 }}>

            <Grid item xs={4}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                Entrar
              </MDTypography>
            </Grid>

          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" onSubmit={Login} role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Email" onChange={(event) => { setEmail(event.target.value) }} value={email} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Senha" onChange={(event) => { setPassword(event.target.value) }} fullWidth />
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
                &nbsp;&nbsp;Lembrar
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>

              <MDButton variant="gradient" type="submit" color="warning" fullWidth onClick={() => { Login() }}>
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mb={1} textAlign="start">
              <MDTypography variant="button" color="text">

                <MDTypography
                  component={Link}
                  to="/reset"
                  variant="caption"
                  color="warning"
                  fontWeight="medium"
                  textGradient
                >
                  Esqueci minha senha
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ainda Não possui uma conta ?{" "}
                <MDTypography
                  component={Link}
                  to="/cadastro"
                  variant="button"
                  color="warning"
                  fontWeight="medium"
                  textGradient
                >
                  Cadastre-se
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      </MDBox>
    </BasicLayout>
  );
}

export default Basic;
