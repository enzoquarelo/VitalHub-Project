import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

//import dos componentes
import { Modal } from "react-native";
import { Title } from "../../Title/style";
import { QueryModal, ModalContent } from "./style";
import { Container } from "../../Container/style";
import {
    SelectableButtonAppointment,
    SelectableTitleButtonAppointment,
    CustomButton,
    TitleButton,
} from "../../Button/styles";
import { Input, TitleInput } from "../../Input/styles";
import { Links } from "../../Links/style";
import { DefaultText } from "../../DefaultText/DefaultText";



export const QueryModalComponent = ({
    visible,
    setShowModalQuery,
    item,
    ...rest
}) => {
    const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState(null);
    const [agendamento, setAgendamento] = useState({
        doctorName: "",
        location: "",
        idPriority: "",
        priorityLabel: "",
        idMedicoClinica: ""
    });
    const [textWarning, setTextWarning] = useState('')

    const nivelConsulta = [
        { id: "83EAFA9F-CCA7-474A-9692-4E7871A7BF71", tipo: "Rotina" },
        { id: "82D0291C-3B7C-4F33-B5B4-F84B92CFEA00", tipo: "Exame" },
        { id: "2852FE9D-9F26-4FC0-A389-27B6F5281B03", tipo: "Urgencia" },
    ];

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    };

    //função pra prosseguir com o agendamento da consulta
    const handleContinue = () => {
        // Verifica se o campo de localização está vazio
        if (!agendamento.location.trim()) {
            setTextWarning("Por favor, informe a localização desejada.");
            return; // Interrompe a execução da função se o campo estiver vazio
        }
    
        // Verifica se nenhum botão de nível de consulta foi selecionado
        if (!selectedButton) {
            setTextWarning("Selecione o nível da consulta.");
            return; // Interrompe a execução da função se nenhum botão estiver selecionado
        }
    
        // Se todas as verificações passarem, procede com o agendamento
        setAgendamento({
           ...agendamento
        });
    
        // Fecha o modal
        setShowModalQuery(false);
    
        // Navega para a outra tela, levando o agendamento
        navigation.replace("SelectClinic", { agendamento: agendamento });
    
        console.log(agendamento);
    };

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <QueryModal>
                <ModalContent>

                    <Title style={{ marginBottom: 20 }}>Agendar consulta</Title>

                    <DefaultText
                        fontSize={18}
                        colorText={"#C81D25"}
                        widthText={"90%"}
                    >
                        {textWarning}
                    </DefaultText>
                    <TitleInput fontSize={18}>Informe a localização desejada</TitleInput>

                    <Input
                        placeholder="Informe a localização"
                        fontSize={16}
                        style={{ marginTop: 8, marginBottom: 10 }}
                        value={agendamento ? agendamento.location : ''}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento,
                            location: txt
                        })}
                    />


                    <TitleInput fontSize={18}>Qual o nível da consulta</TitleInput>

                    <Container heightContainer={'55px'} widthContainer={'90%'} flexDirection={'row'} justifyContent={'space-between'} style={{marginBottom: 100}}>
                        {nivelConsulta.map((item, index) => (
                            <SelectableButtonAppointment
                                key={index}
                                selected={selectedButton === `button${index + 1}`}
                                onPress={() => handleButtonPress(`button${index + 1}`)}
                                borderBtn={true}
                                backgroundBtn="white"
                                widthButton={30}
                                heightButton={45}
                            >
                                <SelectableTitleButtonAppointment
                                    colorTxt="white"
                                    fontSize={14}
                                    selected={selectedButton === `button${index + 1}`}
                                    onPress={() => setAgendamento({
                                        ...agendamento,
                                        idPriority: item.id,
                                        priorityLabel: item.tipo
                                    })}
                                >
                                    {item.tipo}
                                </SelectableTitleButtonAppointment>
                            </SelectableButtonAppointment>
                        ))}
                    </Container>

                    <CustomButton onPress={handleContinue}>
                        <TitleButton>CONTINUAR</TitleButton>
                    </CustomButton>

                    <Links
                        onPress={() => setShowModalQuery(false)}
                        colorLink={'#344F8F'}
                        fontSize={18}
                        style={{ marginTop: 12 }}
                    >
                        Cancelar
                    </Links>

                </ModalContent>
            </QueryModal>
        </Modal>
    );
};
