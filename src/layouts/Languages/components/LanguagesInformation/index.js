import * as React from 'react';
// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
// import MDButton from "components/MDButton";

//import for dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MDSnackbar from "components/MDSnackbar";

import { useSelector, useDispatch } from 'react-redux';
// Billing page components

import InputMask from 'react-input-mask';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfessional, createProfessional, createLanguages } from 'slices/userSlice';

// Billing page components
import Transaction from "../LanguagesInfo";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LanguagesInformation() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = React.useState(false);

  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });


  const formik = useFormik({
    initialValues: {
      nivel: '',
      idioma: ''
    },
  });

  async function create() {

    const response = await dispatch(createLanguages(formik.values))

    response.type === "profile/languages/create/fulfilled" ? openSuccessSB() : openErrorSB();

    formik.setValues({
      nivel: '',
      idioma: ''
    })
    handleClose();
  }

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


  const languages = user.profile.language

  return (
    <Card sx={{ height: "100%" }} mt={6}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Idioma
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDButton variant="gradient" color="info" onClick={handleClickOpen}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            Adicionar
          </MDButton>
          {renderSuccessSB}
          {renderErrorSB}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Adicionar Um novo Idioma"}</DialogTitle>
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
                      <MenuItem value="Intermediario">Intermediario</MenuItem>
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
              <Button onClick={create}>Salvar</Button>
            </DialogActions>
          </Dialog>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Idiomas
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {languages.map((item) => {
            return (
              <Transaction
                key={item.id}
                id={item.id}
                color="info"
                idioma={item.idioma}
                nivel={item.nivel}
                icon="language"

              />
            )
          })}


        </MDBox>


      </MDBox>
    </Card>
  );
}

export default LanguagesInformation;