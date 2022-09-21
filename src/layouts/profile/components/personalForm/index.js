import React, { useState, useEffect } from "react";
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
import SnackBarComponent from "components/SnackBarComponent";


//import masked 
import InputMask from 'react-input-mask';

//import redux
import { useSelector, useDispatch } from "react-redux";


//import formik
import { useFormik } from 'formik';
import * as yup from 'yup';
import { updateProfile } from "slices/userSlice";
import { salvarHabilidades, loadHabilidades, deleteHabilidade } from "slices/habilidadesSlice";
import SearchList from "components/SearchList";
import { createSkills } from "slices/habilidadesSlice";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function PersonalForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const habilidades = useSelector(state => state.habilidades);
  const skills = useSelector(state => state.habilidades.skills);
  console.log(skills)
  const [snackContent, setSnackContent] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const closeSnack = () => setSnackOpen(false);
  function openSnack(content) {
    setSnackContent(content)
    setSnackOpen(true)
  };

  const handleDialogOpen = () => { setOpen(true); };
  const handleDialogClose = () => { setOpen(false); };

  const [open, setOpen] = React.useState(false);

  const itemList = [
    { id: 1, nome: "Flutter", course: 194 },
    { id: 2, nome: "Java", course: 194 },
    { id: 3, nome: "Gerencia de banco de dados", course: 194 },


  ];






  async function adicionarConhecimento(conhecimentoValue) {


    const conhecimento = conhecimentoValue.nome

    if (!!conhecimentoValue.isNew) {
      dispatch(createSkills({ nome: conhecimento }))
    }

    if (habilidades.habilidades.data.length > 4) {
      openSnack({ type: 'warning', title: "Maximo de Habilidades", body: "Maximo de habilidades atingido, nao é possivel adicionar mais", dateTime: "1 min ago" });
    } else {
      dispatch(salvarHabilidades({ conhecimento }));
    }

    //dispatch(loadHabilidades());

    handleDialogClose();
  }

  async function removerConhecimento(item) {

    dispatch(deleteHabilidade(item.id))

  }


  async function update() {
    const payload = {
      perfil: {
        nome: formik.values.nome,
        nascimento: formik.values.nascimento,
        estado_civil: formik.values.estadoCivil,
        about: formik.values.about,
        sexo: formik.values.sexo,
        telefone: formik.values.telefone,
        residencial: formik.values.residencial,
        email: formik.values.email,
        empregado: formik.values.empregado,
        linkedin: formik.values.linkedin,
        facebook: formik.values.facebook
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

    console.log(payload)
    const response = await dispatch(updateProfile(payload))



    if (response.type === "profile/updated/rejected") {
      openSnack({ type: 'error', title: "Atualizar Informações", body: "Não foi possivel atualizar as informações", dateTime: "1 min ago" });
    } else {
      openSnack({ type: 'success', title: "Informaçoes atualizadas", body: "Informaçoes atualizadas com sucesso", dateTime: "1 min ago" });

    }

  }


  const validationSchema = yup.object({
    email: yup
      .string('Insira seu email')
      .email('Insira um email Válido')
      .required('Email obrigatório'),

  });

  const formik = useFormik({
    initialValues: {
      nome: user.profile.nome ? user.profile.nome : '',
      nascimento: user.profile.nascimento ? user.profile.nascimento : '',
      estadoCivil: user.profile.estado_civil ? user.profile.estado_civil : '',
      about: user.profile.about ? user.profile.about : '',
      sexo: user.profile.sexo ? user.profile.sexo : '',
      telefone: user.profile.telefone ? user.profile.telefone : '',
      residencial: user.profile.residencial ? user.profile.residencial : '',
      email: user.profile.email ? user.profile.email : '',
      empregado: user.profile.empregado ? user.profile.empregado : 0,
      estado: user.profile.endereco.estado ? user.profile.endereco.estado : '',
      cidade: user.profile.endereco.cidade ? user.profile.endereco.cidade : '',
      bairro: user.profile.endereco.bairro ? user.profile.endereco.bairro : '',
      rua: user.profile.endereco.rua ? user.profile.endereco.rua : '',
      numero: user.profile.endereco.numero ? user.profile.endereco.numero : '',
      cep: user.profile.endereco.cep ? user.profile.endereco.cep : '',
      linkedin: user.profile.linkedin ? user.profile.linkedin : '',
      facebook: user.profile.facebook ? user.profile.facebook : ''

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
      <SnackBarComponent content={snackContent} open={snackOpen} closeSnack={closeSnack} />
      <MDBox mt={5} mb={1}>
        <MDInput variant="outlined" label="nome" className="input" id="nome"
          name="nome"
          onChange={formik.handleChange}
          value={formik.values.nome}
          sx={sx} />

        <InputMask
          mask="99/99/9999"

          value={formik.values.nascimento}
          onChange={formik.handleChange}
          disabled={false}
          maskChar=" "
        >
          {() => <MDInput variant="outlined" label="Data Nascimento" className="input" sx={sx} name="nascimento"
            id="nascimento" />}
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
          name="about"
          id="about"
          value={formik.values.about}
          onChange={formik.handleChange} />

      </MDBox>
      <MDTypography variant="h6" fontWeight="medium">
        Habilidades </MDTypography>
      <MDBox mt={1} mb={1} className="container">

        <Button variant="contained" endIcon={<AddIcon color="white" />} onClick={handleDialogOpen}>
          <MDTypography variant="caption" color="white">
            Adicionar </MDTypography>
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Habilidades"}</DialogTitle>
          <DialogContent>

            <MDBox>
              <SearchList itemList={skills.data} call={adicionarConhecimento} />
            </MDBox>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Sair</Button>

          </DialogActions>
        </Dialog>

      </MDBox>

      <MDBox mt={2} mb={2}>

        {habilidades.status === 'sucess' ? habilidades.habilidades.data.map((item) => {

          return (<Chip key={item.id} sx={{ ml: 1, mr: 1, mt: 1, mb: 1 }}
            label={item.conhecimento}
            onDelete={() => { removerConhecimento(item) }}
          />)
        }) : <MDBox></MDBox>}

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
        <MDButton variant="gradient" color="success" size="large" className="bt" onClick={() => { update() }} >Salvar</MDButton>

      </MDBox>



    </div >
  );
}



/*
<MDInput variant="outlined" label="Adicionar Abilidades" className="input" id="conhecimento"
                name="conhecimento"
                onChange={(event) => { setConhecimentoInput(event.target.value) }}
                value={conhecimentoInput}
                sx={sx} />
                <Button variant="contained" endIcon={<AddIcon color="white" />} onClick={adicionarConhecimento}>
                  <MDTypography variant="caption" color="white">
                    Adicionar </MDTypography>
                </Button>
*/