import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import { Switch } from "@mui/material";
import CardCompany from "./cardCompany";
import SnackBarComponent from "components/SnackBarComponent";
import MDTypography from "components/MDTypography";
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

function ListCompanies() {
  const companies = useSelector(state => state.company);

  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);

  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };

  function callSnack({ result, type }) {
    console.log(result.payload.data)

    if (type === "aprove") {
      if (result.payload.status === 200) {

        openSnack({ type: 'success', title: "Empresa Aprovada", body: "Empresa Aprovada com sucesso", dateTime: "1 min ago" });
      } else {

        openSnack({ type: 'error', title: "Erro ao Aprovar Empresa", body: result.payload.data.toString(), dateTime: "1 min ago" });
      }
    } else {
      if (result.payload.status === 200) {

        openSnack({ type: 'success', title: "Empresa Deletada!", body: "Empresa Deletada com sucesso", dateTime: "1 min ago" });
      } else {

        openSnack({ type: 'error', title: "Erro ao Deletar Empresa", body: result.payload.data.toString(), dateTime: "1 min ago" });
      }
    }


  }
  switch (companies.status) {
    case 'loading':
      return (<MDBox mt={2} ml={2} mr={2}>
        <Stack spacing={1}>
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" height={200} />
        </Stack>
      </MDBox>)

    case 'failed':
      return (<div>Não foi possivel carregar os dados</div>)


    case 'sucess':
      return body();


    default:
      return (<div></div>)

  }

  function body() {
    const listCompanies = companies.listCompaniesPending.data;

    if (!listCompanies.length) return (<Card sx={{ height: "100%", width: "100%", minHeight: "300px" }} mt={2}>
      <MDTypography variant="h6" mt={4} ml={4}>Empresas para Aprovar</MDTypography>
      <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />


    </Card >)

    return (
      <Card sx={{ height: "100%", width: "100%", }} mt={2}>
        <MDTypography variant="h6" mt={4} ml={4}>Empresas para Aprovar</MDTypography>
        <MDBox display="flex" justifyContent="space-between" flexDirection="column" overflow="scroll" alignItems="center" pt={3} px={2} maxHeight="750px">
          <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
          {
            listCompanies.map((item, index) => {
              console.log(item)
              return <CardCompany empresa={item} key={index} call={callSnack} />

            })
          }


        </MDBox>
      </Card >
    )
  }
}

export default ListCompanies;