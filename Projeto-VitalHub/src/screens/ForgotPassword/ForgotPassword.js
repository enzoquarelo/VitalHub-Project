import { Container, ContainerIcon } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Textbasic } from "../../components/Text/Text";
import {
  ButtonForgotPassword,
  ButtonTitle,
} from "../../components/Button/style";
import { Input } from "../../components/Input/Input";

import { Feather } from "@expo/vector-icons";

export const ForgotPassword = ({navigation}) => {

  //Chamar a função EmailCode
  async function EmailCode() {
    navigation.replace("EmailCode")
  }
  //Chamar a função Login
  async function Login() {
    navigation.replace("Login")
  }
  
  return (
    <Container>
      <ContainerIcon onPress={() => Login()}>
        <Feather name="arrow-left-circle" size={35} color="#49B3BA" />
      </ContainerIcon>
      <Logo source={require("../../assets/VitalHubLogo.png")} />

      <Title>Recuperar senha</Title>

      <Textbasic>
        Digite abaixo seu email cadastrado que enviaremos um link para
        recuperação de senha
      </Textbasic>

      <Input placeholder="Usuário ou E-mail" />

      <ButtonForgotPassword onPress={() => EmailCode()}>
        <ButtonTitle>CONTINUAR</ButtonTitle>
      </ButtonForgotPassword>
    </Container>
  );
};
