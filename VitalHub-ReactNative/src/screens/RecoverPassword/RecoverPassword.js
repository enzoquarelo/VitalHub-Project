import { React, useState } from "react";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";

import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity, ActivityIndicator } from "react-native";
import api from "../../service/service";


export const RecoverPassword = ({ navigation }) => {

    const [textWarning, setTextWarning] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [userData, setUserData] = useState('');

    const [email, setEmail] = useState("")

    //enviar o email
    async function EnviarEmail() {
        await api.post(`/RecuperarSenha?email=${email}`)

        .then(() => {
            navigation.replace("VerifyEmail, {emailRecuperacao : email}")
        }).catch(error => {
            console.log(error)
        })
    }

    const validateFields = () => {
        if (userData === '') {
            setTextWarning('Por favor, preencha o campo.');
            return false;
        }

        setTextWarning('');
        navigation.replace("VerifyEmail");

        return true;
    };

    return (
        <Container>
            <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: "#49B3BA15", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 60, left: 20 }} onPress={() => { navigation.navigate("Login") }}>
                <AntDesign name="arrowleft" size={24} color="#34898F" />
            </TouchableOpacity>

            <Logo />

            <Title style={{ marginTop: 45 }}>Recuperar senha</Title>
            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha
            </DefaultText>

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
                style={{ marginBottom: 30 }}
                value={email} 
                onChangeText={(text) => setEmail(text)}
            />
            <CustomButton onPress={() => EnviarEmail() }>
                <TitleButton>CONTINUAR  </TitleButton>
            </CustomButton>
        </Container>
    );
}