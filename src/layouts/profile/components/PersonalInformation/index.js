// @mui icons

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useSelector } from "react-redux";

import ProfileInfoCardNoEdit from "components/Cards/InfoCards/ProfileInfoCardNoEdit";
import filterLocation from "../locations/filterLocation";
export default function PersonalInformation() {



    const status = useSelector(state => state.user.status)
    const company = useSelector(state => state.user.company)

    if (status === 'sucess' && !!company) {

        let empresa = company.data

        return (
            <div>
                <ProfileInfoCardNoEdit
                    title="Sobre Empresa"
                    description={!!empresa.sobre ? empresa.sobre : ''}
                    habilidades={[]}
                    info={{
                        Nome: !!empresa.nome ? empresa.nome : '',
                        Cnpj: !!empresa.cnpj ? empresa.cnpj : '',
                        Telefone: `${!!empresa.telefone ? empresa.telefone : ''} / ${empresa.residencial ? empresa.residencial : ''}`,
                        Convenio: !!empresa.convenio === 1 ? 'Sim' : 'Não',
                        Estado: !!empresa.endereco.estado ? filterLocation(empresa.endereco.estado).content : '',
                        Cidade: !!empresa.endereco.cidade ? empresa.endereco.cidade : '',
                        Bairro: !!empresa.endereco.bairro ? empresa.endereco.bairro : '',
                        Rua: !!empresa.endereco.rua ? empresa.endereco.rua : '',
                        Numero: !!empresa.endereco.numero ? empresa.endereco.numero.toString() : '',
                        Cep: !!empresa.endereco.cep ? empresa.endereco.cep.toString() : '',
                    }}
                    social={[]}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                />
            </div>
        )


    } else {

        return (<div></div>)
    }






}