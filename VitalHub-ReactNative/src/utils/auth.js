//import bibliotecas
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { decode, encode } from 'base-64'

//chama o status para decodificar ou codificar o token
if (!global.atob) {
    global.atob = decode;
} 
if (!global.btoa) {
    global.btoa = encode;
}

export const userDecodeToken = async () => {
    //chama o token guardado na AsyncStorage
    const token = await AsyncStorage.getItem('token');

    //se o token for nulo ele para a função mas caso ele tenha valor ele decodifica e traz dados como role - name - email
    if (token === null) {
        return null;
    }

    const decoded = jwtDecode(token)

    return{
        role: decoded.role,
        name: decoded.name,
        email: decoded.email
    }
}