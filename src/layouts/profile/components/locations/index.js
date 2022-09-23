import { forwardRef, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MDBox from "components/MDBox";
import SearchList from "components/SearchList"; import { Button } from "@mui/material";
import { useState } from "react";
import UF from "./components/UF";
import City from "./components/city";
import { useDispatch } from "react-redux";
import { getUf } from "slices/locationSlice";
import { getCity } from "slices/locationSlice";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Location({ open, handleDialogClose, setUf, setCity, input, id }) {
  console.log("chamou o location")
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
  const [cidadeList, setCidadeList] = useState([])
  useEffect(() => {
    async function load() {
      try {
        if (!id) {
          const result = await dispatch(getUf());
          setList(result.payload)
        } else {
          console.log("chamou o city")
          const resultCidades = await dispatch(getCity(id));
          setCidadeList(resultCidades.payload);
        }

      } catch (error) {
      }

    }
    load();
  }, [id])





  async function callUF(item) {
    setUf(`${item.id}-${item.nome}`);
    handleDialogClose();

  }

  function callCity(item) {
    setCity(item.nome)
    handleDialogClose();
  }

  return (

    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{input === 0 ? "Selecione o Estado" : "Selecione a Cidade"}</DialogTitle>
      <DialogContent>

        {list.length > 0 ? <MDBox>
          {input === 0 ? <UF UFList={list} selectUf={callUF} /> : <City cidadeList={cidadeList} selectCity={callCity} />}
        </MDBox> : null}

      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          handleDialogClose();
        }}>Sair</Button>


      </DialogActions>
    </Dialog>

  )

}

export default Location;