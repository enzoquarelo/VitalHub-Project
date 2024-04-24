import { React, useState, useEffect } from "react";

import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle } from "../../components/Container/style"
import { Title } from "../../components/Title/style"
import { DefaultText } from "../../components/DefaultText/DefaultText"
import { InputDisable, TitleInput, Input } from "../../components/Input/styles"
import { UserImage } from "./style";
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../service/service";

export const Profile = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [userDataNascimento, setUserDataNascimento] = useState('');
    const [userRg, setUserRg] = useState('');
    const [userCPF, setUserCPF] = useState('');
    const [userLogradouro, setUserLogradouro] = useState('');
    const [userCep, setUserCep] = useState('');
    const [userCidade, setUserCidade] = useState('');
    const [userNumero, setUserNumero] = useState('');
    const [userFoto, setUserFoto] = useState('');


    const [isEditing, setIsEditing] = useState(false);

    async function profileLoad() {
        const token = await userDecodeToken();
        const userNameToken = token.name;
        const userEmailToken = token.email;
        setUserName(userNameToken);
        setUserEmail(userEmailToken);
    }

    async function deleteToken() {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login");
    }

    async function BuscarUsuario() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        const userId = token.jti;
        const url = (userRoleToken === "Medico" ? "Medicos" : "Pacientes");

        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${userId}`);

            setUserDataNascimento(response.data.dataNascimento);
            setUserRg(response.data.rg);
            setUserCPF(response.data.cpf);
            setUserLogradouro(response.data.endereco.logradouro);
            setUserCep(response.data.endereco.cep);
            setUserCidade(response.data.endereco.cidade);
            setUserNumero(response.data.endereco.numero);
            setUserFoto(response.data.idNavigation.foto);

        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('pt-BR');
        return formattedDate;
    }

    function toggleEditing() {
        setIsEditing(!isEditing);
    }

    useEffect(() => {
        profileLoad();
    }, []);

    useEffect(() => {
        BuscarUsuario();
    }, []);

    return (
        <ScrollView>
            <Container>
                <StatusBar style="light" />

                <UserImage source={{ uri: userFoto }} />

                <Title style={{ marginTop: 14 }}>{userName}</Title>
                <DefaultText fontSize={18}>{userEmail}</DefaultText>

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                <InputDisable
                    value={formatDate(userDataNascimento)}
                    editable={false}
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                {isEditing ? (
                    <Input
                        value={userRg}
                        onChangeText={setUserRg}
                        editable={true}
                    />
                ) : (
                    <InputDisable
                        value={userRg}
                        editable={false}
                    />
                )}

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                {isEditing ? (
                    <Input
                        editable={true}
                    />
                ) : (
                    <InputDisable
                        value={userCPF}
                        editable={false}
                    />
                )}

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Endereço</TitleInput>
                {isEditing ? (
                    <Input
                        editable={true}
                        multiline={false}
                        numberOfLines={1}
                    />
                ) : (
                    <InputDisable
                        value={`${userLogradouro}, ${userNumero}`}
                        editable={false}
                        multiline={false}
                        numberOfLines={1}
                    />
                )}

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        {isEditing ? (
                            <Input
                                editable={false}
                            />
                        ) : (
                            <InputDisable
                                value={userCep}
                                editable={false}
                            />
                        )}
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        {isEditing ? (
                            <Input

                                editable={true}
                            />
                        ) : (
                            <InputDisable
                                value={userCidade}
                                editable={false}
                            />
                        )}
                    </ContainerInputAndTitle>
                </Container>

                <CustomButton style={{ marginBottom: 20 }}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>

                <CustomButton onPress={toggleEditing}>
                    <TitleButton>EDITAR</TitleButton>
                </CustomButton>

                <ButtonDisable widthButton={60} style={{ marginTop: 20, marginBottom: 20 }} onPress={() => { deleteToken() }}>
                    <TitleButton>SAIR DO APP</TitleButton>
                </ButtonDisable>
            </Container>
        </ScrollView>
    );
}