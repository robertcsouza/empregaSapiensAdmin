import { forwardRef, useState } from 'react';
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
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

import { useSelector, useDispatch } from 'react-redux';
// Billing page components
import Information from "../Information";

import InputMask from 'react-input-mask';


import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfessional, createProfessional } from 'slices/userSlice';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProfessionalInformation() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = useState(false);

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
  };


  const formik = useFormik({
    initialValues: {
      cargo: '',
      empresa: '',
      atual: '',
      data_inicio: '',
      data_saida: '',
      salario: '',
      atividades: ''
    },
  });

  async function create() {

    const professional = {
      cargo: formik.values.cargo,
      empresa: formik.values.empresa,
      atual: formik.values.atual,
      data_inicio: formik.values.data_inicio,
      data_saida: formik.values.atual === '1' ? '' : formik.values.data_saida,
      salario: 0,
      atividades: formik.values.atividades
    }


    const response = await dispatch(createProfessional(professional))
    //console.log(professional)
    response.type === "profile/professional/create/fulfilled" ? openSnack({ type: 'success', title: "Experiencias Profissionais", body: "Experiencias Profissionais Criada com sucesso", dateTime: "1 min ago" }) : openSnack({ type: 'error', title: "Experiencias Profissionais", body: "Erro ao Crir experiencia", dateTime: "1 min ago" });

    formik.setValues({
      cargo: '',
      empresa: '',
      atual: '0',
      data_inicio: '',
      data_saida: '',
      salario: '',
      atividades: ''
    })
    handleClose();
  }





  const professionalList = user.profile.professional

  //nome, cargo, empresa, iniciou, saiu, salario, principalAtividade
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
        <MDTypography variant="h6" fontWeight="medium">
          Experiências Profissionais
        </MDTypography>
        <MDButton variant="gradient" color="warning" onClick={handleClickOpen}>
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
                    value={formik.values.atual}
                    name="atual">
                    <FormControlLabel value={0} control={<Radio />} label="Não" />
                    <FormControlLabel value={1} control={<Radio />} label="Sim" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox >
                <InputMask
                  mask="99/9999"
                  id='data_saida'
                  onChange={formik.handleChange}
                  value={formik.values.data_inicio}
                  disabled={false}
                  maskChar=" "
                >
                  {() => <MDInput variant="outlined" label="Data de Início (MÊS/ANO)" className="input" sx={sx} name="data_inicio" />}
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
                <MDInput label="Principais Atividades" multiline rows={5} className="input" id="atividades" name="atividades" sx={sxTextArea} onChange={formik.handleChange}
                  value={formik.values.atividades} />
              </MDBox>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Sair</Button>
            <Button onClick={create}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {professionalList.map((item) => {
            return (
              // nome, cargo, empresa, iniciou, saiu, salário, principalAtividade,
              <Information
                key={item.id}
                id={item.id}
                nome={item.cargo}
                cargo={item.cargo}
                empresa={item.empresa}
                atual={item.atual}
                iniciou={item['data_inicio']}
                saiu="04/2022"
                salario={item.salario}
                principalAtividade={item.atividades}
                update={false}
              />

            )
          })}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProfessionalInformation;