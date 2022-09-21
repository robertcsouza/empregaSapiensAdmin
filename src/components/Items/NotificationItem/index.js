

import { forwardRef } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
import moment from "moment";

// custom styles for the NotificationItem
import menuItem from "components/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ icon, title, message, data, call, route, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
    <Link to={route} onClick={call}>
      <MDBox display="flex" alignItems="center">
        <MDBox mr={2}>
          <MDButton variant="outlined" color="info" iconOnly circular>
            <Icon sx={{ fontWeight: "regular" }}>{icon}</Icon>
          </MDButton>
        </MDBox>
        <MDBox display="flex" flexDirection="column">
          <MDTypography variant="button" fontWeight="medium" gutterBottom>
            {title}
          </MDTypography>
          <MDTypography variant="caption" color="text" gutterBottom>
            {message}
          </MDTypography>
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {moment(data).format("DD/MM/YYYY")}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Link>
  </MenuItem>
));

// Typechecking props for the NotificationItem
NotificationItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
};

export default NotificationItem;
