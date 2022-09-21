import * as React from 'react';
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
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import MDSnackbar from "components/MDSnackbar";

import { useSelector, useDispatch } from 'react-redux';
import { createGraduation } from 'slices/userSlice';

import { useFormik } from 'formik';
import * as yup from 'yup';

//import masked 
import InputMask from 'react-input-mask';

// Billing page components
import Information from "../Information";
import { Formik } from 'formik';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function ProfessionalInformation() {
  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = React.useState(false);


  //Nao ta dando muito certo com o Formik

  const [nivel, setNivel] = React.useState('');
  const [curso, setCurso] = React.useState('');
  const [instituicao, setInstituicao] = React.useState('');
  const [cursando, setCursando] = React.useState(false);
  const [data_inicio, setDataInicio] = React.useState('');
  const [data_conclusao, setDataConclusao] = React.useState('');

  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);


  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function create() {

    const payload = {
      nivel,
      curso,
      instituicao,
      cursando,
      data_inicio,
      data_conclusao
    }

    const response = await dispatch(createGraduation(payload))
    response.type === "profile/graduation/create/fulfilled" ? openSuccessSB() : openErrorSB();
    handleClose();
    setNivel('')
    setCurso('');
    setInstituicao('');
    setCursando(false);
    setDataInicio('');
    setDataConclusao('');
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

  function handleNivel(nivelProp) {
    if (nivelProp === 'Ensino Médio') {
      setNivel(nivelProp);
      setCurso('Ensino Médio')
    } else {
      setNivel(nivelProp);
      setCurso('');
    }
  }

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


  const informations = user.profile.graduation
  //nivel, curso, instituicao, iniciou, concluiu,cursando, 
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Formação acadêmica
        </MDTypography>
        <MDButton variant="gradient" color="warning" onClick={handleClickOpen}>
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
                    sx={{ padding: 1, height: 44 }}
                    onChange={(event) => handleNivel(event.target.value)}
                    value={nivel}
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
                <MDInput variant="outlined" label="Curso" className="input" sx={sx} onChange={(event) => setCurso(event.target.value)}
                  value={curso} />

              </MDBox>
              <MDBox mt={1} mb={2}>
                <MDInput variant="outlined" label="Instituição" className="input" sx={sx} onChange={(event) => setInstituicao(event.target.value)}
                  value={instituicao} />
              </MDBox>
              <MDBox className="container">

                <FormControl className="radioForm">
                  <FormLabel id="demo-radio-buttons-group-label" >Este Cursando ?</FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="nao"
                    name="radio-buttons-group"
                    onChange={(event) => setCursando(event.target.value)}
                    value={cursando}
                  >
                    <FormControlLabel value="0" control={<Radio />} label="Não" />
                    <FormControlLabel value="1" control={<Radio />} label="Sim" />
                  </RadioGroup>
                </FormControl>
              </MDBox>
              <MDBox >
                <InputMask
                  mask="99/9999"
                  value={data_inicio}
                  onChange={(event) => { setDataInicio(event.target.value) }}
                  disabled={false}
                  maskChar=" "
                >
                  {() => <MDInput variant="outlined" label="Data de Início (MÊS/ANO)" className="input" sx={sx} />}
                </InputMask>

              </MDBox>
              <MDBox >
                {cursando === '1' ? <div></div> : <InputMask
                  mask="99/9999"
                  value={data_conclusao}
                  onChange={(event) => { setDataConclusao(event.target.value) }}
                  disabled={false}
                  maskChar=" "
                >
                  {() => <MDInput variant="outlined" label="Data de Conclusão (MÊS/ANO)" className="input" sx={sx} />}
                </InputMask>}

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
          {informations.map((item) => {

            return (
              // nivel, curso, instituicao, iniciou, concluiu,cursando, 
              <Information
                key={item.id}
                id={item.id}
                nivel={item.nivel}
                curso={item.curso}
                instituicao={item.instituicao}
                data_inicio={item.data_inicio}
                cursando={item.cursando}
                data_conclusao={item.data_conclusao}
              />


            )
          })}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ProfessionalInformation;