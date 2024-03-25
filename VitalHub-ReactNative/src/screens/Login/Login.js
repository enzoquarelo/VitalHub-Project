import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

import { View, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../service/service";


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('carlos.medico@gmail.com');
    const [senha, setSenha] = useState('medico123');

    async function Login() {
        try {
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });

            if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem("token", JSON.stringify(token));
                
                navigation.navigate("Main");
            } else {
                alert('Login falhou');
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container>
            <StatusBar />
            <Logo />

            <Title style={{ marginTop: 45 }}>Entrar ou criar conta</Title>

            <Input
                placeholder="Usuário ou E-mail"
                style={{ marginBottom: 15, marginTop: 20 }}

                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Container heightContainer={"30px"} flexDirection={"row"} style={{marginBottom: 20, marginTop: 10}}>
                <Input
                    placeholder="Senha"
                    secureTextEntry={!showPassword}

                    value={senha}
                    onChangeText={(txt) => setSenha(txt)}
                />

                <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                    <AntDesign
                        name={showPassword ? "eyeo" : "eye"}
                        size={25}
                        color="#34898F"
                        style={{
                            position: 'absolute',
                            right: "10%",
                        }}
                    />
                </TouchableWithoutFeedback>
            </Container>

            <Links style={{ marginTop: 8, marginBottom: 30, textAlign: 'start' }} onPress={() => { navigation.navigate("RecoverPassword") }}>Esqueceu a senha?</Links>

            <CustomButton onPress={() => { Login() }}>
                <TitleButton>ENTRAR</TitleButton>
            </CustomButton>

            <CustomButton backgroundBtn={"#FFFFFF"} style={{ marginTop: 15, }}>
                <AntDesign style={{ marginRight: 20 }} name="google" size={20} color="#496BBA" />
                <TitleButton colorTxt={"#496BBA"}>ENTRAR COM GOOGLE</TitleButton>
            </CustomButton>

            <Container style={{ marginTop: 10 }} widthContainer={"290px"} heightContainer={"30px"} flexDirection={"row"} justifyContent={"start"}>
                <DefaultText fontFamily={"MontserratAlternates_600SemiBold"} fontSize={16} colorTxt={"#4E4B59"}>Não tem conta?</DefaultText>
                <Links colorLink={"#496BBA"} fontLink={"MontserratAlternates_600SemiBold"} fontSize={16} onPress={() => { navigation.navigate("CreateAccount") }} style={{ textAlign: 'start' }}>Crie uma conta agora!</Links>
            </Container>

        </Container>
    );
}