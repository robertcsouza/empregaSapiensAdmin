import MDBox from "components/MDBox";
import { Grid } from "@mui/material";
import moment from "moment";
import OportunityCard from "./components/opportunityCard";
function SelectedOportunity({ vagas, callSnack }) {

  const vagasSelected = vagas.vagasSelected.data.map((item) => {
    const inicio = moment(item.created_at).format('DD/MM/YYYY');
    return (<Grid item xs={12} md={6} lg={3} key={item.id}>
      <MDBox>
        <MDBox>
        </MDBox >
      </MDBox>

      <MDBox mb={1.5}>
        <OportunityCard vaga={item} callSnack={callSnack} cargo={item.nome} image={`http://apiempregasapiens.ddns.net:3333${item.empresa.thumbnail}`} empresa={item.empresa.nome} status={item.aprovado === 1 ? true : false} inicio={inicio.toString()} action={() => {


        }} />
      </MDBox>
    </Grid>)
  })

  return vagasSelected;

}

export default SelectedOportunity;