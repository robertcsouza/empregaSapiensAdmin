import React from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components

import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import { useFormik } from 'formik';
import { Button, Card } from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function CreateUserForm({ onCreateUser }) {

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      repetirSenha: '',
      termos: false,
    },
  });


  return (



    <Card>
      <MDBox pt={6} pb={6} px={6}>
        <MDTypography variant="h6" mt={2} ml={2} mb={6}>Cadastrar um Novo Admin</MDTypography>
        <MDBox component="form" role="form">

          <MDBox mb={2}>
            <MDInput type="text" label="Email" variant="standard" name="email" fullWidth onChange={formik.handleChange}
              value={formik.values.email} />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="password" label="senha Provisório" variant="standard" name="senha" fullWidth onChange={formik.handleChange}
              value={formik.values.senha} />
          </MDBox>
          <MDBox mb={2}>
            <MDInput type="password" label="Repetir Senha Provisória" variant="standard" name="repetirSenha" fullWidth onChange={formik.handleChange}
              value={formik.values.repetirSenha} />
          </MDBox>
          <MDBox mt={3} mb={1} textAlign="center">
            <MDButton variant="gradient" color="info" size="small" onClick={() => { onCreateUser(formik.values); }}>Cadastrar</MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>


  );
}

// Typechecking props for the BasicLayout

export default CreateUserForm;
