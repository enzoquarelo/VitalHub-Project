import React, { useState } from "react";

import { TouchableOpacity, Text } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Container } from "../../components/Container/style";
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Feather } from '@expo/vector-icons';

import api from "../../service/service";

export const RedefinePassword = ({ navigation, route }) => {
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar a visibilidade da senha

    const [textWarning, setTextWarning] = useState('');

    async function AtualizarSenha() {
        if (senha === '' && confirmar === '') {
            setTextWarning('Preencha os campos!');
        } else {
            if (senha === confirmar) {
                await api.put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
                    senhaNova: senha
                }).then(() => {
                    navigation.replace("Login");
                }).catch(error => {
                    console.log(error);
                });
            } else {
                setTextWarning('As senhas não coincidem!');
            }
        }
    }

    return (
        <Container>
            <StatusBar />
            <Logo />

            <Title style={{ marginTop: 45 }}>Redefinir senha</Title>
            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Insira e confirme a sua nova senha
            </DefaultText>

            <DefaultText
                fontSize={18}
                colorText={"#C81D25"}
                widthText={"90%"}
                textAlign={"start"}
                style={{ marginTop: 15 }}
            >
                {textWarning}
            </DefaultText>

            <Input
                placeholder="Nova Senha"
                secureTextEntry={!showPassword} // Usar o estado para controlar a visibilidade da senha
                style={{ marginBottom: 15 }}
                value={senha}
                onChangeText={(text) => setSenha(text)}
            />

            <Input
                placeholder="Confirmar nova senha"
                secureTextEntry={!showPassword} // Usar o estado para controlar a visibilidade da senha
                style={{ marginBottom: 5 }}
                value={confirmar}
                onChangeText={(text) => setConfirmar(text)}
            />

            <Container widthContainer={'90%'} heightContainer={'30px'} flexDirection={'row'} justifyContent={'flex-start'} style={{ marginBottom: 30 }}>
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather name={showPassword ? "x-square" : "square"} size={24} color="#49B3BA" style={{marginRight: 5}}/>
                </TouchableOpacity>
                <DefaultText fontFamily={'Quicksand_600SemiBold'} colorText={'#49B3BA'}>Mostrar senha</DefaultText>
            </Container>

            <CustomButton onPress={() => AtualizarSenha()}>
                <TitleButton>CONFIRMAR NOVA SENHA</TitleButton>
            </CustomButton>
        </Container>
    );
}
