import { useState } from "react";
import { useDispatch } from "react-redux";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useSearchParams } from "react-router-dom";
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";


// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { resetPassword } from "slices/userSlice";
import SnackBarComponent from "components/SnackBarComponent";


function NewPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [password, setPassword] = useState("")
  const [passwordRepeat, setPasswordRepeat] = useState("")
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };
  const dispatch = useDispatch();
  async function send() {
    if (passwordRepeat === password) {
      const result = await dispatch(resetPassword({ email: searchParams.get("email"), hash: searchParams.get("hash"), password }));
      
      if (result.payload.status === 200) {
        openSnack({ type: 'success', title: "Redefinir de senha", body: "Senha alterada com sucesso !", dateTime: "1 min ago" });
        setPassword("");
        setPasswordRepeat("");
      } else {
        openSnack({ type: 'error', title: "Redefinir de senha", body: "Houve algum problema, por favor tente novamente", dateTime: "1 min ago" });
      }
    } else {
      openSnack({ type: 'error', title: "Senha não são iguais", body: "Por favor verifique se as senhas são iguais", dateTime: "1 min ago" });
    }

  }

  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Nova Senha
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1} mx={4}>
            Digite e confirme sua nova senha
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="password" label="Senha" variant="standard" fullWidth onChange={(event) => {
                setPassword(event.target.value)
              }} value={password} />
            </MDBox>
            <MDBox mb={4}>
              <MDInput type="password" label="Repetir Senha" variant="standard" fullWidth onChange={(event) => {
                setPasswordRepeat(event.target.value)
              }} value={passwordRepeat} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={() => {
                send();
              }}>
                Enviar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default NewPassword;
