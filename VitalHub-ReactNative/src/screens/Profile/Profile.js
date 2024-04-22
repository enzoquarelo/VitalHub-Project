import { React, useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { InputDisable, TitleInput } from "../../components/Input/styles"
import { UserImage } from "./style";
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../service/service";

export const Profile = ({ navigation }) => {
    //state para guardar e manipular os dados
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('');

    //states para guardar o usuario
    const [UserData, setUserData] = useState({ dataDeNascimento: null, rg: null, cpf: null, logradouro: null, cep: null, cidade: null, numero: null });

    //const para o javascript do map
    // const [dadosUsuario, SetDadosUsuario]= useState([])

    function updateUserData(dataDeNascimento, rg, cpf, logradouro, cep, cidade, numero) {
        setUserData({ dataDeNascimento, rg, cpf, logradouro, cep, cidade, numero });
    }

    //função que captura e guarda o nome e email do usuário pelo token
    async function profileLoad() {
        const token = await userDecodeToken();

        const userNameToken = token.name;
        const userEmailToken = token.email;
        setUserName(userNameToken);
        setUserEmail(userEmailToken);
    }

    //função responsavél por deletar o token da AsyncStorage e retornar o usuário para a Login caso ele opte por sair do app
    async function deleteToken() {
        await AsyncStorage.removeItem('token');

        navigation.navigate("Login")

        console.log(token)
    }

    //funcao para chamar o metodo api / buscar por id
    async function BuscarUsuario() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        const userId = token.jti;

        const url = (userRoleToken === "Medico" ? "Medicos" : "Pacientes");

        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${userId}`)
            console.log(response);

            // Correctly destructure the response data
            const { dataNascimento, rg, cpf, endereco } = response.data;
            const { logradouro, cep, cidade } = endereco;
            const numero = endereco.numero; // Assuming you want the 'numero' from 'endereco'

            // Update the user data with the correctly destructured values
            updateUserData(dataNascimento, rg, cpf, logradouro, cep, cidade, numero);

        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        // Create a Date object from the date string
        const date = new Date(dateString);

        // Format the date to "day/month/year"
        const formattedDate = date.toLocaleDateString('pt-BR');

        return formattedDate;
    }



    useEffect(() => {
        profileLoad();
    }, [])

    useEffect(() => {
        BuscarUsuario();
    }, [])

    //Javascript com o map para trazer cada dado do usuario nos Inputs
    // {dadosUsuario.map((UserData, index) => {
    //     //data de nascimento formatado
    //     const rg = dadosUsuario.Pacientes.rg;
    //     const cpf= dadosUsuario.Pacientes.cpf;
    //     const endereco = dadosUsuario.Pacientes.endereco.logradouro;
    //     const cep = dadosUsuario.Pacientes.endereco.cep;
    //     const cidade = dadosUsuario.Pacientes.endereco.cidade;
    // })

    return (
        <ScrollView>
            <Container>
                <StatusBar style="light" />

                <UserImage source={require('../../../assets/images/doctorImage_temp.png')} />

                <Title style={{ marginTop: 14 }}>{userName}</Title>
                <DefaultText fontSize={18}>{userEmail}</DefaultText>

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                <InputDisable
                    placeholder={formatDate(UserData.dataDeNascimento)}
                    editable={false}
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                <InputDisable
                    placeholder={UserData.rg}
                    editable={false}

                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                <InputDisable
                    placeholder={UserData.cpf}
                    editable={false}
                />
               
                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Endereço</TitleInput>
                <InputDisable
                    placeholder={`${UserData.logradouro}, ${UserData.numero}`}
                    editable={false}
                    />

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        <InputDisable
                            placeholder={UserData.cep}
                            editable={false}
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        <InputDisable
                            placeholder={UserData.cidade}
                            editable={false}
                        />
                    </ContainerInputAndTitle>
                </Container>

                <CustomButton style={{ marginBottom: 20 }}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>

                <CustomButton>
                    <TitleButton>EDITAR</TitleButton>
                </CustomButton>

                <ButtonDisable widthButton={60} style={{ marginTop: 20, marginBottom: 20 }} onPress={() => { deleteToken()}}>
                    <TitleButton>SAIR DO APP</TitleButton>
                </ButtonDisable>
            </Container>
        </ScrollView>
    );
}