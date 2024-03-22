import { React, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { InputDisable, TitleInput } from "../../components/Input/styles"
import { UserImage } from "./style";

export const Profile = ({ navigation }) => {
    return (
        <ScrollView>
            <Container>
                <StatusBar style="light" />

                <UserImage source={require('../../../assets/images/doctorImage_temp.png')}/>

                <Title>Nome do Usuário</Title>
                <DefaultText fontSize={18}>email do usuário</DefaultText>

                <TitleInput>Data de Nascimento</TitleInput>
                <InputDisable
                    placeholder="04/05/1999"
                />

                <TitleInput>CPF</TitleInput>
                <InputDisable
                    placeholder="983******"
                />

                <TitleInput>Endereço</TitleInput>
                <InputDisable
                    placeholder="Rua Vicenso Silva, 987"
                />
            </Container>
        </ScrollView>
    );
}