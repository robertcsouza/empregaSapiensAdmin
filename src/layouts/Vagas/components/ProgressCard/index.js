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

function ProgressCard() {

  const percent = useSelector(state => state.user.profile.percentProfile)

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Curriculo Preenchido
        </MDTypography>
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
}

export default ProgressCard;
