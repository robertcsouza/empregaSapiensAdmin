import React, { useState, useEffect, useMemo } from "react";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";


//Mui imports 

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Chip from '@mui/material/Chip';


//import masked 
import InputMask from 'react-input-mask';

//import redux
import { useSelector, useDispatch } from "react-redux";


//import formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateCompany } from "slices/userSlice";
import Location from "../locations";
import filterLocation from "../locations/filterLocation";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function PersonalForm({ callSnack }) {
  const dispatch = useDispatch();



  const [openLocation, setOpenLocation] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [changeInput, setChangeInput] = React.useState();
  const [ufId, setUfId] = React.useState(0);


  const status = useSelector(state => state.user.status)

  const company = useSelector(state => state.user.company)

  const handleDialogLocationOpen = () => { setOpenLocation(true); };
  const handleDialogLocationClose = () => { setOpenLocation(false); };

  const formik = useFormik({
    initialValues: {
      nome: !!company.data.nome ? company.data.nome : '',
      cnpj: !!company.data.cnpj ? company.data.cnpj : '',
      telefone: !!company.data.telefone ? company.data.telefone : '',
      residencial: !!company.data.residencial ? company.data.residencial : '',
      sobre: !!company.data.sobre ? company.data.sobre : '',
      responsavel: !!company.data.responsavel ? company.data.responsavel : '',
      ramo: !!company.data.ramo ? company.data.ramo : '',
      estado: !!company.data.endereco.estado ? company.data.endereco.estado : '',
      cidade: !!company.data.endereco.cidade ? company.data.endereco.cidade : '',
      bairro: !!company.data.endereco.bairro ? company.data.endereco.bairro : '',
      rua: !!company.data.endereco.rua ? company.data.endereco.rua : '',
      numero: !!company.data.endereco.numero ? company.data.endereco.numero : '',
      cep: !!company.data.endereco.cep ? company.data.endereco.cep : '',
    },

  });

  useEffect(() => {
    console.log("chamou o effect")
    setUfId(filterLocation(formik.values.estado).id)
  }, [formik.values.estado])

  async function update() {
    const payload = {
      perfil: {
        nome: formik.values.nome,
        cnpj: formik.values.cnpj,
        telefone: formik.values.telefone,
        residencial: formik.values.residencial,
        sobre: formik.values.sobre,
        responsavel: formik.values.responsavel,
        ramo: formik.values.ramo,
      },
      endereco: {
        estado: formik.values.estado,
        cidade: formik.values.cidade,
        bairro: formik.values.bairro,
        rua: formik.values.rua,
        numero: formik.values.numero,
        cep: formik.values.cep,
      },

    }
    const response = await dispatch(updateCompany(payload))
    callSnack(response);
  }

  function setUf(item) {
    setUfId(filterLocation(item).id)
    formik.setFieldValue('estado', item);
  }
  function setCity(item) {
    formik.setFieldValue('cidade', item);
  }

  const sx = { mr: 1, mb: 2 }
  const sxTextArea = { minWidth: 250 }
  const location = useMemo(() => <Location open={openLocation} handleDialogClose={handleDialogLocationClose} setUf={setUf} setCity={setCity} input={changeInput} id={ufId} />, [openLocation]);

  return (
    <div>
      {location}
      <MDBox mt={5} mb={1}>
        <MDInput variant="outlined" label="Nome da Empresa" className="input" id="nome"
          name="nome"
          onChange={formik.handleChange}
          value={formik.values.nome}
          sx={sx} />

      </MDBox>

      <MDBox mt={1} mb={1}>
        <MDInput variant="outlined" label="Responsavel" className="input" id="responsavel"
          name="responsavel"
          onChange={formik.handleChange}
          value={formik.values.responsavel}
          sx={sx} />

      </MDBox>

      <MDBox mt={1} mb={1}>
        <MDInput variant="outlined" label="CNPJ" className="input" id="cnpj"
          name="cnpj"
          onChange={formik.handleChange}
          value={formik.values.cnpj}
          sx={sx} />

      </MDBox>


      <MDBox mt={1} mb={1} className="container">
        <MDInput label="Sobre a Empresa" multiline rows={5} className="input" sx={sxTextArea}
          name="sobre"
          id="sobre"
          value={formik.values.sobre}
          onChange={formik.handleChange} /> </MDBox>


      <MDTypography variant="h6" fontWeight="medium">
        Contato </MDTypography>

      <MDBox mt={4} mb={2} className="container">
        <InputMask

          mask="(99) 999999999"
          value={formik.values.telefone}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Celular" className="input" sx={sx} id="telefone"
            name="telefone" />}
        </InputMask>
        <InputMask
          mask="(99) 99999999"
          value={formik.values.residencial}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Residencial" className="input" sx={sx} id="residencial"
            name="residencial" />}
        </InputMask>


      </MDBox>


      <MDTypography variant="h6" fontWeight="medium">
        Endereço </MDTypography>
      <MDBox mt={1} mb={1} className="container">
        <MDInput variant="outlined" label="Estado" className="input" sx={sx} id="estado" name="estado" readOnly onClick={() => { setChangeInput(0); handleDialogLocationOpen(); }}
          value={filterLocation(formik.values.estado).content} />
        <MDInput variant="outlined" label="Cidade" className="input" sx={sx} id="cidade" name="cidade" readOnly onClick={() => { setChangeInput(1); handleDialogLocationOpen(); }}
          value={formik.values.cidade} />
        <MDInput variant="outlined" label="Bairro" className="input" sx={sx} id="bairro" name="bairro" onChange={formik.handleChange}
          value={formik.values.bairro} />
      </MDBox>


      <MDBox mt={1} mb={1} className="container">
        <MDInput variant="outlined" label="Rua" className="input" sx={sx} id="rua" name="rua" onChange={formik.handleChange}
          value={formik.values.rua} />
        <MDInput variant="outlined" label="Numero" className="input" sx={sx} id="numero" name="numero" onChange={formik.handleChange}
          value={formik.values.numero} />
        <MDInput variant="outlined" label="Cep" className="input" sx={sx} id="cep" name="cep" onChange={formik.handleChange}
          value={formik.values.cep} />
      </MDBox>

      <MDBox mt={4} mb={4} className="container">
        <MDButton variant="gradient" color="success" size="small" className="bt" onClick={() => { update() }} >Salvar</MDButton>

      </MDBox>



    </div >
  );
}