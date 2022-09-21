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
import MDSnackbar from "components/MDSnackbar";
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


import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createComplement, createGraduation } from 'slices/userSlice';

// Billing page components
import Transaction from "../CourseInfo";

import InputMask from 'react-input-mask';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CourseInformation() {
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
      curso: '',
      instituicao: '',
      duracao: 0,
      data_conclusao: ''
    },
  });

  async function create() {

    const response = await dispatch(createComplement(formik.values))

    response.type === "profile/complement/create/fulfilled" ? openSuccessSB() : openErrorSB();
    handleClose()

    formik.setValues({
      curso: '',
      instituicao: '',
      duracao: 0,
      data_conclusao: ''
    })


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


  const graduationList = user.profile.complement
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Cursos Complementares
        </MDTypography>
        {renderSuccessSB}
        {renderErrorSB}
        <MDBox display="flex" alignItems="flex-start">
          <MDButton variant="gradient" color="info" onClick={handleClickOpen}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
            Adicionar
          </MDButton>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Adicionar Um novo Curso complementar"}</DialogTitle>
            <DialogContent>
              
                <MDBox >
                  <MDInput variant="outlined" label="Curso" name="curso" className="input" sx={sx} onChange={formik.handleChange}
                    value={formik.values.curso} />
                  <MDInput variant="outlined" label="Instituição" name="instituicao" className="input" sx={sx} onChange={formik.handleChange}
                    value={formik.values.instituicao} />
                </MDBox>
                <MDBox >
                  <MDInput variant="outlined" label="Duração (HORAS)" name="duracao" className="input" sx={sx} onChange={formik.handleChange}
                    value={formik.values.duracao} />
                  <InputMask
                    mask="99/9999"
                    onChange={formik.handleChange}
                    value={formik.values.data_conclusao}
                    disabled={false}
                    maskChar=" "
                  >
                    {() => <MDInput variant="outlined" label="Data de Conclusão (MÊS/ANO)" name="data_conclusao" className="input" sx={sx} />}
                  </InputMask>

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
            Cursos
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
          {graduationList.map((item) => {
            return (
              <Transaction
              key={item.id}
                color="info"
                icon="architecture"
                id={item.id}
                curso={item.curso}
                instituicao={item.instituicao}
                duracao={item.duracao}
                conclusao={item.data_conclusao}
              />
            )
          })}
        </MDBox>


      </MDBox>
    </Card>
  );
}

export default CourseInformation;