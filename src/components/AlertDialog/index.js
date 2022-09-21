import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MDBox from 'components/MDBox';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';

function AlertDialog(text, open, func) {
  const [close, setClose] = React.useState(false);

  const handleClose = () => {
    setClose(true);

  };



  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (<MDBox>
    <Button onClick={func}>Teste</Button>
  </MDBox>)
}

export default AlertDialog;