import { useEffect, useState } from 'react';
import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText, UserProfilePhotoHeaderContain } from './style';
import { FontAwesome } from '@expo/vector-icons';

// Import components
import { DefaultText } from '../DefaultText/DefaultText';
import { Title } from '../Title/style';
import { userDecodeToken } from '../../utils/auth';
import api from '../../service/service';

export const Header = () => {
    const [userName, setUserName] = useState('');
    const [userID, setUserId] = useState('');
    const [userPhotoUrl, setUserPhotoUrl] = useState('');

    async function profileLoad() {
        const token = await userDecodeToken();
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

    useEffect(() => {
        profileLoad();
        userPhotoLoad();
    });

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
    );
};
