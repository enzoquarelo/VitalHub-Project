import { FontAwesome } from '@expo/vector-icons'
import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText } from './style'
import { DefaultText } from '../DefaultText/DefaultText'
import { Title } from '../Title/style'

import { UserProfilePhotoHeaderContain } from './style'

import { userDecodeToken } from '../../utils/auth'
import { useEffect, useState } from 'react'

export const Header = ({imageHeader}) => {
    const [userName, setUserName] = useState('');

    async function profileLoad(){
        const token = await userDecodeToken();

        console.log(token)

        const userNameToken = token.name;
        setUserName(userNameToken);
    }

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