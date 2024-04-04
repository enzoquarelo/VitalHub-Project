import { React, useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { UserImage } from "../Profile/style";
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { Input, TitleInput } from "../../components/Input/styles"
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CompleteDataProfile = ({ navigation }) => {
    useEffect(() => {

    }, [])

    return (
        <ScrollView>
            <Container>
                <StatusBar style="light" />

                <UserImage source={require('../../../assets/images/imageUser404.png')} style={{height: 275}} />

                <Title style={{ marginTop: 14 }}>Complete seu Perfil</Title>
                <DefaultText fontSize={18}>Preencha os campos com seus dados</DefaultText>

                <TitleInput style={{ marginTop: 30, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                <Input
                    placeholder="00/00/000"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                <Input
                    placeholder="000******-*"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                <Input
                    placeholder="000******"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Endereço</TitleInput>
                <Input
                    placeholder="Nome da rua, N°"
                />

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        <Input
                            placeholder="00000-000"
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        <Input
                            placeholder="Cidade"
                        />
                    </ContainerInputAndTitle>
                </Container>

                <CustomButton style={{ marginBottom: 20 }}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>
            </Container>
        </ScrollView>
    );
}