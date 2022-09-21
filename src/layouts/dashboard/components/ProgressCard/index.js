import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import CircularProgress from '@mui/material/CircularProgress';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "components/Timeline/TimelineItem";

import MDProgress from "components/MDProgress";
import { useSelector } from "react-redux";
import { profile } from "slices/userSlice";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function ProgressCard() {
const navigate = useNavigate();
  const percent = useSelector(state => state.user.profile.percentProfile)
  const profile = useSelector(state => state.user.profile);

  
  function RedirectTo() {

      if(profile.complement.length <= 0){
        navigate("/graduation")
      }else if(profile.graduation <= 0){
        navigate("/graduation")
      }else if(profile.habilidade <= 0){
        navigate("/profile")
      }else if(profile.language <= 0){
        console.log("language")
        navigate("/languages")
      }else if(profile.professional <= 0){
        navigate("/experience") 
      }
      else{
        navigate("/profile")
      }
  }

  if(percent < 100 ){
    return (
      <Card sx={{ height: "100%" }}>
        <MDBox pt={3} px={3} >
         <MDBox display="flex" justifyContent="space-between" alignItems="center">
         <MDTypography variant="h6" fontWeight="medium">
            Curriculo Preenchido
          </MDTypography>
           <MDButton color="info" variant="text" onClick={()=>{RedirectTo();}}>Continuar Preenchendo</MDButton>
         </MDBox>
         
          <MDBox mt={0} mb={2}>
            <MDTypography variant="button" color="text" fontWeight="regular">
              <MDTypography display="inline" variant="body2" verticalAlign="middle">
                <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
              </MDTypography>
              &nbsp;
              <MDTypography variant="button" color="text" fontWeight="medium">
                {percent}%
              </MDTypography>{" "}
              Quantidade do curriculo Preenchido
            </MDTypography>
  
            <MDBox mt={2} >
              <MDProgress value={percent} />
  
            </MDBox>
  
          </MDBox>
          
        </MDBox>
  
      </Card>
    );
  }else{
    return(<MDBox></MDBox>)
  }
  
}

export default ProgressCard;
