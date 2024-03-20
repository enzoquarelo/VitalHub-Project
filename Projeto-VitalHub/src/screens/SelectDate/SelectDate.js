import { ContainerSelectDate } from "../../components/Container/Style";
import { TitleSelectDoctor } from "../../components/Title/Style";

//import Calendario
import { Calendar, LocaleConfig } from "react-native-calendars";
import RNPickerSelect from "react-native-picker-select";

import { TextSelectDatelabel, ViewCalendar } from "./style";
import { ButtonRegister, ButtonTitle } from "../../components/Button/style";
import { ContentAccount } from "../../components/ContentAccount/ContentAccount";
import { LinkAccount } from "../../components/Links/Links";
import {ConfirmAppointment} from "../../components/ConfirmAppointment/ConfirmAppointment"

//import fonts
import {
  useFonts,
  MontserratAlternates_600SemiBold,
} from "@expo-google-fonts/montserrat-alternates";

import {
  Quicksand_500Medium,
  Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { useState } from "react";
import ComponenteSelecaoDeHorario from "../../components/ComponentePicke/ComponentePicke";

export const SelectDate = ({ navigation }) => {
    const [selected, setSelected] = useState("");
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    const [fontsLoaded, fontsError] = useFonts({
        MontserratAlternates_600SemiBold,
        Quicksand_500Medium,
        Quicksand_600SemiBold,
    });

    //fontsLoaded
    if (!fontsLoaded && !fontsError) {
        return null;
    }

    const handleDatePress = (date) => {
        setSelected(date);
    };

    const today = new Date().toISOString().split("T")[0]; // Obter a data atual em formato "YYYY-MM-DD"

    const markedDates = {
        [today]: {
            selected: true,
            selectedColor: "#496bba",
            dotColor: "#60BFC5",
        },
        [selected]: {
            selected: true,
            selectedColor: "#60BFC5",
            dotColor: "#60BFC5",
        },
    };

    LocaleConfig.locales["pt-br"] = {
        monthNames: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro".split("_"),
        ],
        monthNames: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro".split("_"),
        ],
        monthNamesShort: [
            "jan",
            "fev",
            "mar",
            "abr",
            "mai",
            "jun",
            "jul",
            "ago",
            "set",
            "out",
            "nov",
            "dez".split("_"),
        ],
        dayNames: [
            "Dimanche",
            "Lundi",
            "Mardi",
            "Mercredi",
            "Jeudi",
            "Vendredi",
            "Samedi",
        ],
        dayNamesShort: [
            "Dom",
            "Seg",
            "Ter",
            "Qua",
            "Qui",
            "Sex",
            "Sáb".split("_"),
        ],
    };

    LocaleConfig.defaultLocale = "pt-br";


    //Chamar a função PatientConsultations
    async function PatientConsultations() {
        navigation.replace("PatientConsultations");
    }
    // //Chamar a função ConfirmAppointment
    // async function ConfirmAppointment() {
    //     navigation.replace("ConfirmAppointment");
    // }

    return (
        <ContainerSelectDate>
            <TitleSelectDoctor>Selecionar data</TitleSelectDoctor>
            <ViewCalendar>
                <Calendar
                    hideArrows={true}
                    markedDates={markedDates}
                    onDayPress={(day) => handleDatePress(day.dateString)}
                    enableSwipeMonths={true}
                    theme={{
                        textSectionTitleColor: "#5F5C6B",
                        todayTextColor: "#34898F",
                        dayTextColor: "black",

                        textDayFontFamily: "Quicksand_600SemiBold",
                        textMonthFontFamily: "MontserratAlternates_600SemiBold",
                        textDayHeaderFontFamily: "Quicksand_600SemiBold",
                    }}
                    monthFormat={"MMMM yyyy"}
                />
            </ViewCalendar>
            <TextSelectDatelabel>
                Selecione um horário disponível
            </TextSelectDatelabel>
            <ComponenteSelecaoDeHorario />
            <ButtonRegister onPress={() => setShowModalConfirm(true)}>
                <ButtonTitle>CONFIRMAR</ButtonTitle>
            </ButtonRegister>

            <ConfirmAppointment
                visible={showModalConfirm}
                setShowModalConfirm={setShowModalConfirm}
                navigation={navigation}
            />

            <ContentAccount>
                <LinkAccount onPress={() => PatientConsultations()}>
                    Cancelar
                </LinkAccount>
            </ContentAccount>
        </ContainerSelectDate>
    );
};
