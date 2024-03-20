import {
  Container,
  ContainerEmailCode,
  ContainerIcon,
} from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Textbasic } from "../../components/Text/Text";
import { LinkMediumEmail, LinkMediumEmailReenviar } from "../../components/Links/Links";

import { Entypo } from "@expo/vector-icons";
import { InputPassword } from "../../components/Input/Input";
import {
  ButtonEmailCode,
  ButtonTitle,
} from "../../components/Button/style";

export const EmailCode = ({navigation}) => {

  //Chamar a função Login
  async function Login() {
    navigation.replace("Login")
  }
  //Chamar a função NewPassword
  async function NewPassword() {
    navigation.replace("NewPassword")
  }

  return (
    <Container>
      <ContainerIcon onPress={() => Login()}>
        <Entypo name="arrow-with-circle-left" size={35} color="#49B3BA" />
      </ContainerIcon>
      <Logo source={require("../../assets/VitalHubLogo.png")} />

      <Title>Verifique seu e-mail</Title>

      <Textbasic>Digite o código de 4 dígitos enviado para</Textbasic>
      <LinkMediumEmail>username@email.com</LinkMediumEmail>

      <ContainerEmailCode>
        <InputPassword placeholder="0" />
        <InputPassword placeholder="0" />
        <InputPassword placeholder="0" />
        <InputPassword placeholder="0" />
      </ContainerEmailCode>

      <ButtonEmailCode onPress={() => NewPassword()}>
        <ButtonTitle>ENTRAR</ButtonTitle>
      </ButtonEmailCode>

      <LinkMediumEmailReenviar>Reenviar Código</LinkMediumEmailReenviar>
    </Container>
  );
};
