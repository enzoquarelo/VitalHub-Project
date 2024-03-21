import React, { useEffect } from 'react';

import { Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ContainerSplash } from './style';

const SplashScreen = () => {
    const navigation = useNavigation();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        // Navegue para a próxima tela após 3 segundos
        navigation.replace("Login");
      }, 2000);
  
      // Limpe o temporizador se o componente for desmontado antes do tempo limite
      return () => clearTimeout(timer);
    }, [navigation]);
  
    return (
      <ContainerSplash>
        <Image source={require('../../../assets/images/VitalHub_logo_splashScreen.png')} style={{ width: 230, height: 105 }} />
        <Text style={styles.textSplash}>Ajudando você a cuidar da sua saúde!</Text>
      </ContainerSplash>
    );
  };
const styles = StyleSheet.create({
    textSplash : {
        width: 200,

        fontSize: 18,
        fontFamily: 'Quicksand_600SemiBold',
        textAlign: 'center',
        color: 'white',

        marginTop: 30,
    },
})

export default SplashScreen;