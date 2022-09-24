import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "components/LayoutContainers/DashboardLayout";
import DashboardNavbar from "components/Navbars/DashboardNavbar";
import Footer from "components/Footer";
import ReportsBarChart from "components/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "components/Cards/StatisticsCards/ComplexStatisticsCard";

import auth from '../../service/auth'
import CompaniesPending from "layouts/companiesPending";
import CompanyComponent from "layouts/companiesPending/companyComponent";


function Dashboard() {
  const dispatch = useDispatch();
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



  }, [])





  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>

              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Vagas Ofertadas"
                count={0}
                percentage={{
                  color: "success",
                  label: "Abertas e Finalizadas",
                }}
              />

            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>

              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Processos Abertos"
                count={0}
                percentage={{
                  color: "success",
                  amount: `${10} %`,
                  label: "do total",
                }}
              />

            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>

              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Candidatos"
                count={`+ ${0}`}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Total de processos",
                }}
              />

            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Link to="/vagas">
                  <ReportsBarChart
                    color="info"
                    title="Vagas Disponibilizadas"
                    description="Vagas disponibilizadas por mês"
                    date="informação recuperdada hoje"
                    chart={{
                      labels: ["jan", "fev", "mar", "Abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                      datasets: {
                        label: "Vagas",
                        data: [1, 3, 4, 2, 1, 0, 1, 2, 4, 2, 10, 2]
                      },
                    }}
                  />
                </Link>
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Link to="/vagas">
                  <ReportsBarChart
                    color="warning"
                    title="Empresas aderiram a plataforma"
                    description="Quantidade de alunos cadastrados por mês"
                    date="informação recuperdada hoje"
                    chart={{
                      labels: ["jan", "fev", "mar", "Abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                      datasets: {
                        label: "Alunos",
                        data: [1, 3, 4, 2, 1, 0, 1, 2, 4, 2, 10, 2]
                      },
                    }}
                  />
                </Link>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <Link to="/dashboard">
                  <ReportsBarChart
                    color="success"
                    title="Adesão de Alunos"
                    description="Quantidade de alunos cadastrados no mês"
                    date="informação recuperdada hoje"
                    chart={{
                      labels: ["jan", "fev", "mar", "Abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
                      datasets: {
                        label: "Empresas",
                        data: [1, 3, 4, 2, 1, 0, 1, 2, 4, 2, 10, 2]
                      },
                    }}
                  />
                </Link>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>

      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={9}>
            <CompanyComponent />
          </Grid>
        </Grid>
      </MDBox>




      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
