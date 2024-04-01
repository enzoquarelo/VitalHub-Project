import { React, useState } from "react";

import { ActivityIndicator } from "react-native";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";


export const CreateAccount = ({ navigation }) => {
    const [textWarning, setTextWarning] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirm, setSenhaConfirm] = useState('');

    const validateFields = () => {
        if (!email || !senha || !senhaConfirm) {
            setTextWarning('Por favor, preencha todos os campos.');
            return false;
        }
        
        if (senha !== senhaConfirm) {
            setTextWarning('As senhas não coincidem.');
            return false;
        }

        setTextWarning('');
        
        return true;
    };

    async function Post() {
        if (!validateFields()) {
            return;
        }

        setIsLoading(true);

        try {
            navigation.replace("CompleteDataProfile");
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container>
            <Logo />

            <Title style={{ marginTop: 45 }}>Criar conta</Title>

            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Insira seu endereço de e-mail e senha para realizar seu cadastro.
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
                placeholder="Email"
                value={email}
                style={{ marginBottom: 15}}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Input
                placeholder="Senha"
                value={senha}
                style={{ marginBottom: 15 }}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder="Confirmar Senha"
                value={senhaConfirm}
                style={{ marginBottom: 30 }}
                onChangeText={(txt) => setSenhaConfirm(txt)}
            />

            <CustomButton onPress={() => { Post()}} disabled={isLoading}>
            {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" /> // Indicador de carregamento
                ) : (
                    <TitleButton>CADASTRAR</TitleButton>
                )}
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontLink={"MontserratAlternates_600SemiBold"}
                fontSize={18}
                style={{ textAlign: 'center', marginTop: 30 }}
                onPress={() => { navigation.replace("Login") }}
            >
                Cancelar
            </Links>
        </Container>
    );
}