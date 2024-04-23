import { React, useState } from "react";

//import dos components
import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { Links } from "../../components/Links/style";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";

//imports de bibliotecas
import { ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { userDecodeToken } from "../../utils/auth";

//import da api
import api from "../../service/service";


export const Login = ({ navigation }) => {
    const [email, setEmail] = useState('enzo.quarelo@gmail.com');
    const [senha, setSenha] = useState('paciente123');

    const [textWarning, setTextWarning] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Função de validação
    const validateFields = () => {
        if (!email || !senha) {
            setTextWarning('Por favor, preencha todos os campos.');
            return false;
        }
        setTextWarning('');
        return true;
    };

    async function Login() {
        if (!validateFields()) {
            return;
        }

        setIsLoading(true);

        try {
            //chama afunção de login pela url da api
            const response = await api.post('/Login', {
                email: email,
                senha: senha
            });

            //valida se o método de login teve sucesso ou não
            if (response.status === 200) {
                //guarda o token em um constante e depois da AsyncStorage
                const token = response.data.token;
                await AsyncStorage.setItem("token", JSON.stringify(token));

                //faz a navegação para a Main(Home)
                navigation.navigate("Main");
                setTextWarning('');
            }

        } catch (e) {
            setTextWarning('Usuário ou Senha inválidos !')
        } finally {
            setIsLoading(false); // Finaliza o carregamento
        }
    }

    //state e função para mostrar a senha
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <Container>
            <StatusBar />
            <Logo />

            <Title style={{ marginTop: 45 }}>Entrar ou criar conta</Title>

            <DefaultText
                fontSize={18}
                colorText={"#C81D25"}
                widthText={"90%"}
                textAlign={"start"}
                style={{ marginTop: 20 }}
            >
                {textWarning}
            </DefaultText>

            <Input
                placeholder="Usuário ou E-mail"
                style={{ marginBottom: 20 }}

                value={email}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Container heightContainer={"30px"} flexDirection={"row"} style={{ marginBottom: 10 }}>
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

            <Links style={{ marginTop: 8, marginBottom: 35, textAlign: 'start' }} onPress={() => { navigation.replace("RecoverPassword") }}>Esqueceu a senha?</Links>

            <CustomButton onPress={() => { Login() }} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" /> // Indicador de carregamento
                ) : (
                    <TitleButton>ENTRAR</TitleButton>
                )}
            </CustomButton>

            <CustomButton backgroundBtn={"#FFFFFF"} style={{ marginTop: 15, }}>
                <AntDesign style={{ marginRight: 20 }} name="google" size={20} color="#496BBA" />
                <TitleButton colorTxt={"#496BBA"}>ENTRAR COM GOOGLE</TitleButton>
            </CustomButton>

            <Container style={{ marginTop: 10 }} widthContainer={"290px"} heightContainer={"30px"} flexDirection={"row"} justifyContent={"start"}>
                <DefaultText fontFamily={"MontserratAlternates_600SemiBold"} fontSize={16} colorTxt={"#4E4B59"}>Não tem conta?</DefaultText>
                <Links colorLink={"#496BBA"} fontLink={"MontserratAlternates_600SemiBold"} fontSize={16} onPress={() => { navigation.replace("CreateAccount") }} style={{ textAlign: 'start' }}>Crie uma conta agora!</Links>
            </Container>

        </Container>
    );
}