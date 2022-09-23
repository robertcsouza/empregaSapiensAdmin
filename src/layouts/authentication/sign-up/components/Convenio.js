
// react-router-dom components
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';


// @mui material components

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { useDispatch } from 'react-redux';
import { getContrato } from 'slices/userSlice';
import convenioUrl from 'service/conveioUrl';





function Convenio() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function DownloadContrato() {
    await dispatch(getContrato())
  }
  return (
    <MDBox pt={6} pb={6} px={6} display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" >

      <MDTypography variant="subtitle1" alignCenter >
        Por favor baixar o contrato de Convenio assinar e Enviar para o Email Abaixo
      </MDTypography>
      <MDTypography variant="caption" alignCenter >
        Só será possível Disponibilizar alguma Vaga após Assinatura do termo de Convenio
      </MDTypography>

      <MDBox mt={2} mb={2}>

        <a href={convenioUrl} target="_blank" rel="noreferrer">
          <MDButton variant="outlined" color="dark"  >
            <Icon >cloudDownload</Icon>
            &nbsp;Baixar Contrato de Convenio
          </MDButton>
        </a>

      </MDBox>

      <MDBox mt={2} mb={2}>
        <MDTypography variant="subtitle1" alignCenter >
          cordenacao@faculdadesapiens.edu.br
        </MDTypography>
        <MDTypography variant="caption" alignCenter >
          Após a validação será disponiblizada a criação de vagas
        </MDTypography>

      </MDBox>

      <MDBox mt={2} mb={2}>
        <MDButton variant="contained" onClick={() => { navigate('/dashboard') }} color="info">Finalizar</MDButton>

      </MDBox>

      <MDBox mt={1}>




      </MDBox>



    </MDBox>


  );
}

// Typechecking props for the BasicLayout

export default Convenio;