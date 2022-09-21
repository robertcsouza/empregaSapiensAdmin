import * as React from 'react';

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import FormControl from '@mui/material/FormControl';

import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MDSnackbar from "components/MDSnackbar";


import { useDispatch } from 'react-redux';
// Billing page components




import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateLanguages, deleteLanguages } from 'slices/userSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Transaction({ color, icon, id, idioma, nivel }) {


  const dispatch = useDispatch();



  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);

  };

  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleClose = () => {
    setOpen(false);
  }

  const closeAlertDialog = () => {
    setOpenAlert(false);
  };
  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Atualização de Perfil"
      content="Informações Atualizadas com sucesso"
      dateTime="Agora"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Atualização Perfil"
      content="Não foi possivel atualizar as informações."
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  async function update() {

    const payload = { language: formik.values, id: id }

    const response = await dispatch(updateLanguages(payload))

    response.type === "profile/languages/updated/fulfilled" ? openSuccessSB() : openErrorSB();

    handleClose();
  }

  async function callDelete() {

    const response = await dispatch(deleteLanguages(id))
    response.type === "profile/languages/delete/fulfilled" ? openSuccessSB() : openErrorSB();

  }

  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });


  const formik = useFormik({
    initialValues: {
      nivel: nivel,
      idioma: idioma
    },
  });


  return (
    <MDBox key={idioma} component="li" py={1} pr={2} mb={1}>
      {renderSuccessSB}
      {renderErrorSB}
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>
            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "regular" }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              {idioma}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {nivel}
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox>
          <Dialog
            open={openAlert}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Deletar Idioma"}</DialogTitle>
            <DialogContent>

                <MDBox>
                  Tem Certeza que deseja Deletar ?
                </MDBox>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={closeAlertDialog}>Não</Button>
              <Button onClick={callDelete}>Sim</Button>
            </DialogActions>
          </Dialog>
        </MDBox>
        <MDBox mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
          <MDBox mr={1}>
            <MDButton variant="text" color="error" onClick={openAlertDialog}>
              <Icon>delete</Icon>&nbsp;Deletar
            </MDButton>
          </MDBox>
          <MDButton variant="text" color={"dark"} onClick={handleClickOpen}>
            <Icon>edit</Icon>&nbsp;Editar
          </MDButton>
        </MDBox>

        <MDBox>

          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Adicionar Um novo idioma"}</DialogTitle>
            <DialogContent>
              
                <MDBox >
                  <FormControl mt={4} mb={2} sx={{ minWidth: 120, marginRight: 1, marginTop: 2 }} >
                    <InputLabel id="demo-simple-select-label">Nível</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Nível"
                      name="nivel"
                      onChange={formik.handleChange}
                      value={formik.values.nivel}
                      sx={{ padding: 1, height: 44 }}

                    >
                      <MenuItem value="Básico">Básico</MenuItem>
                      <MenuItem value="Intermediario">Intermediário</MenuItem>
                      <MenuItem value="Avançado">Avançado</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl mt={1} mb={2} sx={{ minWidth: 120, marginRight: 1, marginTop: 2 }} >
                    <InputLabel id="demo-simple-select-label">Idioma</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"

                      label="Idioma"
                      name="idioma"
                      onChange={formik.handleChange}
                      value={formik.values.idioma}
                      sx={{ padding: 1, height: 44 }}

                    >
                      <MenuItem value="Inglês">Inglês</MenuItem>
                      <MenuItem value="Espanhol">Espanhol</MenuItem>
                      <MenuItem value="Francês">Francês</MenuItem>
                      <MenuItem value="Alemão">Alemão</MenuItem>
                      <MenuItem value="Italiano">Italiano</MenuItem>
                      <MenuItem value="Russo">Russo</MenuItem>
                      <MenuItem value="Japonês">Japonês</MenuItem>
                      <MenuItem value="Chinês">Chinês</MenuItem>
                      <MenuItem value="Sueco">Sueco</MenuItem>
                      <MenuItem value="Português">Português</MenuItem>
                    </Select>
                  </FormControl>
                </MDBox>

              
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Sair</Button>
              <Button onClick={update}>Salvar</Button>
            </DialogActions>
          </Dialog>

        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Typechecking props of the Transaction
//color, icon, name, instituicao, duracao,conclusao
Transaction.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  idioma: PropTypes.node,
  nivel: PropTypes.string,
  conclusao: PropTypes.string,
  icon: PropTypes.node,
};

export default Transaction;
