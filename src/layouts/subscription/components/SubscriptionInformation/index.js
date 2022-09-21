import { forwardRef, useState } from 'react';
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import MDTypography from "components/MDTypography";


//import for dialog

import Slide from '@mui/material/Slide';

import MDSnackbar from "components/MDSnackbar";

import { useSelector, useDispatch } from 'react-redux';
// Billing page components
import Information from "../Information";

import InputMask from 'react-input-mask';


import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfessional, createProfessional } from 'slices/userSlice';
import SnackBarComponent from 'components/SnackBarComponent';


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function SubscriptionInformation() {
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState();
  const closeSnack = () => setSnackOpen(false);

  function openSnack(content) {

    setSnackContent(content)
    setSnackOpen(true)
  };

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const sx = { mr: 1, mb: 1, minWidth: 250 }
  const sxTextArea = { minWidth: 250 }




  const subscriptions = useSelector(state => state.subscription)


  function callSnackBar(result) {
    if (result.payload.status === 201) {
      openSnack({ type: 'warning', title: "Candidatado Cancelada", body: "Candidatura Cancelada com sucesso", dateTime: "1 min ago" });
    } else {

      openSnack({ type: 'error', title: "Erro ao Cancelar", body: result.payload.data.data.toString(), dateTime: "1 min ago" });
    }
  }



  //nome, cargo, empresa, iniciou, saiu, salario, principalAtividade
  return (
    <Card id="delete-account">
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography component={'span'} variant="h6" fontWeight="medium">
          Minhas Inscrições
        </MDTypography>

        <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {subscriptions.status !== 'sucess' ? <MDBox>Nenhuma inscrição Até o momento</MDBox> : subscriptions.subscriptions.data.map((item) => {

            return (
              //  nome, data, nomeEmpresa,finalizado
              <Information
                key={item.id}
                id={item.id}
                actionSnack={callSnackBar}
                vagaId={item.vaga_id}
                nome={item.step.vaga.nome}
                notifications={item.step.vaga.notifications}
                data={item.step.vaga.created_at}
                nomeEmpresa={item.step.vaga.empresa.nome}
                finalizado={item.step.vaga.concluido === 1 ? true : false}
              />

            )
          })}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default SubscriptionInformation;