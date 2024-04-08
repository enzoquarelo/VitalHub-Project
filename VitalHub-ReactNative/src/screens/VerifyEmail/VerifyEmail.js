import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";

import { TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons';

export const VerifyEmail = ({ navigation }) => {
    return (
        <Container>
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: "#49B3BA15", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 60, left: 20 }} onPress={() => { navigation.navigate("Login") }}>
                <AntDesign name="plus" size={24} color="#34898F" style={{transform: 'rotate(45deg)'}} />
            </TouchableOpacity>

            <Logo />

            <Title style={{ marginTop: 45 }}>Verifique seu e-mail</Title>
            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Digite o código de 4 dígitos enviado para
            </DefaultText>
            <DefaultText widthText={"88%"} fontSize={18} colorText={"#496BBA"}>
                username@email.com
            </DefaultText>

            <Container
                widthContainer={"88%"}
                heightContainer={"62px"}
                flexDirection={"row"}
                justifyContent={"space-around"}
                style={{
                    marginTop: 15,
                    marginBottom: 20
                }}
            >
                <Input
                    widthInput={"60px"}
                    heightInput={"60px"}
                    fontSize={40}
                    paddingInput={"0px"}
                    placeholder="0"
                    textAlign="center"
                />
                <Input
                    widthInput={"60px"}
                    heightInput={"60px"}
                    fontSize={40}
                    paddingInput={"0px"}
                    placeholder="0"
                    textAlign="center"
                />
                <Input
                    widthInput={"60px"}
                    heightInput={"60px"}
                    fontSize={40}
                    paddingInput={"0px"}
                    placeholder="0"
                    textAlign="center"
                />
                <Input
                    widthInput={"60px"}
                    heightInput={"60px"}
                    fontSize={40}
                    paddingInput={"0px"}
                    placeholder="0"
                    textAlign="center"
                />
            </Container>

            <CustomButton onPress={() => {navigation.replace("RedefinePassword")}}>
                <TitleButton>ENTRAR</TitleButton>
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontLink={"MontserratAlternates_600SemiBold"}
                fontSize={18}
                style={{ textAlign: 'center', marginTop: 30 }}
            >
                Reenviar Código
            </Links>
        </Container>
    );
}