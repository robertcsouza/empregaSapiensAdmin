import { useState } from "react";
// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import DialogVagas from "layouts/dashboard/ListVagas/components/DialogVagas.js";

function OportunityCard({ vaga, callSnack, color, image, cargo, empresa, status, inicio, action }) {

  const [openDialog, setOpenDialog] = useState(false)


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Card sx={{ 'maxWidth': '400px' }}>
      <MDBox p={2} mx={3} display="flex" justifyContent="center">
        <DialogVagas open={openDialog} handleClose={handleCloseDialog} vaga={vaga} callSnack={callSnack} />
        <MDBox
          display="grid"
          justifyContent="center"
          alignItems="center"
          bgColor={color}
          color="white"
          width="4rem"
          height="4rem"
          shadow="md"
          borderRadius="lg"
          variant="gradient"
        >
          <MDBox
            component="img"
            src={image}
            alt={cargo}
            borderRadius="lg"
            shadow="md"
            width="100%"
            height="100%"
            position="relative"
            zIndex={1}
          />


        </MDBox>
      </MDBox>
      <MDBox pb={2} px={2} textAlign="center" lineHeight={1.25}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {cargo}
        </MDTypography>
        {empresa && (
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {empresa}
          </MDTypography>
        )}
        {status === true ? <MDTypography variant="body2" fontWeight="medium" color="success">
          Disponivel
        </MDTypography> : <MDTypography variant="body2" fontWeight="medium" color="error">
          Indisponivel
        </MDTypography>}
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {inicio}
        </MDTypography>
        {empresa && !status ? null : <Divider />}
        {status && (
          <MDTypography variant="h5" fontWeight="medium">
            {status}
          </MDTypography>
        )}
        <MDButton variant="text" color="info" small={"true"} onClick={handleOpenDialog}>Ver Vaga</MDButton>
      </MDBox>
    </Card>
  );
}



export default OportunityCard;
