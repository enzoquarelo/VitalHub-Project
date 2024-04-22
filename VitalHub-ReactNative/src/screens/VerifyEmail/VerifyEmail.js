import { React, useEffect, useState } from "react";

import { Container } from "../../components/Container/style";
import { Logo } from "../../components/Logo/Logo";
import { Title } from "../../components/Title/style";
import { Input } from "../../components/Input/styles";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { useRef } from "react-native";
import api from "../../service/service";

import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

export const VerifyEmail = ({ navigation, route }) => {
  const [codigo, setCodigo] = useState("");

  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function FocusNextInput(index) {
    //Se o index é menor do que a quantidade de camos
    if (index < inputs.lenght - 1) {
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
        `/RecuperarSenha/ValidarCodigoRecuperarSenha?email=${route.params.emailRecuparecao}&codigo=${codigo}`
      )
      .then(() => {
        navigation.replace("RedefinePassword", {emailRecuparecao : route.params.emailRecuparecao});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    inputs[0].current.Focus();
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
        {route.params.emailRecuparecao}
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
            key={index} //chave de acordo com o index do map
            ref={inputs[index]}
            kkeyboardType="numeric"
            widthInput={"60px"}
            heightInput={"60px"}
            fontSize={40}
            paddingInput={"0px"}
            placeholder="0"
            textAlign="center"
            caretHidden={true}
            onChangeText={(text) => {
              //verificar se o texto não é vazio
              if (text == "") {
                FocusPrevInput(index);
              } else {
                const novoCodigo = [...codigo]; //separa os valores dentro do array
                novoCodigo[index] = text; //corrige o valor de acordo com a posição
                setCodigo(novoCodigo.join("")); //juntando todas em uma string

                //verificar se o campo tem 1 caractere
                FocusNextInput(index);
              }
            }}
          />
        ))}

        <Input
          widthInput={"60px"}
          heightInput={"60px"}
          fontSize={40}
          paddingInput={"0px"}
          placeholder="0"
          textAlign="center"
        />
        <Input
          widthInput={"60px"}
          heightInput={"60px"}
          fontSize={40}
          paddingInput={"0px"}
          placeholder="0"
          textAlign="center"
        />
        <Input
          widthInput={"60px"}
          heightInput={"60px"}
          fontSize={40}
          paddingInput={"0px"}
          placeholder="0"
          textAlign="center"
        />
        <Input
          widthInput={"60px"}
          heightInput={"60px"}
          fontSize={40}
          paddingInput={"0px"}
          placeholder="0"
          textAlign="center"
        />
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
};
