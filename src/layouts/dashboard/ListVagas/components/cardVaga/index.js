import { useState } from "react";
import PropTypes from "prop-types";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import pxToRem from 'assets/theme-dark/functions/pxToRem';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import DateRangeIcon from '@mui/icons-material/DateRange';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import moment from "moment";
import DialogVagas from "../../components/DialogVagas.js";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ArchitectureIcon from '@mui/icons-material/Architecture';


// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { Icon } from "@mui/material";
import baseURL from "service/baseUrl.js";

function CardVaga({ vaga, callSnack, noGutter }) {
  console.log(vaga.tipo)
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [openDialog, setOpenDialog] = useState(false)

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

  function currencyFormat(num) {
    if(!num){
      return ""
    }
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
 

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };


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
      <DialogVagas open={openDialog} handleClose={handleCloseDialog} vaga={vaga} callSnack={callSnack} />
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <MDBox
              component="img"
              src={`${baseURL}${vaga.empresa.thumbnail}`}
              alt={vaga.name}
              borderRadius="lg"
              shadow="md"
              width={pxToRem(42)}
              height={pxToRem(42)}
              position="relative"
              zIndex={1}
              mr={4}
            />
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {vaga.nome}
            </MDTypography>
          </MDBox>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>

            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleOpenDialog}>
              <OpenInBrowserIcon />&nbsp; Candidatar a vaga
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <WorkIcon />
          <MDTypography variant="caption" color="text" >
            &nbsp;&nbsp;Empresa:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {vaga.empresa.nome}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <ArchitectureIcon />
          <MDTypography variant="caption" color="text" >
            &nbsp;&nbsp;Tipo:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {stringTipo(vaga.tipo)}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <MonetizationOnIcon />
          <MDTypography variant="caption" color="text" >
            &nbsp;&nbsp;Salário:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {vaga.salario === 0 || !vaga.salario ? "Sem Remuneração" : currencyFormat(vaga.salario)}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <PersonIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp; Responsável:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {vaga.empresa.responsavel}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <TrackChangesIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp;Status:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" mt={2} mb={2} color={vaga.concluido === 1 ? "info" : "success"}>
              {vaga.concluido === 1 ? "Concluido" : "Em andamento"}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <DateRangeIcon />
          <MDTypography variant="caption" color="text">

            &nbsp;&nbsp; Criado em:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {moment(vaga.created_at).format('DD/MM/YYYY')}
            </MDTypography>
          </MDTypography>
        </MDBox>


      </MDBox>

    </MDBox>
  );
}




export default CardVaga;