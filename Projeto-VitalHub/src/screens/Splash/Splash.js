import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ProgressBarAndroid,
} from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import splashjson from "./splashDoctor.json";
import { Logo } from "../../components/Logo/Style";

export const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Define isLoading como false após 3 segundos (3000 milissegundos)
      navigation.navigate("Login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
      <View style={styles.container}>
          <Logo source={require("../../assets/VitalHubLogo.png")} />

          {/* Exibe a animação de splash */}
          <LottieView
              source={splashjson}
              autoPlay
              loop={false}
              resizeMode="contain"
              style={styles.animation}
              onAnimationFinish={() => setIsLoading(false)} // Define isLoading como false quando a animação terminar
          />
          <Text style={styles.txt}>Seu bem-estar ao alcance das mãos!</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  animation: {
    width: "100%",
    height: "50%", // Reduz a altura da animação para deixar espaço para a barra de carregamento
  },
  loader: {
    marginTop: 10, // Adiciona margem superior à barra de carregamento
  },
  txt: {
    color: "#60BFC5",
    fontSize: 24,
    fontFamily: "Quicksand_600SemiBold",
    textAlign: "center",
    width: "70%",
  },
});
