import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MDBox from "components/MDBox";

import moment from 'moment';
import MDPagination from "components/MDPagination";
import CardVaga from "./components/cardVaga";
import SkeletonCard from "./components/SkeletonCard";
import SnackBarComponent from "components/SnackBarComponent";


function ListVagas() {

  const vagas = useSelector(state => state.vagas);

  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };

  function callSnack(result) {

    if (result.payload.data.status === 201) {

      openSnack({ type: 'success', title: "Sucesso ao Candidatar-se", body: "Sucesso ao candidatar-se a vaga,Boa Sorte :)", dateTime: "1 min ago" });
    } else {

      openSnack({ type: 'error', title: "Erro ao candidatar-se", body: result.payload.data.data.toString(), dateTime: "1 min ago" });
    }

  }

  if (vagas.status === 'sucess') {

    return (<MDBox>


      <MDBox pt={1} pb={2} px={2}   >
        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
        {<MDBox component="ul" display="flex" flexDirection="column" p={0} m={0} sx={{ height: "100%", maxHeight: 600, width: "100%", overflow: 'auto' }} key="vagas">

          {vagas.vagas.status === 200 ? vagas.vagas.data.data.map((item, index) => {

            return (
              <MDBox key={index}>

                <CardVaga
                  key={item.id}
                  vaga={item}
                  callSnack={callSnack}
                  createdAt={moment(item.created_at).format("DD/MM/YYYY")}
                />

              </MDBox>
            )
          }) : <div></div>}
        </MDBox>}
      </MDBox>


    </MDBox>)


  } else {
    return (<MDBox sx={{ height: "100%", maxHeight: 600, overflow: 'auto' } } ml={2} mr={2}>
      <SkeletonCard />

    </MDBox>)
  }
}

export default ListVagas;