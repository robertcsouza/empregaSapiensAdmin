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

import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import { VagaHK } from '../../hooks/vaga/vagaHK'
import { UsuarioHK } from '../../hooks/usuario/usuarioHK'
import { SubscriptionHK } from 'hooks/subscription/subscriptionHK';
import { HabilidadesHK } from 'hooks/habilidade/habilidadeHk';
import { SelectedVagaHK } from 'hooks/selectedOportunity';
import { candidatarVagas, searchVagas } from 'slices/vagaSlice';

import { AnalyticsHK } from 'hooks/analytics/analyticsHK';


import Slide from '@mui/material/Slide';



import SnackBarComponent from 'components/SnackBarComponent';



import { color } from '@mui/system';
import PaginationComponent from './components/pagination';
import ListVagas from 'layouts/dashboard/ListVagas';
import SelectedOportunity from 'layouts/dashboard/SelectedOportunity';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
function Vagas() {
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



  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };




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



  async function callSnack(result) {


    if (result.payload.data.status === 201) {

      openSnack({ type: 'success', title: "Candidatado com sucesso", body: "Sucesso ao candidatar-se a vaga,Boa Sorte :)", dateTime: "1 min ago" });
    } else {

      openSnack({ type: 'error', title: "Erro ao candidatar-se", body: result.payload.data.data.toString(), dateTime: "1 min ago" });
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox>
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
      </MDBox>
      <MDBox py={3}>
        <MDBox >
          <Grid container spacing={4}>
            <Grid item xs={12} md={12} mt={4} lg={12}>
              <Card>
                <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" fontWeight="medium">
                    Vagas
                  </MDTypography>
                  <MDBox>

                    <MDBox
                      component="form" border={1} borderRadius="10" borderColor="grey.300"
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
                  <ListVagas />
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

export default Vagas;
