import { FontAwesome } from '@expo/vector-icons'
import { HeaderContainer, HeaderUserProfile, HeaderUserProfileText } from './style'
import { DefaultText } from '../DefaultText/DefaultText'
import { Title } from '../Title/style'
import { UserProfilePhotoHeaderContain } from './style'

export const Header = ({imageHeader, profileName}) => {
    return (
        <HeaderContainer>

            <HeaderUserProfile>

                <UserProfilePhotoHeaderContain source={{ uri: imageHeader}} />

                <HeaderUserProfileText style={{ marginTop: 30 }}>

                    <DefaultText fontSize={16} colorTxt={"#4E4B59"}>Bem-Vindo!</DefaultText>
                    <Title style={{ fontSize: 15, color: 'white' }}>{profileName}</Title>

                </HeaderUserProfileText>

            </HeaderUserProfile>

            <FontAwesome style={{ marginTop: 30 }} name="bell" size={18} color="white" />

        </HeaderContainer>
    )
}