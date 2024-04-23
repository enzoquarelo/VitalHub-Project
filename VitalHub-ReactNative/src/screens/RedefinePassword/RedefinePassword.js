import { React, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";

import { TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons';

export const RedefinePassword = ({ navigation }) => {
    return (
        <Container>
            <StatusBar/>
            
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: "#49B3BA15", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 40, left: 20 }} onPress={() => { navigation.navigate("Login") }}>
                <AntDesign name="plus" size={24} color="#34898F" style={{ transform: 'rotate(45deg)' }} />
            </TouchableOpacity>

            <Logo />

            <Title style={{ marginTop: 45 }}>Redefinir senha</Title>

            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Insira e confirme a sua nova senha
            </DefaultText>

            <Input
                placeholder="Nova Senha"
                style={{ marginBottom: 15, marginTop: 20 }}
            />

            <Input
                placeholder="Confirmar nova senha"
                style={{ marginBottom: 30 }}
            />

            <CustomButton onPress={() => {navigation.replace("Login")}}>
                <TitleButton>CONFIRMAR NOVA SENHA</TitleButton>
            </CustomButton>
        </Container>
    );
}