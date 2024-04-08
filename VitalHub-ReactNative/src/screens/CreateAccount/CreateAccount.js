import { React, useState } from "react";

import { ActivityIndicator } from "react-native";

import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";

import api from "../../service/service";


export const CreateAccount = ({ navigation }) => {
    const [textWarning, setTextWarning] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('teste@gmail.com');
    const [senha, setSenha] = useState('teste123');
    const [senhaConfirm, setSenhaConfirm] = useState('teste123');

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
            const response = await api.post('/Pacientes', {
                email: email,
                senha: senha,
                idTipoUsuario: "D3468A23-AF5A-490C-84AD-99C73F017B96"
            });

            if (response.status === 200) {
                navigation.replace("CompleteDataProfile");
            } else {
                setTextWarning('Erro ao cadastrar. Por favor, tente novamente.');
            }
        } catch (error) {
            console.log(error);
            setTextWarning('Erro ao cadastrar. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
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
                style={{ marginBottom: 15 }}
                onChangeText={(txt) => setEmail(txt)}
            />

            <Input
                placeholder="Senha"
                value={senha}
                secureTextEntry={true}
                style={{ marginBottom: 15 }}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder="Confirmar Senha"
                value={senhaConfirm}
                secureTextEntry={true}
                style={{ marginBottom: 30 }}
                onChangeText={(txt) => setSenhaConfirm(txt)}
            />

            <CustomButton onPress={() => { Post() }} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
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