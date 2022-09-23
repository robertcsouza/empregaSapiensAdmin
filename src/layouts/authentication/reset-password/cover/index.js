import { useState } from "react";
import SnackBarComponent from "components/SnackBarComponent";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useDispatch } from "react-redux";
import { requestReset } from "slices/userSlice";
function Cover() {
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [email, setEmail] = useState("")
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };
  const dispatch = useDispatch();
  async function send() {
    const result = await dispatch(requestReset(email));
    
    if (result.payload.status === 200) {
      openSnack({ type: 'success', title: "Reset de senha", body: "Link enviado para o email, Caso nao apareça na caixa de entrada verifique o spam", dateTime: "1 min ago" });
      setEmail("")
    } else {
      openSnack({ type: 'error', title: "Reset de senha", body: "Houve algum problema, por favor tente novamente", dateTime: "1 min ago" });
    }
  }


  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="warning"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h5" fontWeight="medium" color="white" mt={1}>
            Resetar Senha
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1} p={1}>
            Você Receberá um e-mail nos proximos minutos
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput type="email" label="Email" variant="standard" fullWidth onChange={(event) => {
                setEmail(event.target.value)
              }} value={email} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton variant="gradient" color="warning" fullWidth onClick={send}>
                Enviar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
