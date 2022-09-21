// @mui icons

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

import { useSelector } from "react-redux";

import ProfileInfoCardNoEdit from "components/Cards/InfoCards/ProfileInfoCardNoEdit";
export default function PersonalInformation() {

    const user = useSelector(state => state.user)
    const habilidades = useSelector(state => state.habilidades);



    return (
        <div>
            <ProfileInfoCardNoEdit
                title="Sobre Você"
                description={user.profile.about ? user.profile.about : ''}
                habilidades={habilidades.status === 'sucess' ? habilidades.habilidades.data : []}
                info={{
                    Nome: user.profile.nome ? user.profile.nome : '',
                    "Data de Nascimento": user.profile.nascimento ? user.profile.nascimento : '',
                    "Estado civil": user.profile.estado_civil ? user.profile.estado_civil : '',
                    Sexo: user.profile.sexo ? user.profile.sexo : '',
                    Telefone: `${user.profile.telefone ? user.profile.telefone : ''} / ${user.profile.residencial ? user.profile.residencial : ''}`,
                    email: user.profile.email ? user.profile.email : '',
                    "Empregado Atualmente": user.profile.empregado === 1 ? 'Sim' : 'Não',
                    Estado: user.profile.endereco.estado ? user.profile.endereco.estado : '',
                    Cidade: user.profile.endereco.cidade ? user.profile.endereco.cidade : '',
                    Bairro: user.profile.endereco.bairro ? user.profile.endereco.bairro : '',
                    Rua: user.profile.endereco.rua ? user.profile.endereco.rua : '',
                    Número: user.profile.endereco.numero ? user.profile.endereco.numero.toString() : '',
                    Cep: user.profile.endereco.cep ? user.profile.endereco.cep.toString() : '',
                }}
                social={[
                    {
                        link: user.profile.linkedin ? user.profile.linkedin : '',
                        icon: <LinkedInIcon />,
                        color: "linkedin",
                    }, {
                        link: user.profile.facebook ? user.profile.facebook : '',
                        icon: <FacebookIcon />,
                        color: "facebook",
                    },

                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
            />
        </div>
    )

}