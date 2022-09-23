import React, { Component } from 'react';

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


import { useFormik } from 'formik';
import { Button } from "@mui/material";
import { useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MDAvatar from 'components/MDAvatar';
import lgpdUrl from 'service/lgpdUrl';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function CreateUserForm({ onCreateUser }) {
  const [open, setOpenDialog] = React.useState(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const backgroundImage = "";

  const formik = useFormik({
    initialValues: {
      email: '',
      senha: '',
      repetirSenha: '',
      termos: false,
    },
  });


  return (



    <MDBox pt={6} pb={6} px={6}>

      <MDBox component="form" role="form">
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Termo de aceite"}</DialogTitle>
          <DialogContent>


          </DialogContent>
          <DialogActions>
            <Button onClick={() => { handleClose(); }}>Sair</Button>

          </DialogActions>
        </Dialog>

        <MDBox
          position="absolute"
          width="100%"
          minHeight="100vh"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              backgroundImage &&
              `${linearGradient(
                rgba(gradients.dark.main, 0.6),
                rgba(gradients.dark.state, 0.6)
              )}, url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />

        <MDBox mb={2}>
          <MDInput type="text" label="Email" variant="standard" name="email" fullWidth onChange={formik.handleChange}
            value={formik.values.email} />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="senha" variant="standard" name="senha" fullWidth onChange={formik.handleChange}
            value={formik.values.senha} />
        </MDBox>
        <MDBox mb={2}>
          <MDInput type="password" label="Repetir Senha" variant="standard" name="repetirSenha" fullWidth onChange={formik.handleChange}
            value={formik.values.repetirSenha} />
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1} sx={{ width: "30" }}>
          <Checkbox onChange={(event) => { formik.setFieldValue('termos', !formik.values.termos); }} checked={formik.values.termos} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Aceitar os &nbsp;
          </MDTypography>
          <a href={lgpdUrl} target="_blank" rel="noreferrer">
            <MDButton >
              <MDTypography
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Termos e condições
              </MDTypography>
            </MDButton>
          </a>



        </MDBox>

        <MDBox mt={3} mb={1} textAlign="center">
          <MDButton variant="gradient" color="info" size="small" onClick={() => { onCreateUser(formik.values); }}>Cadastrar</MDButton>
        </MDBox>
        <MDBox mt={3} mb={1} textAlign="center">
          <MDTypography variant="button" color="text">
            Já tem uma conta ?{" "}
            <MDTypography
              component={Link}
              to="/"
              variant="button"
              color="info"
              fontWeight="medium"
              textGradient
            >
              fazer Login
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>


  );
}

// Typechecking props for the BasicLayout

export default CreateUserForm;