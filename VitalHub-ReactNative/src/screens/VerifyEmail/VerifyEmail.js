import { React, useEffect, useState } from "react";

import { StatusBar } from "expo-status-bar";
import { Container } from "../../components/Container/style"
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { useRef } from "react";
import api from "../../service/service";

import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export const VerifyEmail = ({ navigation, route }) => {
    const [codigo, setCodigo] = useState("");
    const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    function FocusNextInput(index) {
        if (index < inputs.length - 1) {
            inputs[index + 1].current.focus();
        }
    }

    function FocusPrevInput(index) {
        if (index > 0) {
            inputs[index - 1].current.focus();
        }
    }

    async function ValidarCodigo() {
        console.log(codigo);

        await api
            .post(
                `/RecuperarSenha/ValidarCodigoRecupSenha?email=${route.params.emailRecuperacao}&codigo=${codigo}`
            )
            .then(() => {
                navigation.replace("RedefinePassword", {
                    emailRecuperacao: route.params.emailRecuperacao,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        inputs[0].current.focus();
    }, []);

    return (
        <Container>
            <TouchableOpacity
                style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#49B3BA15",
                    borderRadius: 50,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 60,
                    left: 20,
                }}
                onPress={() => {
                    navigation.navigate("Login");
                }}
            >
                <AntDesign
                    name="plus"
                    size={24}
                    color="#34898F"
                    style={{ transform: "rotate(45deg)" }}
                />
            </TouchableOpacity>

            <Logo />

            <Title style={{ marginTop: 45 }}>Verifique seu e-mail</Title>
            <DefaultText style={{ marginTop: 10 }} widthText={"88%"} fontSize={18}>
                Digite o código de 4 dígitos enviado para
            </DefaultText>
            <DefaultText widthText={"88%"} fontSize={18} colorText={"#496BBA"}>
                {route.params.emailRecuperacao}
            </DefaultText>

            <Container
                widthContainer={"88%"}
                heightContainer={"62px"}
                flexDirection={"row"}
                justifyContent={"space-around"}
                style={{
                    marginTop: 15,
                    marginBottom: 20,
                }}
            >
                {[0, 1, 2, 3].map((index) => (
                    <Input
                        key={index}
                        ref={inputs[index]}
                        keyboardType="numeric"
                        widthInput={"60px"}
                        heightInput={"60px"}
                        fontSize={40}
                        paddingInput={"0px"}
                        placeholder="0"
                        textAlign="center"
                        caretHidden={true}
                        onChangeText={(text) => {
                            if (text === "") {
                                FocusPrevInput(index);
                            } else {
                                const novoCodigo = [...codigo];
                                novoCodigo[index] = text;
                                setCodigo(novoCodigo.join(""));
                                FocusNextInput(index);
                            }
                        }}
                    />
                ))}
            </Container>

            <CustomButton onPress={() => ValidarCodigo()}>
                <TitleButton>ENTRAR</TitleButton>
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontLink={"MontserratAlternates_600SemiBold"}
                fontSize={18}
                style={{ textAlign: "center", marginTop: 30 }}
            >
                Reenviar Código
            </Links>
        </Container>
    );
}
