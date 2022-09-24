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
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from "moment";



// Material Dashboard 2 React context
import { useMaterialUIController } from "context";
import { Icon } from "@mui/material";
import baseURL from "service/baseUrl.js";
import DialogConfirm from "./dialogConfirm";
import SnackBarComponent from "components/SnackBarComponent";
import { useDispatch } from "react-redux";
import { aproveCompany } from "slices/companySlice";
import { deleteCompany } from "slices/companySlice";

function CardCompany({ empresa, call, noGutter }) {
  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleCloseConfirm = () => {

    setOpenConfirm(false);
  };
  const handleOpenConfirm = () => {

    setOpenConfirm(true);
  };

  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseDelete = () => {

    setOpenDelete(false);
  };
  const handleOpenDelete = () => {

    setOpenDelete(true);
  };



  async function Aprove() {
    const result = await dispatch(aproveCompany(empresa.id));
    call({ result, type: "aprove" });
    handleCloseConfirm();
  }

  async function Delete() {
    const result = await dispatch(deleteCompany(empresa.id));
    call({ result, type: "delete" });
    handleCloseConfirm();
    handleCloseDelete();
  }

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      width="100%"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
    >

      <DialogConfirm title="Confirmar Empresa" content="Deseja Confirmar a incrição da empresa ?" open={openConfirm} handleClose={handleCloseConfirm} call={Aprove} />

      <DialogConfirm title="Cancelar Inscrição" content="Deseja Cancelar a inscrição da Empresa?" open={openDelete} handleClose={handleCloseDelete} call={Delete} />

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
            {
              !!empresa.thumbnail ? <MDBox
                component="img"
                src={`${baseURL}${empresa.thumbnail}`}
                alt={empresa.nome}
                borderRadius="lg"
                shadow="md"
                width={pxToRem(42)}
                height={pxToRem(42)}
                position="relative"
                zIndex={1}
                mr={4}
              /> : null
            }
            <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {empresa.nome}
            </MDTypography>
          </MDBox>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>

            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleOpenConfirm}>
              <ThumbUpIcon color="success" />&nbsp; Aprovar
            </MDButton>
            <MDButton variant="text" color={darkMode ? "white" : "dark"} onClick={handleOpenDelete}>
              <DeleteIcon color="error" />&nbsp; excluir
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <WorkIcon />
          <MDTypography variant="caption" color="text" >
            &nbsp;&nbsp;Empresa:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {empresa.nome}
            </MDTypography>
          </MDTypography>
        </MDBox>

        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <PersonIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp; Responsável:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {empresa.responsavel}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <TrackChangesIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp;Status:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" mt={2} mb={2} color={empresa.convenio === 1 ? "success" : "info"}>
              {empresa.convenio === 1 ? "Aprovado" : "Não Aprovado"}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <LocalPhoneIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp; Telefone:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {empresa.telefone}&nbsp;&nbsp;&nbsp; /&nbsp;&nbsp;&nbsp;
            </MDTypography>
            <MDTypography variant="caption" fontWeight="medium">
              {empresa.residencial}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <ArchitectureIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp; Ramo:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {empresa.ramo}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0} mr={2} display="flex" alignItems="center">
          <DateRangeIcon />
          <MDTypography variant="caption" color="text">
            &nbsp;&nbsp; Criado em:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {moment(empresa.created_at).format('DD/MM/YYYY')}
            </MDTypography>
          </MDTypography>
        </MDBox>


      </MDBox>

    </MDBox>
  );
}




export default CardCompany;
