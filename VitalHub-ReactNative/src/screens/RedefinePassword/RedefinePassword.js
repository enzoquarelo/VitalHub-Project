import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import api from "../../service/service";

import { TouchableOpacity } from "react-native";

import { AntDesign } from '@expo/vector-icons';

export const RedefinePassword = ({ navigation, route }) => {
    const [senha, setSenha] = useState("")
    const [confirmar, setConfirmar] = useState("")

  async function AtualizarSenha() {
        if (senha === confirmar) {
            await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                senhaNova : senha
            }).then(() => {
                navigation.replace("Login")
            }).catch(error => {
                console.log(error);
            })
        }
    }

    return (
        <Container>
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: "#49B3BA15", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 60, left: 20 }} onPress={() => { navigation.navigate("Login") }}>
                <AntDesign name="plus" size={24} color="#34898F" style={{ transform: 'rotate(45deg)' }} />
            </TouchableOpacity>

            <Logo />

            <Title style={{ marginTop: 45 }}>Redefinir senha</Title>

            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Insira e confirme a sua nova senha
            </DefaultText>

            <Input
                placeholder="Nova Senha" secureTextEntry={true}
                style={{ marginBottom: 15, marginTop: 20 }}
                value={senha}
                onChangeText={(text) => setSenha(text)}
            />

            <Input
                placeholder="Confirmar nova senha" secureTextEntry={true}
                style={{ marginBottom: 30 }}
                value={confirmar}
                onChangeText={(text) => setConfirmar(text)}
            />

            <CustomButton onPress={() => AtualizarSenha()}>
                <TitleButton>CONFIRMAR NOVA SENHA</TitleButton>
            </CustomButton>
        </Container>
    );
}