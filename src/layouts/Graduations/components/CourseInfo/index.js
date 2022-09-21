import * as React from 'react';

// prop-types is a library for typechecking of props
import PropTypes, { func } from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MDInput from "components/MDInput";
import InputMask from 'react-input-mask';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createComplement, updateComplement, deleteComplement } from 'slices/userSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Transaction({ color, icon, id, curso, instituicao, duracao, conclusao }) {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = React.useState(false);

  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const closeAlertDialog = () => {
    setOpenAlert(false);
  };
  const openAlertDialog = () => {
    setOpenAlert(true);
  };



  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });


  const formik = useFormik({
    initialValues: {
      curso: curso,
      instituicao: instituicao,
      duracao: duracao,
      data_conclusao: conclusao
    },
  });

  async function create() {

    const response = await dispatch(createComplement(formik.values))


    response.type === "profile/complement/create/fulfilled" ? openSuccessSB() : openErrorSB();
   
    formik.setValues({
      curso: '',
      instituicao: '',
      duracao: '',
      data_conclusao: ''
    })

  }

  async function update() {

    const payload = {
      id,
      complement: formik.values
    }

    const response = await dispatch(updateComplement(payload))
    response.type === "profile/complement/updated/fulfilled" ? openSuccessSB() : openErrorSB();
    handleClose();
  }

  async function callDelete() {

    const response = await dispatch(deleteComplement(id))
    response.type === "profile/complement/delete/fulfilled" ? openSuccessSB() : openErrorSB();
    closeAlertDialog()
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

  return (
    <MDBox key={id} component="li" py={1} pr={2} mb={1}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox display="flex" alignItems="center">
          <MDBox mr={2}>

            <MDButton variant="outlined" color={color} iconOnly circular>
              <Icon sx={{ fontWeight: "bold" }}>{icon}</Icon>
            </MDButton>
          </MDBox>
          <MDBox display="flex" flexDirection="column">
            <MDTypography variant="button" fontWeight="medium" gutterBottom>
              {curso}
            </MDTypography>
            <MDTypography variant="caption" color="text" fontWeight="regular">
              {instituicao} {duracao} horas Concluido em: {conclusao}
            </MDTypography>
          </MDBox>
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
      </MDBox>
      <MDBox>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Deletar Curso Complementar"}</DialogTitle>
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
      <MDBox>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Editar curso complementar"}</DialogTitle>
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
            <Button onClick={update}>Salvar</Button>
          </DialogActions>
        </Dialog>
        {renderSuccessSB}
        {renderErrorSB}
      </MDBox>
      <MDBox>
      </MDBox>
    </MDBox>
  );
}


export default Transaction;
