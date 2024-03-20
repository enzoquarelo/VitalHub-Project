import { Feather } from "@expo/vector-icons";
import { Container, ContainerIcon } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Textbasic } from "../../components/Text/Text";
import { Input } from "../../components/Input/Input";
import { Button, ButtonRegister, ButtonTitle } from "../../components/Button/style";
import { ContentAccount } from "../../components/ContentAccount/ContentAccount";
import { LinkAccount } from "../../components/Links/Links";

export const Register = ({navigation}) => {

  //Chamar a função login
  async function Login() {
    navigation.replace("Login")
  }
  //Chamar a função PatientConsultations
  async function PatientConsultations() {
    navigation.replace("Main")
  }

  return (
    <Container>
     
      <Logo source={require("../../assets/VitalHubLogo.png")} />

      <Title>Criar conta</Title>
      <Textbasic>
        Insira seu endereço de e-mail e senha para realizar seu cadastro.
      </Textbasic>

      <Input placeholder="Usuário ou E-mail" />

      {/* (secureTextEntry) nao aparece a senha enquanto digita */}
      <Input placeholder="Senha" secureTextEntry />
      <Input placeholder="Confirmar Senha" secureTextEntry />

      <ButtonRegister onPress={() => PatientConsultations()}>
        <ButtonTitle>CADASTRAR</ButtonTitle>
      </ButtonRegister>

      <ContentAccount >
        <LinkAccount onPress={() => Login()}>Cancelar</LinkAccount>
      </ContentAccount>

    </Container>
  );
};
