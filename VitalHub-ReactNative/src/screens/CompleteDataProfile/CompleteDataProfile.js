import { React, useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { UserImage } from "../Profile/style";
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { Input, TitleInput } from "../../components/Input/styles"
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";
import { ButtonNewImage } from "./style";

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

                <Title style={{ marginTop: 14 }}>Nome do Usuário</Title>
                <DefaultText fontSize={18}>Email do Usuário</DefaultText>

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                <Input
                    placeholder="04/05/1999"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                <Input
                    placeholder="452******-*"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                <Input
                    placeholder="983******"
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Endereço</TitleInput>
                <Input
                    placeholder="Rua Vicenso Silva, 987"
                />

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        <Input
                            placeholder="06548-909"
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        <Input
                            placeholder="Moema-SP"
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