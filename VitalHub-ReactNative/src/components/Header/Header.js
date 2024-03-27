import { useEffect, useState } from 'react'
import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText, UserProfilePhotoHeaderContain } from './style'

import { FontAwesome } from '@expo/vector-icons'

//import components
import { DefaultText } from '../DefaultText/DefaultText'
import { Title } from '../Title/style'

import { userDecodeToken } from '../../utils/auth'


export const Header = ({imageHeader}) => {
    //state para guardar e manipular o dado retirado do token
    const [userName, setUserName] = useState('');

    async function profileLoad(){
        //chama a função da auth para termos os dados do token
        const token = await userDecodeToken();

        //pega e guarda o name retirado pelo token
        const userNameToken = token.name;
        setUserName(userNameToken);
    }


    //chama o useEffect para que a função rode assim que a tela onde o componente se encontra for atualizada
    useEffect(()=> {
        profileLoad();
    }, [])

    return (
        <HeaderContainer>

            <HeaderUserProfile>

                <UserProfilePhotoHeaderContain source={{ uri: imageHeader}} />

                <HeaderUserProfileText style={{ marginTop: 30 }}>

                    <DefaultText fontSize={16} colorTxt={"#4E4B59"}>Bem-Vindo!</DefaultText>
                    <Title style={{ fontSize: 15, color: 'white' }}>{userName}</Title>

                </HeaderUserProfileText>

            </HeaderUserProfile>

            <FontAwesome style={{ marginTop: 30 }} name="bell" size={18} color="white" />

        </HeaderContainer>
    )
}