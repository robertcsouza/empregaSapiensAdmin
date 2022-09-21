// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import * as React from 'react';

// @mui material components
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
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
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import InputMask from 'react-input-mask';



// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { useFormik } from 'formik';

import { useSelector, useDispatch } from 'react-redux';

import { updateGraduation, deleteGraduation } from 'slices/userSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Information({ id, nivel, curso, instituicao, data_inicio, cursando, data_conclusao, noGutter }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }

  //Nao ta dando muito certo com o Formik
  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const [openAlert, setOpenAlert] = React.useState(false);


  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeAlertDialog = () => {
    setOpenAlert(false);
  };
  const openAlertDialog = () => {
    setOpenAlert(true);
  };

  async function update() {

    const payload = {
      id,
      graduation: formik.values
    }

    const response = await dispatch(updateGraduation(payload))
    response.type === "profile/graduation/updated/fulfilled" ? openSuccessSB() : openErrorSB();
    handleClose();
  }

  async function callDelete() {

    const response = await dispatch(deleteGraduation(id))
    response.type === "profile/graduation/delete/fulfilled" ? openSuccessSB() : openErrorSB();
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
      content="Não Adicionar a Graduação."
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const formik = useFormik({
    initialValues: {
      nivel: nivel,
      curso: curso,
      instituicao: instituicao,
      cursando: cursando,
      data_inicio: data_inicio,
      data_conclusao: data_conclusao
    }
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
      {renderSuccessSB}
      {renderErrorSB}

      <MDBox>
        <Dialog
          open={openAlert}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Deletar Graduação"}</DialogTitle>
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
          <DialogTitle>{"Adicionar Formação Academica"}</DialogTitle>
          <DialogContent>
            
              <MDBox >
                <MDBox mt={1} mb={2} sx={{ minWidth: 200 }}>

                </MDBox>
                <FormControl mt={1} mb={2} sx={{ minWidth: 120, marginRight: 1 }} >
                  <InputLabel id="demo-simple-select-label">Nível</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Nível"
                    name="nivel"
                    sx={{ padding: 1, height: 44 }}
                    onChange={formik.handleChange}
                    value={formik.values.nivel}
                  >
                    <MenuItem value="Ensino Médio">Ensino Médio</MenuItem>
                    <MenuItem value="Técnico">Técnico</MenuItem>
                    <MenuItem value="Graduação">Graduação</MenuItem>
                    <MenuItem value="Pós-graduação">Pós-graduação</MenuItem>
                    <MenuItem value="MBA">MBA</MenuItem>
                    <MenuItem value="Mestrado">Mestrado</MenuItem>
                    <MenuItem value="Doutorado">Doutorado</MenuItem>
                  </Select>
                </FormControl>

                <MDInput variant="outlined" name="curso" label="Curso" className="input" sx={sx} onChange={formik.handleChange}
                  value={formik.values.nivel === 'Ensino Médio' ? 'Ensino Médio' : formik.values.curso} />
              </MDBox>
              <MDBox mt={1} mb={2}>
                <MDInput variant="outlined" label="Instituição" className="input" name="instituicao" sx={sx} onChange={formik.handleChange}
                  value={formik.values.instituicao} />
              </MDBox>
              <MDBox className="container">

                <FormControl className="radioForm">
                  <FormLabel id="demo-radio-buttons-group-label" >Este Cursando ?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"

                    name="cursando"
                    onChange={formik.handleChange}
                    value={formik.values.cursando}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Não" />
                    <FormControlLabel value="1" control={<Radio />} label="Sim" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox >
                <InputMask
                  mask="99/9999"

                  onChange={formik.handleChange}
                  value={formik.values.data_inicio}
                  disabled={false}
                  maskChar=" "
                >
                  {() => <MDInput variant="outlined" label="Data de Início (MÊS/ANO)" name="data_inicio" className="input" sx={sx} />}
                </InputMask>

              </MDBox>
              <MDBox >
                {formik.values.cursando === '1' ? <div></div> : <InputMask
                  mask="99/9999"
                  onChange={formik.handleChange}
                  value={formik.values.data_conclusao}
                  disabled={false}
                  maskChar=" "
                >
                  {() => <MDInput variant="outlined" label="Data de Conclusão (MÊS/ANO)" name="data_conclusao" className="input" sx={sx} />}
                </InputMask>}

              </MDBox>
           
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Sair</Button>
            <Button onClick={update}>Salvar</Button>
          </DialogActions>
        </Dialog>
      </MDBox>

      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {curso}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={openAlertDialog}>
                <Icon>delete</Icon>&nbsp;Deletar
              </MDButton>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleClickOpen}>
              <Icon>edit</Icon>&nbsp;Editar
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            nível:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {nivel}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Instituição:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {instituicao}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          Período:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            Início : {data_inicio} Finalizou: {cursando === 0 ? data_conclusao : 'Cursando'}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}


export default Information;