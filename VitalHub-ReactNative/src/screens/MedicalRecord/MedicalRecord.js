import React, { useState, useEffect } from 'react';
import { ScrollView, Button } from 'react-native';

// Importação dos componentes personalizados
import { Container } from '../../components/Container/style';
import { UserImage } from '../Profile/style';
import { Title } from '../../components/Title/style';
import { DefaultText } from '../../components/DefaultText/DefaultText';
import { Input, TitleInput, InputDisable } from '../../components/Input/styles';
import { CustomButton, TitleButton } from '../../components/Button/styles';
import { Links } from '../../components/Links/style';
import { useNavigation } from '@react-navigation/native';

import api from '../../service/service';

export const MedicalRecord = ({ route }) => {

    const navigation = useNavigation();

    const [userName, setUserName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [descricao, setDescricao] = useState('');
    const [diagnostico, setDiagnostico] = useState('');
    const [prescricao, setPrescricao] = useState('');

    const [data, setData] = useState('');
    const [isFuture, setIsFuture] = useState(false);

    const [isEditing, setIsEditing] = useState(false); // Estado para controle de edição

    const { consultaId } = route.params;

    async function Cadastrar() {
        try {
            const response = await api.put('/Consultas/Prontuario', {
                consultaId: consultaId,
                descricao: descricao,
                diagnostico: diagnostico,
                prescricao: prescricao
            });

            console.log(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    }

    async function BuscarConsulta() {
        try {
            const response = await api.get(`/Consultas/BuscarPorId?id=${consultaId}`);
            const paciente = response.data.paciente;
            setUserName(paciente.idNavigation.nome);
            setUserEmail(paciente.idNavigation.email);
            setUserPhoto(paciente.idNavigation.foto);

            const currentDate = new Date();
            const consultationDate = new Date(response.data.dataConsulta);
            if (consultationDate > currentDate) {
                setDescricao(response.data.descricao);
                setDiagnostico(response.data.diagnostico);
                setPrescricao(response.data.receita.medicamento);
            } else {
                setDescricao('');
                setDiagnostico('');
                setPrescricao('');
            }

            setData(response.data.dataConsulta);
            setIsFuture(consultationDate > currentDate);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        BuscarConsulta();
    }, []);

    // Função para alternar entre modo de edição e visualização
    function toggleEditing() {
        setIsEditing(!isEditing);
    }

    return (
        <ScrollView>
            <Container>
                <UserImage source={{ uri: userPhoto }} />

                <Title style={{ marginTop: 14, marginBottom: 5 }}>{userName}</Title>
                <DefaultText>{userEmail}</DefaultText>

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Descrição da consulta</TitleInput>
                {isEditing ? (
                    <Input
                        placeholder="Descrição"
                        value={descricao}
                        onChangeText={(text) => setDescricao(text)}
                        multiline={true}
                        editable={true}
                        heightInput={"120px"}
                        textAlignVertical='top'
                    />
                ) : (
                    <InputDisable
                        placeholder="Descrição"
                        value={descricao}
                        multiline={true}
                        editable={false}
                        heightInput={"120px"}
                        textAlignVertical='top'
                    />
                )}

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Diagnóstico do paciente</TitleInput>
                {isEditing ? (
                    <Input
                        placeholder="Diagnóstico"
                        value={diagnostico}
                        onChangeText={(text) => setDiagnostico(text)}
                        multiline={true}
                        editable={true}
                    />
                ) : (
                    <InputDisable
                        placeholder="Diagnóstico"
                        value={diagnostico}
                        multiline={true}
                        editable={false}
                    />
                )}

                <TitleInput style={{ marginTop: 14, marginBottom: 5 }}>Prescrição médica</TitleInput>
                {isEditing ? (
                    <Input
                        placeholder="Prescrição medica"
                        value={prescricao}
                        onChangeText={(text) => setPrescricao(text)}
                        multiline={true}
                        editable={true}
                        heightInput={"120px"}
                        textAlignVertical='top'
                    />
                ) : (
                    <InputDisable
                        placeholder="Prescrição medica"
                        value={prescricao}
                        multiline={true}
                        editable={false}
                        heightInput={"120px"}
                        textAlignVertical='top'
                    />
                )}

                <CustomButton onPress={() => Cadastrar()} style={{ marginTop: 60, marginBottom: 20 }}>
                    <TitleButton>SALVAR</TitleButton>
                </CustomButton>

                <CustomButton onPress={toggleEditing} style={{ marginBottom: 20 }}>
                    <TitleButton>{isEditing ? "CANCELAR EDIÇÃO" : "EDITAR"}</TitleButton>
                </CustomButton>

                <Links
                    style={{ marginBottom: 40 }}
                    colorLink={"#344F8F"}
                    fontSize={18}
                    onPress={() => navigation.navigate('Main')}
                >
                    Cancelar
                </Links>
            </Container>

        </ScrollView>
    );
};
