import { Container, ContainerIcon } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Input";
import { Textbasic } from "../../components/Text/Text";
import {
  Button,
  ButtonNewPassword,
  ButtonTitle,
} from "../../components/Button/style";

import { Feather } from "@expo/vector-icons";

export const NewPassword = ({navigation}) => {

  //Chamar a função Login
  async function Login() {
    navigation.replace("Login")
  }

  return (
    <Container>
      <ContainerIcon>
        <Feather onPress={() => Login()} name="x-circle" size={35} color="#49B3BA" />
      </ContainerIcon>
      <Logo source={require("../../assets/VitalHubLogo.png")} />

      <Title>Redefinir senha</Title>
      <Textbasic>Insira e confirme a sua nova senha</Textbasic>

      {/* (secureTextEntry) nao aparece a senha enquanto digita */}
      <Input placeholder="Nova Senha" secureTextEntry />
      <Input placeholder="Confirmar nova senha" secureTextEntry />

      <ButtonNewPassword onPress={() => Login()}>
        <ButtonTitle>CONFIRMAR NOVA SENHA</ButtonTitle>
      </ButtonNewPassword>
    </Container>
  );
};
