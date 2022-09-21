import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";

import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";


// Data
import Icon from "@mui/material/Icon";


// Dashboard components

import ProgressCard from 'layouts/dashboard/components/ProgressCard';
import { useEffect, useState, forwardRef } from "react";
import auth from '../../service/auth'

import { Link, useNavigate } from "react-router-dom";

import vagasTableData from "./data/vagasTableData";
import DataTable from "./components/DataTable";

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Typography from '@mui/material/Typography';
import MDSnackbar from "components/MDSnackbar";

import pxToRem from 'assets/theme-dark/functions/pxToRem';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

import { VagaHK } from '../../hooks/vaga/vagaHK'
import { UsuarioHK } from '../../hooks/usuario/usuarioHK'
import { SubscriptionHK } from 'hooks/subscription/subscriptionHK';
import { HabilidadesHK } from 'hooks/habilidade/habilidadeHk';
import { SelectedVagaHK } from 'hooks/selectedOportunity';
import { candidatarVagas } from 'vagaSlice';
import { AnalyticsHK } from 'hooks/analytics/analyticsHK';
import DefaultInfoCard from './components/opportunityCard';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

import OportunityCard from './components/opportunityCard';
import PaginationComponent from './components/pagination';
import { loadVagas } from 'vagaSlice';
import { searchVagas } from 'vagaSlice';
import { analytics } from 'analyticsSlice';

import TesteComponent from './components/teste';
import { color } from '@mui/system';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Dashboard() {
  const profile = useSelector(state => state.user.profile)
  const vagasRd = useSelector(state => state.vagas.vagas)
  const subscriptionsRd = useSelector(state => state.subscription.subscriptions)
  const habilidadesRd = useSelector(state => state.habilidades.habilidades);
  const selectedVagasRd = useSelector(state => state.selectedVaga);
  const analyticsRd = useSelector(state => state.analytics);
  const vagahook = VagaHK();
  const usuariohook = UsuarioHK();
  const habilidadeshook = HabilidadesHK();
  const subscriptionHook = SubscriptionHK();
  const selectedVagaHook = SelectedVagaHK();
  const analyticsHook = AnalyticsHK();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [vagaSelected, setVagaSelected] = useState({});
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);


  let navigate = useNavigate();
  useEffect(() => {
    async function isAuthenticate() {

      try {
        const result = await auth();

        if (result !== true) {
          navigate('/');
        }

      } catch (error) {

        navigate('/');

      }

    }
    isAuthenticate();

    if (!vagasRd) {
      vagahook();
    }
    if (profile.id === -1) {
      usuariohook();
    }
    if (!subscriptionsRd) {
      subscriptionHook();
    }
    if (!habilidadesRd) {
      habilidadeshook();
    }
    if (!selectedVagasRd.selectedVaga) {
      selectedVagaHook();
    }
    if (!analyticsRd.analytics) {
      analyticsHook();
    }

  }, [])


  const [searchInput, setSearchInput] = useState('');


  const vagas = []

  const { columns, rows } = vagasTableData(vagas);

  async function Candidatar() {
    const result = await dispatch(candidatarVagas(vagaSelected.id));
    handleCloseConfirm();
    handleClose();

    if (!!result.payload['msg']) {
      openErrorSB();
    } else {
      openSuccessSB()
    }


  }

  function openDays() {
    const diference = moment(new Date()).diff(moment(vagaSelected.created_at));
    const days = moment.duration(diference).asDays();

    return parseInt(days);
  }

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);

  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };
  function atribuicoesMap() {
    if (!vagaSelected.atribuicoes) {
      return [];
    }

    return vagaSelected.atribuicoes.split("|")

  }

  function skillsMap() {
    if (!vagaSelected.skills) {
      return [];
    }

    return vagaSelected.skills.split("|")

  }

  function beneficiosMap() {
    if (!vagaSelected.beneficios) {
      return [];
    }

    return vagaSelected.beneficios.split("|")

  }




  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>

      </MDBox>
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Vagas Totais"
                count={analyticsRd.status === 'sucess' ? analyticsRd.analytics.data.total : 0}
                percentage={{
                  color: "success",
                  label: "Seu Curso",
                }}



              />

            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Minhas Inscrições"
                count={analyticsRd.status === 'sucess' ? analyticsRd.analytics.data.subscriptions : 0}
                percentage={{
                  label: "Candidaturas Totais",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Vagas Novas"
                count={analyticsRd.status === 'sucess' ? analyticsRd.analytics.data.lastMonth : 0}
                percentage={{
                  color: "success",
                  label: "Criadas no Ultimo Mês",
                }}

              />

            </MDBox>
          </Grid>



        </Grid>



        <Grid item xs={6} spacing={2}>

          <MDBox mt={2} mb={2}>

            <ProgressCard />
          </MDBox>

        </Grid>
        <MDBox mt={2} mb={2}>
          <MDTypography variant="h6" fontWeight="medium">
            Vagas Selecionadas Pra você
          </MDTypography>
        </MDBox>
        <Grid container spacing={3}>
          {
            selectedVagasRd.status === 'sucess' ? selectedVagasRd.vagasSelected.data.map((item) => {
              const inicio = moment(item.created_at).format('DD/MM/YYYY');
              return (<Grid item xs={12} md={6} lg={3} key={item.id}>
                <MDBox>
                  <MDBox>

                    <Dialog
                      open={open}
                      TransitionComponent={Transition}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{vagaSelected.nome}</DialogTitle>
                      <DialogContent>
                        <MDBox mb={2}>
                          <Typography variant="subtitle" gutterBottom component="div" >
                            <Icon >work</Icon>  {!vagaSelected.nome ? " " : vagaSelected.empresa.nome}
                          </Typography>

                          <Typography variant="subtitle" gutterBottom component="div">
                            <Icon >people</Icon>  {(openDays() + 1) === 1 ? ` Aberto há ${openDays() + 1} Dia` : `Aberto há ${openDays() + 1} Dias`}
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
                            {vagaSelected.detalhes}
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
                            Beneficios
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
                </MDBox>

                <MDBox mb={1.5}>
                  <OportunityCard cargo={item.nome} empresa={item.empresa.nome} status={item.aprovado === 1 ? true : false} inicio={inicio.toString()} action={() => {

                    setVagaSelected(item);
                    handleClickOpen();
                  }} />
                </MDBox>
              </Grid>)
            }) : <div></div>
          }

        </Grid>



        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} mt={4} lg={12}>
              <Card>
                <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" fontWeight="medium">
                    Vagas
                  </MDTypography>
                  <MDBox>

                    <MDBox
                      component="form" border={1} borderRadius={10} borderColor="grey.300"
                      sx={{ p: '1px 4px', display: 'flex', alignItems: 'center', width: 250 }}
                    >

                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        size='small'
                        placeholder="Pesquisar"
                        onChange={(event) => { setSearchInput(event.target.value) }}
                        inputProps={{ 'aria-label': 'Pesquisar' }}
                      />
                      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" size='small' onClick={() => {

                        dispatch(searchVagas({ query: searchInput }))

                      }}>
                        <SearchIcon />
                      </IconButton>

                    </MDBox>
                  </MDBox>
                </MDBox>
                <MDBox pt={3} sx={{ minHeight: 550 }} >
                  <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                  />
                </MDBox>
                <MDBox mb={4} ml={2} mt={2} mr={6}>
                  <PaginationComponent search={searchInput} />
                </MDBox>
              </Card>
            </Grid>

          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
