import { React, useState } from "react";

import { ActivityIndicator, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { Container } from "../../components/Container/style";
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";

import { Feather } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

import api from "../../service/service";

export const CreateAccount = ({ navigation }) => {
    const [textWarning, setTextWarning] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState("enzo.q@gmail.com");
    const [senha, setSenha] = useState("123");
    const [senhaConfirm, setSenhaConfirm] = useState("123");

    const [showPassword, setShowPassword] = useState(false);

    async function sendNotification() {
        //personalizar a mensagem da notificação
        const message = {
            to: "ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
            sound: "default",
            data: {},
        };

        // Agende a notificação aqui, dentro da função sendNotification
        await Notifications.scheduleNotificationAsync({
            content: message,
            trigger: null,
        });
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
    });

    const validateFields = () => {
        if (!email || !senha || !senhaConfirm) {
            setTextWarning("Por favor, preencha todos os campos.");
            return false;
        }

        if (senha !== senhaConfirm) {
            setTextWarning("As senhas não coincidem.");
            return false;
        }

        setTextWarning("");

        return true;
    };

    async function Post() {
        if (!validateFields()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await api.post(
                "/Pacientes",
                {
                    email: "enzo.q@gmail.com",
                    senha: "123",
                    idTipoUsuario: "D3468A23-AF5A-490C-84AD-99C73F017B96",
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status === 200) {
                navigation.replace("UpdateProfile");

                // Adicionando a notificação aqui, após uma resposta bem-sucedida
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Cadastro Realizado!",
                        body: "Sua conta foi criada com sucesso.",
                        icon: "././assets/images/VitalHub_logo.png",
                    },
                    trigger: null,
                });
                
            } else {
                setTextWarning(
                    "Erro ao cadastrar. Por favor, tente novamente."
                );
            }
        } catch (error) {
            console.log(error);
            setTextWarning("Erro passou pelo catch");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <StatusBar />

            <Logo />

            <Title style={{ marginTop: 45 }}>Criar conta</Title>

            <DefaultText
                style={{ marginTop: 10 }}
                widthText={"88%"}
                fontSize={18}
            >
                Insira seu endereço de e-mail e senha para realizar seu
                cadastro.
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
                secureTextEntry={!showPassword}
                style={{ marginBottom: 15 }}
                onChangeText={(txt) => setSenha(txt)}
            />

            <Input
                placeholder="Confirmar Senha"
                value={senhaConfirm}
                secureTextEntry={!showPassword}
                style={{ marginBottom: 5 }}
                onChangeText={(txt) => setSenhaConfirm(txt)}
            />

            <Container
                widthContainer={"90%"}
                heightContainer={"30px"}
                flexDirection={"row"}
                justifyContent={"flex-start"}
                style={{ marginBottom: 30 }}
            >
                <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Feather
                        name={showPassword ? "x-square" : "square"}
                        size={24}
                        color="#49B3BA"
                        style={{ marginRight: 5 }}
                    />
                </TouchableOpacity>
                <DefaultText
                    fontFamily={"Quicksand_600SemiBold"}
                    colorText={"#49B3BA"}
                >
                    Mostrar senha
                </DefaultText>
            </Container>

            <CustomButton
                onPress={() => {
                    Post();
                }}
                disabled={isLoading}
            >
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
                style={{ textAlign: "center", marginTop: 30 }}
                onPress={() => {
                    navigation.replace("Login");
                }}
            >
                Cancelar
            </Links>
        </Container>
    );
};
