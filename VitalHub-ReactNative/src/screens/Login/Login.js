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

import api from "../../service/service";


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('kamile.paciente@gmail.com');
    const [senha, setSenha] = useState('paciente123');

    async function Login() {
        const response = await api.post('/Login', {
            email: email,
            senha: senha
        })

        console.log(response)

        // navigation.navigate("Main")
    }

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container>
            <StatusBar/>
            <Logo />

            <Title style={{ marginTop: 45 }}>Entrar ou criar conta</Title>

            <Input
                placeholder="Usuário ou E-mail"
                style={{ marginBottom: 15, marginTop: 20 }}

                value={email}
                onChangeText={ (txt) => setEmail(txt)}
            />

            <Input
                placeholder="Senha"
                secureTextEntry={!showPassword}

                value={senha}
                onChangeText={ (txt) => setSenha(txt)}
            />

            <Container widthContainer={"88%"} heightContainer={"30px"} flexDirection={"row"} justifyContent={"start"} style={{marginLeft: 3}}>
                <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                    <View
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: showPassword ? '#34898F' : 'transparent',
                            borderWidth: showPassword ? 0 : 1,
                            borderColor: showPassword ? '#34898F' : '#34898F',
                            borderRadius: 5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {showPassword && (
                            <AntDesign
                                name="check"
                                size={14}
                                color="white"
                                style={{ alignSelf: 'center' }}
                            />
                        )}
                    </View>
                </TouchableWithoutFeedback>
                <DefaultText style={{marginLeft: 4}} fontSize={16} colorText={"#34898F"}>Mostrar Senha</DefaultText>
            </Container>

            <Links style={{ marginTop: 8, marginBottom: 30, textAlign: 'start' }} onPress={() => { navigation.navigate("RecoverPassword") }}>Esqueceu a senha?</Links>

            <CustomButton onPress={() => {Login()}}>
                <TitleButton>ENTRAR</TitleButton>
            </CustomButton>

            <CustomButton backgroundBtn={"#FFFFFF"} style={{ marginTop: 15, }}>
                <AntDesign style={{ marginRight: 20 }} name="google" size={20} color="#496BBA" />
                <TitleButton colorTxt={"#496BBA"}>ENTRAR COM GOOGLE</TitleButton>
            </CustomButton>

            <Container style={{ marginTop: 10 }} widthContainer={"290px"} heightContainer={"30px"} flexDirection={"row"} justifyContent={"start"}>
                <DefaultText fontFamily={"MontserratAlternates_600SemiBold"} fontSize={16} colorTxt={"#4E4B59"}>Não tem conta?</DefaultText>
                <Links colorLink={"#496BBA"} fontLink={"MontserratAlternates_600SemiBold"} fontSize={16} onPress={() => { navigation.navigate("CreateAccount") }} style={{textAlign: 'start'}}>Crie uma conta agora!</Links>
            </Container>

        </Container>
    );
}