import React, { useState, useEffect } from "react";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import api from "../../../../service/api";

import { useDispatch } from "react-redux";

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
import { useSelector } from "react-redux";


//import formik
import { useFormik } from 'formik';
import * as yup from 'yup';




export default function PersonalForm() {

  const user = useSelector(state => state.user)



  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });

  const formik = useFormik({
    initialValues: {
      nome: user.profile.user.nome ? user.profile.user.nome : '',
      dataNascimento: user.profile.user.nascimento ? user.profile.user.nascimento : '',
      estadoCivil: user.profile.user.estado_civil ? user.profile.user.estado_civil : '',
      sobre: user.profile.user.about ? user.profile.user.about : '',
      sexo: user.profile.user.sexo ? user.profile.user.sexo : '',
      celular: user.profile.user.telefone ? user.profile.user.telefone : '',
      residencial: user.profile.user.residencial ? user.profile.user.residencial : '',
      email: user.profile.user.email ? user.profile.user.email : '',
      empregado: user.profile.user.empregado ? user.profile.user.empregado : '',
      estado: user.profile.user.endereco.estado ? user.profile.user.endereco.estado : '',
      cidade: user.profile.user.endereco.cidade ? user.profile.user.endereco.cidade : '',
      bairro: user.profile.user.endereco.bairro ? user.profile.user.endereco.bairro : '',
      rua: user.profile.user.endereco.rua ? user.profile.user.endereco.rua : '',
      numero: user.profile.user.endereco.nome ? user.profile.user.endereco.nome : '',
      cep: user.profile.user.endereco.cep ? user.profile.user.endereco.cep : '',
      linkedin: user.profile.user.linkedin ? user.profile.user.linkedin : '',
      facebook: user.profile.user.facebook ? user.profile.user.facebook : ''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const sx = { mr: 1, mb: 2 }
  const sxTextArea = { minWidth: 250 }



  return (
    <div>

      <MDBox mt={5} mb={1}>
        <MDInput variant="outlined" label="nome" className="input" id="nome"
          name="nome"
          onChange={formik.handleChange}
          value={formik.values.nome}
          sx={sx} />

        <InputMask
          mask="99/99/9999"

          value={formik.values.dataNascimento}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Data Nascimento" className="input" sx={sx} name="dataNascimento"
            id="dataNascimento" />}
        </InputMask>
        <MDBox mt={1} mb={2} sx={{ minWidth: 200 }}>
          <FormControl sx={{ minWidth: 120 }} >
            <InputLabel id="demo-simple-select-label">Estado Civíl</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="estadoCivil"
              name="estadoCivil"
              value={formik.values.estadoCivil}
              onChange={formik.handleChange}
              label="Estado Civíl"
              sx={{ padding: 1 }}

            >
              <MenuItem value="solteiro">Solteiro</MenuItem>
              <MenuItem value="casado">Casado</MenuItem>
              <MenuItem value="separado">Separado</MenuItem>
              <MenuItem value="divorciado">Divorciado</MenuItem>
              <MenuItem value="viuvo">Viúvo</MenuItem>
            </Select>
          </FormControl>
        </MDBox>
      </MDBox>


      <MDBox mt={1} mb={1} className="container">
        <MDInput label="Sobre Você" multiline rows={5} className="input" sx={sxTextArea}
          name="sobre"
          id="sobre"
          value={formik.values.sobre}
          onChange={formik.handleChange} />

      </MDBox>




      <MDBox mt={1} mb={4} className="container">
        <FormControl className="radioForm">
          <FormLabel id="demo-radio-buttons-group-label">Sexo</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="sexo"
            id="sexo"
            value={formik.values.sexo}
            onChange={formik.handleChange}
          >
            <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" sx={sx} />
            <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" sx={sx} />
            <FormControlLabel value="Outros" control={<Radio />} label="Outos" sx={sx} />
          </RadioGroup>
        </FormControl>
      </MDBox>


      <MDTypography variant="h6" fontWeight="medium">
        Contato </MDTypography>

      <MDBox mt={4} mb={2} className="container">
        <InputMask

          mask="(99) 999999999"
          value={formik.values.celular}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Celular" className="input" sx={sx} id="celular"
            name="celular" />}
        </InputMask>
        <InputMask
          mask="(99) 999999999"
          value={formik.values.residencial}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Residencial" className="input" sx={sx} id="residencial"
            name="residencial" />}
        </InputMask>

        <MDInput variant="outlined" label="Email" className="input" sx={sx} name="email" id="email" onChange={formik.handleChange}
          value={formik.values.email} />
      </MDBox>

      <MDBox mt={5} mb={4} className="container">
        <FormControl className="radioForm">
          <FormLabel id="demo-radio-buttons-group-label">Está empregado atualmente ?</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={0}
            onChange={formik.handleChange}
            value={formik.values.empregado}
            name="empregado">
            <FormControlLabel value={0} control={<Radio />} label="Não" />
            <FormControlLabel value={1} control={<Radio />} label="Sim" />
          </RadioGroup>
        </FormControl>
      </MDBox>
      <MDTypography variant="h6" fontWeight="medium">
        Endereço </MDTypography>
      <MDBox mt={1} mb={1} className="container">
        <MDInput variant="outlined" label="Estado" className="input" sx={sx} id="estado" name="estado" onChange={formik.handleChange}
          value={formik.values.estado} />
        <MDInput variant="outlined" label="Cidade" className="input" sx={sx} id="cidade" name="cidade" onChange={formik.handleChange}
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

      <MDTypography variant="h6" fontWeight="medium">
        Rede Sociais </MDTypography>

      <MDBox mt={4} mb={4} className="container">
        <MDInput variant="outlined" label="LinkedIn" className="input" sx={sx} id="linkedin" name="linkedin" onChange={formik.handleChange}
          value={formik.values.linkedin} />
        <MDInput variant="outlined" label="Facebook" className="input" sx={sx} id="facebook" name="facebook" onChange={formik.handleChange}
          value={formik.values.facebook} />
      </MDBox>


      <MDBox mt={4} mb={4} className="container">
        <MDButton variant="gradient" color="success" size="large" className="bt" onClick={() => { alert(JSON.stringify(formik.values.empregado)) }} >Salvar</MDButton>

      </MDBox>



    </div>
  );
}