import {
  Button,
  ButtonGoogle,
  ButtonTitle,
  ButtonTitleGoogle,
} from "../../components/Button/style";
import { Container } from "../../components/Container/Style";
import {
  ContentAccount,
  TextAccount,
} from "../../components/ContentAccount/ContentAccount";
import { Input } from "../../components/Input/Input";
import { LinkAccount, LinkMedium } from "../../components/Links/Links";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";

import { AntDesign } from "@expo/vector-icons";

//Expo LocalAuthentication
import moment from "moment";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const Login = ({ navigation }) => {
  const [history, setHistory] = useState({});
  const [authenticated, setAuthenticated] = useState(false);
  const [biometricExist, setBiometricExist] = useState(false);

  async function CheckExistAuthenticates() {
    //Validar se o aparelho tem acesso a biometria
    const compatible = await LocalAuthentication.hasHardwareAsync();

    setBiometricExist(compatible);

    //Consultar as validações existentes
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(LocalAuthentication.AuthenticationType[types[0]]);
  }

  async function handleAuthentication() {
    const biometric = await LocalAuthentication.isEnrolledAsync();

    //Validar se existe uma biometria cadastrada
    if (!biometric) {
      return Alert.alert(
        "Falha ao Logar",
        "Não foi encontado nenhuma biometria cadastrada."
      );
    }

    //caso exista
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
    });

    setAuthenticated(auth.success);

    if (auth.success) {
      SetHistory()
    }
  }

  async function SetHistory() {
    const objAuth = {
      dateAuthenticate: moment().format("DD/MM/YYYY HH:mm:ss"),
    };
    await AsyncStorage.setItem("authenticate", JSON.stringify(objAuth));

    setHistory(objAuth);
  }

  async function GetHistory() {
    const objAuth = await AsyncStorage.getItem("authenticate")

    if (objAuth) {
      setHistory(JSON.parse(objAuth))
    }
  }

  useEffect(() => {
    CheckExistAuthenticates();

    GetHistory()
  }, []);

  //Chamar a função login
  async function Login() {
    navigation.replace("Main");
  }
  //Chamar a função ForgotPassword
  async function ForgotPassword() {
    navigation.navigate("ForgotPassword");
  }
  //Chamar a função Register
  async function Register() {
    navigation.navigate("Register");
  }

  return (
    <Container>
      <Logo source={require("../../assets/VitalHubLogo.png")} />

      <Title>Entrar ou criar conta</Title>

      <Input placeholder="Usuário ou E-mail" />

      {/* (secureTextEntry) nao aparece a senha enquanto digita */}
      <Input placeholder="Senha" secureTextEntry />

      <LinkMedium onPress={() => ForgotPassword()}>
        Esqueceu sua senha?
      </LinkMedium>

      <Button onPress={() => Login()}>
        <ButtonTitle>ENTRAR</ButtonTitle>
      </Button>

      <ButtonGoogle>
        <AntDesign name="google" size={20} color="#496BBA" />
        <ButtonTitleGoogle>ENTRAR COM GOOGLE</ButtonTitleGoogle>
      </ButtonGoogle>

      <ContentAccount>
        <TextAccount>Não tem conta?</TextAccount>
        <LinkAccount onPress={() => Register()}>
          Crie uma conta agora!
        </LinkAccount>
      </ContentAccount>
    </Container>
  );
};
