import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";


export const CreateAccount = ({ navigation }) => {
    return (
        <Container>
            <Logo />

            <Title style={{ marginTop: 45 }}>Criar conta</Title>

            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Insira seu endereço de e-mail e senha para realizar seu cadastro.
            </DefaultText>

            <Input
                placeholder="Email"
                style={{ marginBottom: 15, marginTop: 20 }}
            />

            <Input
                placeholder="Senha"
                style={{ marginBottom: 15}}
            />

            <Input
                placeholder="Confirmar Senha"
                style={{ marginBottom: 30 }}
            />

            <CustomButton onPress={() => {navigation.replace("Login")}}>
                <TitleButton>CADASTRAR</TitleButton>
            </CustomButton>

            <Links 
                colorLink={"#344F8F"} 
                fontLink={"MontserratAlternates_600SemiBold"} 
                fontSize={18}
                style={{textAlign: 'center', marginTop: 30}}
                onPress={() => {navigation.replace("Login")}}
            >
                Cancelar
            </Links>
        </Container>
    );
}