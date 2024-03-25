import { React, useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { InputDisable, TitleInput } from "../../components/Input/styles"
import { UserImage } from "./style";
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    async function profileLoad(){
        const token = await userDecodeToken();

        console.log(token)

        const userNameToken = token.name;
        const userEmailToken = token.email;
        setUserName(userNameToken);
        setUserEmail(userEmailToken);
    }

    async function deleteToken() {
        await AsyncStorage.removeItem('token');

        navigation.navigate("Login")

        console.log(token)
    }

    useEffect(()=> {
        profileLoad();
    }, [])

    return (
        <ScrollView>
            <Container>
                <StatusBar style="light" />

                <UserImage source={require('../../../assets/images/doctorImage_temp.png')} />

                <Title style={{marginTop: 14}}>{userName}</Title>
                <DefaultText fontSize={18}>{userEmail}</DefaultText>

                <TitleInput style={{marginTop: 14, marginBottom: 5}}>Data de Nascimento</TitleInput>
                <InputDisable
                    placeholder="04/05/1999"
                />

                <TitleInput style={{marginTop: 14, marginBottom: 5}}>CPF</TitleInput>
                <InputDisable
                    placeholder="983******"
                />

                <TitleInput style={{marginTop: 14, marginBottom: 5}}>Endereço</TitleInput>
                <InputDisable
                    placeholder="Rua Vicenso Silva, 987"
                />

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{marginTop: 14, marginBottom: 40}}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        <InputDisable
                            placeholder="06548-909"
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        <InputDisable
                            placeholder="Moema-SP"
                        />
                    </ContainerInputAndTitle>
                </Container>
                
                <CustomButton style={{marginBottom: 20}}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>

                <CustomButton>
                    <TitleButton>EDITAR</TitleButton>
                </CustomButton>

                <ButtonDisable widthButton={60} style={{marginTop: 20, marginBottom: 20}} onPress={() => {deleteToken()}}>
                    <TitleButton>SAIR DO APP</TitleButton>
                </ButtonDisable>
            </Container>
        </ScrollView>
    );
}