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

import { UseMask } from "../../utils/formater";

import api from "../../service/service";

import { Masks, useMaskedInputProps } from 'react-native-mask-input';

export const Profile = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [userRoleToken, setUserRoleToken] = useState('');

    //states para os inputs
    const [userDataNascimento, setUserDataNascimento] = useState('');
    const [userRg, setUserRg] = useState('');
    const [userCPF, setUserCPF] = useState('');
    const [userLogradouro, setUserLogradouro] = useState('');
    const [userCep, setUserCep] = useState('');
    const [userCidade, setUserCidade] = useState('');
    const [userNumero, setUserNumero] = useState('');
    const [userFoto, setUserFoto] = useState('');
    const [userEspecialidade, setUserEspecialidade] = useState('');
    const [userCRM, setUserCRM] = useState('');

    //state para manipular edição dos inputs
    const [isEditing, setIsEditing] = useState(false);

    //máscara para data de nascimento
    const dataMasked = useMaskedInputProps({
        value: userDataNascimento,
        onChangeText: setUserDataNascimento,
        mask: Masks.DATE_YYYYMMDD
    });

    const cpfMasked = useMaskedInputProps({
        value: userCPF,
        onChangeText: setUserCPF,
        mask: Masks.BRL_CPF
    })


    //captura nome e email do token
    async function profileLoad() {
        const token = await userDecodeToken();
        const userNameToken = token.name;
        const userEmailToken = token.email;
        setUserName(userNameToken);
        setUserEmail(userEmailToken);
    }

    //LOGOUT - deleta o token da AsyncStorage
    async function deleteToken() {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login");
    }


    //Get - Procura o Usuário para inserir os dados nos inputs
    async function BuscarUsuario() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        const userId = token.jti;
        setUserRoleToken(userRoleToken);
        const url = (userRoleToken === "Medico" ? "Medicos" : "Pacientes");

        try {
            const response = await api.get(`/${url}/BuscarPorId?id=${userId}`);

            if (userRoleToken === "Medico") {
                setUserEspecialidade(response.data.especialidade.especialidade1);
                setUserCRM(response.data.crm);
                setUserFoto(response.data.idNavigation.foto);

                console.log(response.data.endereco)
                setUserLogradouro(response.data.endereco.logradouro);
                setUserCep(response.data.endereco.cep);
                setUserCidade(response.data.endereco.cidade);

                setUserNumero(response.data.endereco.numero.toString());
            } else {
                setUserDataNascimento(response.data.dataNascimento);
                setUserRg(response.data.rg);
                setUserCPF(response.data.cpf);
                setUserLogradouro(response.data.endereco.logradouro);
                setUserCep(response.data.endereco.cep);

                setUserCidade(response.data.endereco.cidade);
                setUserNumero(response.data.endereco.numero.toString());
                setUserFoto(response.data.idNavigation.foto);
            }
        } catch (error) {
            console.log(error);
        }
    }

    //Put - Ativa os botões e salva os novos valores
    async function salvarAlteracoes() {
        const token = await userDecodeToken();
        const userRoleToken = token.role;
        const userId = token.jti;
        const url = (userRoleToken === "Medico" ? "Medicos" : "Pacientes");

        try {
            const response = await api.put(`/${url}?idUsuario=${userId}`, {
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

    //edição
    function toggleEditing() {
        setIsEditing(!isEditing);
    }

    //carrega os dados do usuário para chamada na api
    useEffect(() => {
        profileLoad();
    }, []);

    //carrega dados para inserção dos inputs
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

                {userRoleToken === "Medico" ? (
                    <>
                        <TitleInput style={{ marginBottom: 3, marginTop: 10 }}>Especialidade</TitleInput>
                        {isEditing ? (
                            <Input
                                value={userEspecialidade}
                                onChangeText={setUserEspecialidade}
                                editable={true}
                            />
                        ) : (
                            <InputDisable value={userEspecialidade} editable={false} />
                        )}

                        <TitleInput style={{ marginBottom: 3, marginTop: 10 }}>CRM</TitleInput>
                        {isEditing ? (
                            <Input
                                value={userCRM}
                                onChangeText={setUserCRM}
                                editable={true}
                            />
                        ) : (
                            <InputDisable value={userCRM} editable={false} />
                        )}

                        <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14 }}>
                            <ContainerInputAndTitle>
                                <TitleInput>CEP</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userCep}
                                        onChangeText={setUserCep}
                                        editable={false}
                                    />
                                ) : (
                                    <InputDisable
                                        value={
                                            isEditing
                                                ?
                                                userCep
                                                :
                                                UseMask('#####-###', userCep)
                                        }
                                        editable={false}
                                    />
                                )}
                            </ContainerInputAndTitle>

                            <ContainerInputAndTitle>
                                <TitleInput>Cidade</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userCidade}
                                        onChangeText={setUserCidade}
                                        editable={true}
                                        widthInput={"180px"}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userCidade}
                                        editable={false}
                                        widthInput={"180px"}
                                    />
                                )}
                            </ContainerInputAndTitle>
                        </Container>

                        <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                            <ContainerInputAndTitle widthContainer={"280"}>
                                <TitleInput>Logradouro</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userLogradouro}
                                        onChangeText={setUserLogradouro}
                                        editable={true}
                                        multiline={false}
                                        numberOfLines={1}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userLogradouro}
                                        editable={false}
                                        multiline={false}
                                        numberOfLines={1}
                                    />
                                )}
                            </ContainerInputAndTitle>

                            <ContainerInputAndTitle widthContainer={"100"}>
                                <TitleInput>N°</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userNumero}
                                        onChangeText={setUserNumero}
                                        editable={true}
                                        widthInput={"80px"}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userNumero}
                                        editable={false}
                                        widthInput={"80px"}
                                    />
                                )}
                            </ContainerInputAndTitle>
                        </Container>
                    </>
                ) : (
                    <>
                        <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Data de Nascimento</TitleInput>
                        {isEditing ? (
                            <Input
                                value={userDataNascimento}
                                onChangeText={setUserDataNascimento}
                                editable={true}
                                keyboardType="numeric"
                                {...dataMasked}
                            />
                        ) : (
                            <InputDisable
                                value={userDataNascimento}
                                editable={false}
                                {...dataMasked}
                            />
                        )}

                        <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>RG</TitleInput>
                        {isEditing ? (
                            <Input
                                value={userRg}
                                keyboardType="numeric"
                                onChangeText={setUserRg}
                                editable={true}
                            />
                        ) : (
                            <InputDisable
                                value={
                                    isEditing
                                        ?
                                        userRg
                                        :
                                        UseMask('##.###.###-#', userRg)
                                }
                                editable={false}
                            />
                        )}

                        <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>CPF</TitleInput>
                        {isEditing ? (
                            <Input
                                value={userCPF}
                                onChangeText={setUserCPF}
                                editable={true}
                                keyboardType="numeric" 
                                {...cpfMasked}
                            />
                        ) : (
                            <InputDisable
                                value={userCPF}
                                {...cpfMasked}
                                editable={false}
                            />
                        )}

                        <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14 }}>
                            <ContainerInputAndTitle>
                                <TitleInput>CEP</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userCep}
                                        onChangeText={setUserCep}
                                        keyboardType="numeric"
                                        editable={true}
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
                                        value={userCidade}
                                        onChangeText={setUserCidade}
                                        editable={true}
                                        widthInput={"180px"}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userCidade}
                                        editable={false}
                                        widthInput={"180px"}
                                    />
                                )}
                            </ContainerInputAndTitle>
                        </Container>

                        <Container widthContainer={"90%"} heightContainer={"80px"} justifyContent={"space-between"} flexDirection={"row"} style={{ marginTop: 14, marginBottom: 40 }}>
                            <ContainerInputAndTitle widthContainer={"280"}>
                                <TitleInput>Logradouro</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userLogradouro}
                                        onChangeText={setUserLogradouro}
                                        editable={true}
                                        multiline={false}
                                        numberOfLines={1}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userLogradouro}
                                        editable={false}
                                        multiline={false}
                                        numberOfLines={1}
                                    />
                                )}
                            </ContainerInputAndTitle>

                            <ContainerInputAndTitle widthContainer={"100"}>
                                <TitleInput>N°</TitleInput>
                                {isEditing ? (
                                    <Input
                                        value={userNumero}
                                        onChangeText={setUserNumero}
                                        editable={true}
                                        keyboardType="numeric"
                                        widthInput={"80px"}
                                    />
                                ) : (
                                    <InputDisable
                                        value={userNumero}
                                        editable={false}
                                        widthInput={"80px"}
                                    />
                                )}
                            </ContainerInputAndTitle>
                        </Container>
                    </>
                )}



                <CustomButton style={{ marginBottom: 20 }} onPress={salvarAlteracoes}>
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