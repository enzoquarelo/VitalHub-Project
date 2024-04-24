import { useEffect, useState } from 'react'
import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText, UserProfilePhotoHeaderContain } from './style'

import { FontAwesome } from '@expo/vector-icons'

//import components
import { DefaultText } from '../DefaultText/DefaultText'
import { Title } from '../Title/style'

import { userDecodeToken } from '../../utils/auth'
import api from '../../service/service'


export const Header = () => {
    //state para guardar e manipular o dado retirado do token
    const [userName, setUserName] = useState('');
    const [userID, setUserId] = useState('');

    const [userPhotoUrl, setUserPhotoUrl] = useState('');

    async function profileLoad() {
        //chama a função da auth para termos os dados do token
        const token = await userDecodeToken();

        //pega e guarda o name retirado pelo token
        const userNameToken = token.name;
        const userIdToken = token.jti;
        setUserName(userNameToken);
        setUserId(userIdToken);
    }

    async function userPhotoLoad() {
        if (userID) {
            try {
                const response = await api.get(`/Usuario/BuscarPorId?id=${userID}`);

                setUserPhotoUrl(response.data.foto);
            } catch (error) {
                console.error('Erro ao buscar a foto do usuário:', error);
            }
        }
    }


    //chama o useEffect para que a função rode assim que a tela onde o componente se encontra for atualizada
    useEffect(() => {
        profileLoad();
        userPhotoLoad();
    }, [userID])

    return (
        <HeaderContainer>

            <HeaderUserProfile>

                <UserProfilePhotoHeaderContain source={{ uri: userPhotoUrl }} />

                <HeaderUserProfileText style={{ marginTop: 30 }}>

                    <DefaultText fontSize={16} colorTxt={"#4E4B59"}>Bem-Vindo!</DefaultText>
                    <Title style={{ fontSize: 15, color: 'white' }}>{userName.substring(0, 12)}</Title>

                </HeaderUserProfileText>

            </HeaderUserProfile>

            <FontAwesome style={{ marginTop: 30 }} name="bell" size={18} color="white" />

        </HeaderContainer>
    )
}