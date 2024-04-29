import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";

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

export const QueryModalComponent = ({
    navigation,
    visible,
    setShowModalQuery,
    item,
    ...rest
}) => {
    // const navigation = useNavigation();

    const [selectedButton, setSelectedButton] = useState("button1");
    const [agendamento, setAgendamento] = useState(null);

    const handleButtonPress = (buttonName) => {
        setSelectedButton(buttonName);
    };
    const onPressSelectClinic = () => {
        setShowModalQuery(false);

        navigation.navigate("SelectClinic");
    };

    const nivelConsulta = [
        { id: "3fa85f64-5717-4562-b3fc-2c963f66afa6", tipo: "Rotina" },
        { id: "3fa85f64-5717-4562-b3fc-2c963f66aa6", tipo: "Exame" },
        { id: "3fa85f64-5717-4562-b3fc-2c963f66afa", tipo: "Urgencia" },
    ];

    async function handleContinue() {
        await setShowModalQuery(false);   

        navigation.replace("SelectClinic", { agendamento: agendamento });
    }

    return (
        <Modal {...rest} visible={visible} transparent={true} animationType="fade">
            <QueryModal>
                <ModalContent>
                    <Title style={{ marginBottom: 30 }}>Agendar consulta</Title>
                    <TitleInput fontSize={18}>Qual o nível da consulta</TitleInput>
                    <Container heightContainer={'55px'} widthContainer={'90%'} flexDirection={'row'} justifyContent={'space-between'}>
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
                                        prioridadeId: item.id,
                                        prioridadeLabel: item.tipo
                                    })}
                                >
                                    {item.tipo}
                                </SelectableTitleButtonAppointment>
                            </SelectableButtonAppointment>
                        ))}
                    </Container>
                    <TitleInput fontSize={18}>Informe a localização desejada</TitleInput>
                    <Input
                        placeholder="Informe a localização"
                        fontSize={16}
                        style={{ marginTop: 8, marginBottom: 100 }}
                        value={agendamento ? agendamento.localizacao : ''}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento,
                            localizacao: txt
                        })}
                    />
    
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
