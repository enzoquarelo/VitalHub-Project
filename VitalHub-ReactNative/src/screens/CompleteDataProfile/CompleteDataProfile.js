import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";

import { Container, ContainerInputAndTitle, BoxElevation } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { DefaultText } from "../../components/DefaultText/DefaultText";
import { TitleInput, Input } from "../../components/Input/styles";
import { UserImage } from "../Profile/style";
import { ButtonDisable, CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";

import { userDecodeToken } from "../../utils/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../../service/service";

export const UpdateProfile = ({ navigation }) => {


    //states para os inputs
    const [userNome, setUserNome] = useState('');
    const [userDataNascimento, setUserDataNascimento] = useState('');
    const [userRg, setUserRg] = useState('');
    const [userCPF, setUserCPF] = useState('');
    const [userLogradouro, setUserLogradouro] = useState('');
    const [userCep, setUserCep] = useState('');
    const [userCidade, setUserCidade] = useState('');
    const [userNumero, setUserNumero] = useState('');
    const [userFoto, setUserFoto] = useState('');

    //state para manipular edição dos inputs
    const [isEditing, setIsEditing] = useState(true);

    //Atualiza - Salva as alterações
    async function salvarAlteracoes() {
        try {
            const response = await api.put(`/Pacientes?idUsuario=teste`, {
                rg: userRg,
                cpf: userCPF,
                dataNascimento: userDataNascimento,
                cep: userCep,
                logradouro: userLogradouro,
                numero: userNumero,
                cidade: userCidade,
                foto: userFoto
            });

            console.log("Alterações salvas com sucesso:", response.data);

            setIsEditing(false);

        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
        }
    }


    return (
        <ScrollView>
            <Container justifyContent={"flex-start"}>
                <StatusBar style="light" />

                <UserImage source={{ uri: "https://img.cancaonova.com/cnimages/canais/uploads/sites/6/2017/01/formacao_sera-que-sou-uma-pessoa-que-tem-virtudes.jpg" }} />

                <BoxElevation>
                    <Title fontSize={22}>Complete seu Perfil</Title>
                    <DefaultText>exemplo@gmail.com</DefaultText>
                </BoxElevation>

                <TitleInput style={{ marginTop: 10, marginBottom: 5 }}>Nome Completo</TitleInput>
                <Input
                    value={userNome}
                    onChangeText={setUserNome}
                    editable={true}
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                <Input
                    value={userDataNascimento}
                    onChangeText={setUserDataNascimento}
                    editable={true}
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                <Input
                    value={userRg}
                    onChangeText={setUserRg}
                    editable={true}
                />

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                <Input
                    value={userCPF}
                    onChangeText={setUserCPF}
                    editable={true}
                />

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14 }}>
                    <ContainerInputAndTitle>
                        <TitleInput>CEP</TitleInput>
                        <Input
                            value={userCep}
                            onChangeText={setUserCep}
                            editable={false}
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle>
                        <TitleInput>Cidade</TitleInput>
                        <Input
                            value={userCidade}
                            onChangeText={setUserCidade}
                            editable={true}
                            widthInput={"180px"}
                        />
                    </ContainerInputAndTitle>
                </Container>

                <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                    <ContainerInputAndTitle widthContainer={"280"}>
                        <TitleInput>Logradouro</TitleInput>
                        <Input
                            value={userLogradouro}
                            onChangeText={setUserLogradouro}
                            editable={true}
                            multiline={false}
                            numberOfLines={1}
                        />
                    </ContainerInputAndTitle>

                    <ContainerInputAndTitle widthContainer={"100"}>
                        <TitleInput>N°</TitleInput>
                        <Input
                            value={userNumero}
                            onChangeText={setUserNumero}
                            editable={true}
                            widthInput={"80px"}
                        />

                    </ContainerInputAndTitle>
                </Container>

                <CustomButton style={{ marginBottom: 20 }} onPress={salvarAlteracoes}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>

                <Links
                    colorLink={"#344F8F"}
                    fontLink={"MontserratAlternates_600SemiBold"}
                    fontSize={18}
                    style={{ textAlign: 'center', marginBottom: 30 }}
                    onPress={() => { navigation.replace("Login") }}
                >
                    Cancelar
                </Links>
            </Container>
        </ScrollView>
    );
}
