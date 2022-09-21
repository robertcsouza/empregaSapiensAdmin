import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Divider, IconButton, Tooltip } from '@mui/material';
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Typography from '@mui/material/Typography';
import ArchiveIcon from '@mui/icons-material/Archive';
import Badge from '@mui/material/Badge';
import moment from 'moment';
import parse from "html-react-parser"
import { useDispatch } from 'react-redux';
import { subscriptionNotificationUpdate } from 'slices/SubscriptionSlice';



function NotificationAccordion({ notification, checked }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(false);
  const [clicked, setClicked] = useState(false);
  async function checkSubscription(id) {
    await dispatch(subscriptionNotificationUpdate(id))
    setClicked(true);
  }
  const handleChange = (panel) => (event, isExpanded) => {

    setExpanded(isExpanded ? panel : false);
    if (clicked === false) {
      checkSubscription(panel);
    }
  };


  return (<Accordion expanded={expanded === notification.id} elevation={0} onChange={handleChange(notification.id)}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}

      aria-controls={`${notification.id}bh-content`}
      id={`${notification.id}bh-header`}
    >
      <MDTypography component={'span'} sx={{ width: '80%', flexShrink: 0 }} variant="subtitle2" fontWeight="bold">
        <MDBox display="flex" justifyContent="start" alignItems="top">
          <MDTypography component={'span'} mr={2} variant="inherit" fontWeight="bold">
            {notification.title}
          </MDTypography>
          {notification.is_new === 0 ? <MDBox></MDBox> : <MDTypography variant="caption" fontWeight="bold" color="success">Ver Notificação</MDTypography>}
        </MDBox>
      </MDTypography>
      <MDTypography component={'span'} sx={{ color: 'text.secondary' }} variant="subtitle2"  >
        {moment(notification.create_at).format('DD/MM/YYYY')}
      </MDTypography>
    </AccordionSummary>
    <AccordionDetails>
      <MDTypography component={'span'} variant="body2" >
        <MDBox>{parse(notification.content)}</MDBox>
      </MDTypography>
    </AccordionDetails>
  </Accordion>);

}

export default NotificationAccordion;


/*
Anexos de arquivos
<Typography sx={{ color: 'text.secondary' }} variant="subtitle2" fontWeight="bold" mt={1} ml={1}>
                      Arquivos Anexos
                    </Typography>


                    <Tooltip title='ficha candiato.pdf'>
                      <IconButton>
                        <MDBox display="flex" flexDirection="column" justifyContent="start"
                          alignItems="center" ml={1} mr={1}>
                          <ArchiveIcon fontSize='large' />

                          <MDTypography sx={{
                            'max-width': '100px',
                            'overflow': 'hidden',
                            'text-overflow': 'ellipsis',
                            'white-space': 'nowrap'
                          }}
                            mt={1}
                            variant="caption"
                          >
                            ficha candidato.pdf
                          </MDTypography>
                        </MDBox>
                      </IconButton>
                    </Tooltip>
*/