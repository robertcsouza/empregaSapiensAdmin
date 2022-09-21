// prop-types is a library for typechecking of props
import { forwardRef, useState, useEffect } from 'react';
import PropTypes from "prop-types";
import moment from 'moment';

// @mui material components
import Icon from "@mui/material/Icon";
import DateRangeIcon from '@mui/icons-material/DateRange';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Typography from '@mui/material/Typography';
//import for dialog
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import ArchiveIcon from '@mui/icons-material/Archive';

//import acordion

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

import { useSelector, useDispatch } from 'react-redux';

import { unSubscribeVaga } from 'slices/SubscriptionSlice';
// Billing page components

import SnackBarComponent from 'components/SnackBarComponent';
import Badge from '@mui/material/Badge';

import 'react-toastify/dist/ReactToastify.css';
import { Divider, IconButton, Tooltip } from '@mui/material';
import NotificationAccordion from '../notificationAccordion';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Information({ id, notifications, actionSnack, vagaId, nome, data, nomeEmpresa, finalizado, noGutter }) {

  //Acordion

  useEffect(() => {
    const findNew = notifications.find(item => item.is_new !== 0);
    if (!!findNew) {
      setnewNotification(1)
    }
    console.log(findNew)
  }, [])


  const [expandedMain, setExpandedMain] = useState(false);

  const [newNotification, setnewNotification] = useState(0);


  const handleChangeMain = (panel) => (event, isExpanded) => {
    setExpandedMain(isExpanded ? panel : false);
  };

  const dispatch = useDispatch();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const user = useSelector(state => state.user);
  const sx = { mt: 2, mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState();
  const closeSnack = () => setSnackOpen(false);

  function openSnack(content) {

    setSnackContent(content)
    setSnackOpen(true)
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



  async function unSubscribe() {

    const result = await dispatch(unSubscribeVaga(vagaId));

    closeAlertDialog();
    handleClose();

    actionSnack(result);
  }



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
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography component={'span'} variant="h5" fontWeight="medium" textTransform="capitalize" >
            {nome}
          </MDTypography>

          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error" onClick={openAlertDialog}>
                <Icon>delete</Icon>&nbsp;Cancelar Inscrição
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
                <DialogTitle>{"Cancelar Inscrição"}</DialogTitle>
                <DialogContent>

                  <MDBox>
                    Tem Certeza que deseja Cancelar Inscrição ?
                  </MDBox>

                </DialogContent>
                <DialogActions>
                  <Button onClick={closeAlertDialog}>Não</Button>
                  <Button onClick={unSubscribe}>Sim</Button>
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
                  <DialogContentText id="alert-dialog-slide-description">

                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Sair</Button>
                  <Button onClick={() => { }}>Salvar</Button>
                </DialogActions>
              </Dialog>
            </MDBox>

          </MDBox>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>

        </MDBox>


        <MDBox mb={2}>
          <MDTypography variant="body2" gutterBottom component="div" >
            <Icon >work</Icon>  {nomeEmpresa}
          </MDTypography>

          <MDTypography variant="body2" gutterBottom component="div">
            <DateRangeIcon /> Iniciado em {moment(data).format("DD/MM/YYYY")}
          </MDTypography>

          <MDTypography variant="body2" gutterBottom component="div">
            <TrackChangesIcon />  {finalizado !== 0 ? "Processo Seletivo em Andamento" : "Processo Seletivo Finalizado"}
          </MDTypography>

          <MDTypography variant="body2" gutterBottom fontWeight="bold" component="div">
            Andamento
          </MDTypography>

          <MDBox>
            <Accordion expanded={expandedMain === 'panelMain'} elevation={0} onChange={handleChangeMain('panelMain')}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panelMainbh-content"
                id="panelMainbh-header"
              >
                <MDTypography mr={1} variant="subtitle1" fontWeight="bold">
                  Andamento Do processo Seletivo
                </MDTypography>
                {newNotification === 0 ? <MDBox></MDBox> : <MDTypography variant="caption" fontWeight="bold" color="success">Nova Notificação</MDTypography>}
                <MDBox

                  display="flex"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >

                </MDBox>

              </AccordionSummary>
              <AccordionDetails>
                {notifications.map((item) => {

                  return (<MDBox key={item.id}>
                    <Divider variant="middle" />
                    <NotificationAccordion notification={item} />
                  </MDBox>)
                })}
              </AccordionDetails>
            </Accordion>

          </MDBox>


        </MDBox>


      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of Bill
Information.defaultProps = {
  noGutter: false,
};

//  nome, data, nomeEmpresa,finalizado
Information.propTypes = {
  nome: PropTypes.string,
  data: PropTypes.string,
  nomeEmpresa: PropTypes.string,
  finalizado: PropTypes.bool,
  noGutter: PropTypes.bool,
};

export default Information;