import moment from 'moment';
import { useEffect, useState, forwardRef } from "react";
import { useDispatch } from 'react-redux';
import { candidatarVagas } from 'slices/vagaSlice';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MDSnackbar from "components/MDSnackbar";

import pxToRem from 'assets/theme-dark/functions/pxToRem';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SnackBarComponent from 'components/SnackBarComponent';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArchitectureIcon from '@mui/icons-material/Architecture';


// Images
import team2 from "assets/images/team-2.jpg";

import { useSelector } from "react-redux";
import { Grid, Icon } from '@mui/material';
import { vagas } from 'slices/vagaSlice';
import baseURL from 'service/baseUrl';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogVagas({ vaga, open, handleClose, callSnack }) {
  const dispatch = useDispatch();

  const [openConfirm, setOpenConfirm] = useState(false);

  function stringTipo(tipo) {
    switch (tipo) {
      case "estagio_remunerado":
        return "Estágio Remunerado"
      case "estagio":
        return "Estágio Não Remunerado"
      case "emprego":
        return "Emprego Efetivo"
      default:
        return "";
    }
  }

  async function Candidatar() {
    const result = await dispatch(candidatarVagas(vaga.id));

    handleCloseConfirm();
    handleClose();
    callSnack(result);




  }


  function openDays() {
    const diference = moment(new Date()).diff(moment(vaga.created_at));
    const days = moment.duration(diference).asDays();

    return parseInt(days);
  }


  function atribuicoesMap() {
    if (!vaga.atribuicoes) {
      return [];
    }

    return vaga.atribuicoes.split("|")

  }

  function skillsMap() {
    if (!vaga.skills) {
      return [];
    }

    return vaga.skills.split("|")

  }

  function beneficiosMap() {
    if (!vaga.beneficios) {
      return [];
    }

    return vaga.beneficios.split("|")

  }
  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);

  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };



  return (
    <MDBox>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{<MDBox display="flex" alignItems="center" ><MDBox
          component="img"
          src={`${baseURL}${vaga.empresa.thumbnail}`}
          alt={vaga.name}
          borderRadius="lg"
          shadow="md"
          width={pxToRem(56)}
          height={pxToRem(56)}
          position="relative"
          zIndex={1}
          mr={4}
        /> {vaga.nome}</MDBox>}</DialogTitle>
        <DialogContent>

          <MDBox mb={2}>
            <Typography variant="subtitle" gutterBottom component="div" >
              <Icon >work</Icon>  {!vaga.nome ? " " : vaga.empresa.nome}
            </Typography>

            <Typography variant="subtitle" gutterBottom component="div">
              <Icon >people</Icon>  {(openDays() + 1) === 1 ? ` Aberto há ${openDays() + 1} Dia` : `Aberto há ${openDays() + 1} Dias`}
            </Typography>

            <Typography variant="subtitle" gutterBottom component="div">
              <ArchitectureIcon />  {stringTipo(vaga.tipo)}
            </Typography>

            <Typography variant="subtitle" gutterBottom component="div">
              <MonetizationOnIcon />  {vaga.salario === 0 ? "Sem Remuneração" : vaga.salario}
            </Typography>

            <Typography variant="subtitle" gutterBottom component="div">
              <TrackChangesIcon />  {" Recrutando Agora"}
            </Typography>
          </MDBox>

          <MDBox>
            <MDTypography variant="h7" fontWeight="medium">
              Sobre Empresa
            </MDTypography>
          </MDBox>
          <MDBox>
            <MDTypography variant="body2"  >
              {vaga.detalhes}
            </MDTypography>
          </MDBox>

          <MDBox mt={2} mb={2}>
            <MDTypography variant="h7" fontWeight="medium" >
              Atribuições
            </MDTypography>
          </MDBox>
          {atribuicoesMap().map((item, index) => {
            return (<MDBox mt={1} key={index}>
              <MDTypography ml={4} variant="body2" >
                {item}
              </MDTypography>
            </MDBox>)
          })}

          <MDBox mt={2} mb={2}>
            <MDTypography variant="h7" fontWeight="medium" >
              Habilidades Esperadas
            </MDTypography>
          </MDBox>

          <MDBox mt={1}>
            {skillsMap().map((item, index) => {
              return (<MDBox mt={1} key={index}>
                <MDTypography ml={4} variant="body2" >
                  {item}
                </MDTypography>
              </MDBox>)
            })}
          </MDBox>

          <MDBox mt={2} mb={2}>
            <MDTypography variant="h7" fontWeight="medium" >
              Benefícios
            </MDTypography>
          </MDBox>

          <MDBox mt={1}>
            {beneficiosMap().map((item, index) => {
              return (<MDBox mt={1} key={index}>
                <MDTypography ml={4} variant="body2" >
                  {item}
                </MDTypography>
              </MDBox>)
            })}
          </MDBox>
          <DialogContentText id="alert-dialog-slide-description">




          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <MDButton variant="contained" color="info" size="small" onClick={handleClickOpenConfirm} >Caditdatar a Vaga</MDButton>
          <MDButton variant="outlined" color="info" size="small" onClick={handleClose}>Sair</MDButton>

        </DialogActions>
      </Dialog>

      <MDBox>
        <Dialog
          open={openConfirm}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Confirmar Candidatura</DialogTitle>
          <DialogContent>
            <MDBox>
              <Typography variant="subtitle" gutterBottom component="div" >
                Candidatar a esta Vaga ?
              </Typography>
            </MDBox>

            <DialogContentText id="alert-dialog-slide-description">




            </DialogContentText>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirm}>Não</Button>
            <Button onClick={() => { Candidatar(); }}>Sim</Button>

          </DialogActions>
        </Dialog>
      </MDBox>

    </MDBox >


  );

}
