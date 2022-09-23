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

//import masked 
import InputMask from 'react-input-mask';

//import redux
import { useSelector, useDispatch } from "react-redux";


//import formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfile } from "slices/userSlice";
import { Paper } from "@mui/material";
import Location from "layouts/profile/components/locations";
import filterLocation from "layouts/profile/components/locations/filterLocation";




export default function CreateCompanyForm({ onUpdateUser }) {
  const dispatch = useDispatch();


  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);

  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleDialogLocationOpen = () => { setOpenLocation(true); };
  const handleDialogLocationClose = () => { setOpenLocation(false); };
  const [openLocation, setOpenLocation] = React.useState(false);
  const [changeInput, setChangeInput] = useState();
  const [ufId, setUfId] = useState(0);



  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Atualização de Perfil"
      content="Informações Atualizadas com sucesso"
      dateTime="Agora"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Atualização Perfil"
      content="Não foi possivel atualizar as informações."
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );


  async function update() {


  }


  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });

  const formik = useFormik({
    initialValues: {
      nome: '',
      cnpj: '',
      sobre: '',
      telefone: '',
      residencial: '',
      responsavel: '',
      ramo: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      cep: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const sx = { mr: 1, mb: 2 }

  function setUf(item) {
    formik.setFieldValue('estado', item);
  }
  function setCity(item) {
    formik.setFieldValue('cidade', item);
  }

  const location = useMemo(() => <Location open={openLocation} handleDialogClose={handleDialogLocationClose} setUf={setUf} setCity={setCity} input={changeInput} id={filterLocation(formik.values.estado).id} />, [openLocation]);

  return (
    <div className="container align-self-center" style={{ height: 450 }} >
      {location}
      <div style={{ maxHeight: 450, overflow: 'auto' }}>
        {renderSuccessSB}
        {renderErrorSB}
        <MDTypography variant="h6" fontWeight="medium" mt={2} mb={1} ml={10} mr={10}>
          Informações Pessoais </MDTypography >
        <MDBox mt={2} mb={1} ml={10} mr={10}>
          <MDInput variant="standard" label="Nome da empresa" className="input" id="nome"
            name="nome"
            onChange={formik.handleChange}
            value={formik.values.nome}
            sx={sx} fullWidth />

        </MDBox>


        <MDBox mt={1} mb={1} ml={10} mr={10}>


          <InputMask

            mask="99.999.999/9999-99"
            value={formik.values.cnpj}
            onChange={formik.handleChange}
            disabled={false}
            maskChar=" "
          >
            {() => <MDInput variant="standard" label="CNPJ" className="input" sx={sx} name="cnpj" id="cnpj"
              fullWidth />}
          </InputMask>


        </MDBox>
        <MDBox mt={1} mb={1} ml={10} mr={10}>
          <MDInput variant="standard" label="Responsável" className="input" sx={sx} name="responsavel" id="responsavel" onChange={formik.handleChange}
            value={formik.values.responsavel} fullWidth />

        </MDBox>

        <MDBox ml={10} mr={10}>
          <FormControl mt={4} mb={2} ml={10} mr={10} sx={{ minWidth: 300, marginTop: 2 }} >
            <InputLabel id="demo-simple-select-label">Ramo de Atividade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Ramo"
              name="ramo"
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.ramo}
              sx={{ padding: 1, height: 44 }}

            >
              <MenuItem value="tecnologia">Tecnologia</MenuItem>
              <MenuItem value="direito">Direito</MenuItem>
              <MenuItem value="pedagogia">Pedagogia</MenuItem>
            </Select>
          </FormControl>

        </MDBox>

        <MDTypography variant="h6" fontWeight="medium" ml={10} mr={10} mt={1} mb={1}>
          Contato </MDTypography>

        <MDBox mt={1} mb={1} ml={10} mr={10} className="container">
          <InputMask

            mask="(99) 999999999"
            value={formik.values.telefone}
            onChange={formik.handleChange}
            disabled={false}
            maskChar=" "
          >
            {() => <MDInput variant="standard" label="Celular" className="input" sx={sx} id="telefone"
              name="telefone" />}
          </InputMask>
          <InputMask

            mask="(99) 99999999"
            value={formik.values.residencial}
            onChange={formik.handleChange}
            disabled={false}
            maskChar=" "
          >
            {() => <MDInput variant="standard" label="Residencial" className="input" sx={sx} id="residencial"
              name="residencial" />}
          </InputMask>


        </MDBox>

        <MDTypography variant="h6" fontWeight="medium" ml={10} mr={10}>
          Endereço </MDTypography>
        <MDBox mt={1} mb={1} ml={10} mr={10} className="container">
          <MDInput variant="standard" label="Estado" className="input" sx={sx} id="estado" name="estado" readOnly onClick={() => { setChangeInput(0); handleDialogLocationOpen(); }}
            value={filterLocation(formik.values.estado).content} />
          <MDInput variant="standard" label="Cidade" className="input" sx={sx} id="cidade" name="cidade" readOnly onClick={() => { setChangeInput(1); handleDialogLocationOpen(); }} value={formik.values.cidade} />
          <MDInput variant="standard" label="Bairro" className="input" sx={sx} id="bairro" name="bairro" onChange={formik.handleChange}
            value={formik.values.bairro} />
        </MDBox>


        <MDBox mt={1} mb={1} ml={10} mr={10} className="container">
          <MDInput variant="standard" label="Rua" className="input" sx={sx} id="rua" name="rua" onChange={formik.handleChange}
            value={formik.values.rua} />
          <MDInput variant="standard" label="Numero" className="input" sx={sx} id="numero" name="numero" onChange={formik.handleChange}
            value={formik.values.numero} />


          <MDInput variant="standard" label="Cep" className="input" sx={sx} id="cep" name="cep" onChange={formik.handleChange}
            value={formik.values.cep} />
        </MDBox>

        <MDBox mt={3} mb={1} textAlign="center">
          <MDButton variant="gradient" color="info" size="small" onClick={() => { onUpdateUser(formik.values); }}>Salvar</MDButton>
        </MDBox>

      </div>



    </div>
  );
}