// prop-types is a library for typechecking of props
import { forwardRef, useState } from 'react';
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import MDInput from "components/MDInput";

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
import SnackBarComponent from 'components/SnackBarComponent';

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

import { useSelector, useDispatch } from 'react-redux';
// Billing page components

import InputMask from 'react-input-mask';


import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfessional, deleteProfessional } from 'slices/userSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Information({ id, nome, cargo, empresa, atual, iniciou, saiu, salario, principalAtividade, noGutter }) {
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const user = useSelector(state => state.user);
  const sx = { mt: 2, mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };
  const handleClickOpen = () => {
    setOpen(true);

  };



  const handleClose = () => {
    setOpen(false);
  }

  const closeAlertDialog = () => {
    setOpenAlert(false);
  };
  const openAlertDialog = () => {
    setOpenAlert(true);
  };


  async function update() {

    const professional = {
      cargo: formik.values.cargo,
      empresa: formik.values.empresa,
      atual: formik.values.atual,
      data_inicio: formik.values.data_inicio,
      data_saida: formik.values.atual === '1' ? '' : formik.values.data_saida,
      salario: 0,
      atividades: formik.values.atividades
    }


    const payload = { professional: professional, id: id }

    const response = await dispatch(updateProfessional(payload))

    response.type === "profile/professional/updated/fulfilled" ? openSnack({ type: 'success', title: "Experiencias Profissionais", body: "Experiencias Profissionais atualizadas com sucesso", dateTime: "1 min ago" }) : openSnack({ type: 'error', title: "Experiencias Profissionais", body: "Não foi possivel atualizar as informaçoes", dateTime: "1 min ago" });


    handleClose();
  }

  async function callDelete() {

    const response = await dispatch(deleteProfessional(id))
    response.type === "profile/professional/delete/fulfilled" ? openSnack({ type: 'success', title: "Experiencias Profissionais", body: "Experiencias Profissionais Deletada com sucesso", dateTime: "1 min ago" }) : openSnack({ type: 'error', title: "Experiencias Profissionais", body: "Não foi possivel Deletar as informaçoes", dateTime: "1 min ago" });

  }

  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });

  const formik = useFormik({
    initialValues: {
      cargo: cargo,
      empresa: empresa,
      atual: atual,
      data_inicio: iniciou,
      data_saida: saiu,
      salario: salario,
      atividades: principalAtividade
    },
  });


  return (

    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >


      <MDBox width="100%" display="flex" flexDirection="column">
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {nome}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={openAlertDialog}>
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>

            <MDBox>
              <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle>{"Deletar Experiência Profissional"}</DialogTitle>
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
                <DialogTitle>{"Adicionar Uma nova experiencia"}</DialogTitle>
                <DialogContent>
                  
                    <MDBox >
                      <MDInput variant="outlined" label="Cargo" name="cargo" id="cargo" className="input" sx={sx} onChange={formik.handleChange}
                        value={formik.values.cargo} />
                      <MDInput variant="outlined" label="Empresa" name="empresa" id="empresa" className="input" sx={sx} onChange={formik.handleChange}
                        value={formik.values.empresa} />
                    </MDBox>
                    <MDBox className="container">
                      <FormControl className="radioForm">
                        <FormLabel id="demo-radio-buttons-group-label">Este é seu emprego atual?</FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue={0}
                          onChange={formik.handleChange}
                          value={formik.values.cursando}
                          name="atual">
                          <FormControlLabel value="0" control={<Radio />} label="Não" />
                          <FormControlLabel value="1" control={<Radio />} label="Sim" />
                        </RadioGroup>
                      </FormControl>
                    </MDBox>
                    <MDBox >
                      <InputMask
                        mask="99/9999"
                        id="data_inicio"
                        name="data_inicio"

                        onChange={formik.handleChange}
                        value={formik.values.data_inicio}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => <MDInput variant="outlined" label="Data de Início (MÊS/ANO)" hint="MM/YYYY" className="input" name="data_inicio" sx={sx} />}
                      </InputMask>

                      {formik.values.atual === '1' ? <div></div> : <InputMask
                        id='data_saida'
                        name="data_saida"
                        mask="99/9999"
                        onChange={formik.handleChange}
                        value={formik.values.data_saida}
                        disabled={false}
                        maskChar=" "
                      >
                        {() => <MDInput variant="outlined" label="Data de Saída (MÊS/ANO)" className="input" name="data_saida" sx={sx} />}
                      </InputMask>}

                    </MDBox>

                    <MDBox mt={1} mb={1} className="container">
                      <MDInput label="Principais Atividades" multiline rows={5} className="input" id="atividades"
                        onChange={formik.handleChange}
                        value={formik.values.atividades} name="atividades" sx={sxTextArea} />
                    </MDBox>
                  
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Sair</Button>
                  <Button onClick={update}>Salvar</Button>
                </DialogActions>
              </Dialog>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleClickOpen}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Empresa:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {empresa}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Cargo:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {cargo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Período:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              Início : {iniciou} Finalizou: {saiu}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Principal Atividade:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {principalAtividade}
            </MDTypography>
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Information.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Information.propTypes = {
  nome: PropTypes.string,
  cargo: PropTypes.string,
  empresa: PropTypes.string,
  iniciou: PropTypes.string,
  saiu: PropTypes.string,
  salario: PropTypes.number,
  principalAtividade: PropTypes.string,
  noGutter: PropTypes.bool,
};

export default Information;