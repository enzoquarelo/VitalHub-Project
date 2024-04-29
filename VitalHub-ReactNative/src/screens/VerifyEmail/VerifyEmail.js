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
    const [textWarning, setTextWarning] = useState('');

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
                setTextWarning('Código Inválido!');
            });
    }

    const [timer, setTimer] = useState(6);
    const [linkDisable, setLinkDisable] = useState(true);


    async function EnviarEmail() {
        setLinkDisable(true);
        setTimer(60)

        await api.post(`/RecuperarSenha?email=${route.params.emailRecuperacao}`)

            .then(() => {
                setLinkDisable(true);
            }).catch(error => {
                console.log(error)
            })
    }

    function TimeReenviarCodigo() {
        if (timer > 0) {
            setTimer(timer - 1);
        } else {
            setLinkDisable(false);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            TimeReenviarCodigo();
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

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


            <DefaultText
                fontSize={18}
                colorText={"#C81D25"}
                widthText={"90%"}
                style={{ marginTop: 10, marginBottom: 5 }}
            >
                {textWarning}
            </DefaultText>


            <Container
                widthContainer={"88%"}
                heightContainer={"62px"}
                flexDirection={"row"}
                justifyContent={"space-around"}
                style={{
                    marginBottom: 50,
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
                colorLink={
                    linkDisable
                        ? "#CCCCCC"
                        : "#344F8F"
                }
                fontLink={"MontserratAlternates_600SemiBold"}
                fontSize={18}
                style={{ textAlign: "center", marginTop: 30 }}
                onPress={() => {
                    if (!linkDisable) {
                        EnviarEmail();
                    }
                }}
            >
                Reenviar Código ({timer})
            </Links>
        </Container>
    );
}
