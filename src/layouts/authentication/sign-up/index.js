import * as React from 'react';
// react-router-dom components
import { useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";


//import material UI 

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';


// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

//components 

import CreateUserForm from './components/CreateUserForm';
import CreateCompanyForm from './components/CreateCompanyForm';
import Convenio from './components/Convenio';
import MDSnackbar from "components/MDSnackbar";
import { useDispatch } from 'react-redux';
import { updateCompany, create } from "slices/userSlice";




function Cover() {
  const steps = ['Email e Senha', 'Informações Pessoais', 'Convênio'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [successSB, setSuccessSB] = React.useState(false);
  
  const dispatch = useDispatch();


  let navigate = useNavigate();
  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const [content, setContent] = React.useState("")

  async function handleCreate(createUser) {
    // setCreateUser(createUser);
    const { email, senha: password, repetirSenha, termos } = createUser;

    try {
      if (password !== repetirSenha || !password || !repetirSenha) {
        throw "Senhas diferentes";
      }

      if (password.length < 6) {
        throw "Senhas Muito Fraca";
      }

      if (!termos) {
        throw "Necessário Aceitar os termos de Uso";
      }

      const payload = { email, password };

      const result = await dispatch(create(payload));

      if (!!result.payload.error) {
        throw result.payload.error;
      }

      openSuccessSB();
      handleNext();

    } catch (error) {

      setContent(error.toString())
      openErrorSB();

      return;
    }



  }

  async function handleUpdate(updateUser) {
    // setCreateUser(createUser);

    try {
      const {
        nome,
        cnpj,
        sobre,
        telefone,
        residencial,
        responsavel,
        ramo,
        estado,
        cidade,
        bairro,
        rua,
        numero,
        cep,
      } = updateUser
      const perfil = { nome, cnpj, telefone, residencial, sobre, responsavel, ramo };
      const endereco = { estado, cidade, bairro, rua, numero, cep };

      const payload = { perfil, endereco };


      const result = await dispatch(updateCompany(payload));



      if (!!result.payload.error) {
        throw "Não foi possivel executar a ação";
      }
      openSuccessSB();
      handleNext();

    } catch (error) {
      setContent(error.toString())
      openErrorSB();
    }


  }



  const handleNext = () => {



    if (activeStep === steps.length - 1) {

      //navigate('/dashboard')
    } else {

      setActiveStep((prevActiveStep) => prevActiveStep + 1);

    }


  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  function render(step) {
    switch (step) {
      case 0:
        
        return <CreateUserForm onCreateUser={handleCreate} />;

      case 1:

        return <CreateCompanyForm onUpdateUser={handleUpdate} />

      case 2:
        return <Convenio />

      default:
        return (<div>Step debug error</div>)

    }
  }

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Erro ao Cadastrar"
      content={content}
      dateTime="1 min ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Cadastrada com sucesso"
      content="Empresa foi Cadastrada com sucesso!"
      dateTime="Agora"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );
  return (
    <CoverLayout image={bgImage} sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      {renderErrorSB}
      {renderSuccessSB}
     

      <Card pt={4} pb={5} px={3} sx={{ width: "40%", minWidth: 350 }}>

        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label} color="warning">
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <React.Fragment>
            {render(activeStep)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />

              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Voltar
              </Button>

            </Box>
          </React.Fragment>

        </Box>


      </Card>
    </CoverLayout>
  );
}

export default Cover;

/*

<Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Salvar' : 'Avançar'}
              </Button>

*/