import styled from "styled-components";
import {
    Container3,
    Container4,
    Container5,
    ContainerTextPatient2,
} from "../Container/Style";
import { ImageDoctor } from "../Logo/Style";
import {
    TextButtonCard,
    TextHora,
    TextPatient,
    TextPatient3,
} from "../Text/Text";

//Icon
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonCard } from "../Button/style";
import { TouchableOpacity } from "react-native";

export const ApointmentCardDoctor = ({
    situacao = "pendente",
    onPressCancel,
    onPressAppointment,
    onPressDoctor,
}) => {
    return (
        <TouchableOpacity onPress={onPressDoctor}>
            <Container3>
                <ImageDoctor source={require("../../assets/imgLucas.jpg")} />

                <ContainerTextPatient2>
                    <TextPatient3>Dr. Lucas Lacerda</TextPatient3>
                    <TextPatient>36 anos . Cardiologia</TextPatient>
                    <Container5>
                        <Container4 situacao={situacao}>
                            <MaterialCommunityIcons
                                name="clock"
                                size={18}
                                color={
                                    situacao == "pendente"
                                        ? "#49b3ba"
                                        : "#8C8A97"
                                }
                            />
                            <TextHora situacao={situacao}>14:00</TextHora>
                        </Container4>
                        {situacao == "cancelado" ? (
                            <></>
                        ) : situacao == "pendente" ? (
                            <ButtonCard onPress={onPressCancel}>
                                <TextButtonCard situacao={situacao}>
                                    Cancelar
                                </TextButtonCard>
                            </ButtonCard>
                        ) : (
                            <ButtonCard onPress={onPressAppointment}>
                                <TextButtonCard situacao={situacao}>
                                    Prontuário
                                </TextButtonCard>
                            </ButtonCard>
                        )}
                    </Container5>
                </ContainerTextPatient2>
            </Container3>
        </TouchableOpacity>
    );
};
