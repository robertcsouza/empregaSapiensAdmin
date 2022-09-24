
import { useEffect, useState, forwardRef } from "react";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';







const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function DialogConfirm({ title, content, open, handleClose, call, }) {



  return (
    <MDBox>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <MDBox>
            <Typography variant="subtitle" gutterBottom component="div" >
              {content}
            </Typography>
          </MDBox>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={call}>Sim</Button>

        </DialogActions>
      </Dialog>
    </MDBox>




  );

}