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
import { listCompaniesPending } from "slices/companySlice";
import CreateUserForm from "./components/createUserForm";
import SnackBarComponent from "components/SnackBarComponent";
import { adminCreateuser } from "slices/userSlice";



function CreateUser() {

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


  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);

  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };

  function callSnack(result) {
    if (!result.error) {

      openSnack({ type: 'success', title: "Usuário criado com sucesso", body: "Usuário deverá trocar a senha, após o primeiro acesso", dateTime: "1 min ago" });
    } else {

      openSnack({ type: 'error', title: "Erro criar usuário", body: "erro ao cadastrar usuário, por favor verifique as informações", dateTime: "1 min ago" });
    }


  }



  async function addUser(values) {
    if (values.senha !== values.repetirSenha) {
      openSnack({ type: 'error', title: "Senhas não são iguais", body: "As senhas devem Coincidir", dateTime: "1 min ago" });
    } else {
      const result = await dispatch(adminCreateuser({ email: values.email, password: values.senha }))

      callSnack(result);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox mb={3}>
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
        <Grid container spacing={3}>
          <Grid item xs={8} >
            <CreateUserForm onCreateUser={addUser} />
          </Grid>

        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CreateUser;
