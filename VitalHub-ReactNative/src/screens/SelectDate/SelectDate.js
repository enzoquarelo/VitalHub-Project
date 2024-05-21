import { React, useState, useEffect } from "react";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";

//import Components
import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { TextSelectDatelabel, ViewCalendar } from "./style";
import { DefaultText } from "../../components/DefaultText/DefaultText";

//import fonts
import {
    useFonts,
    MontserratAlternates_600SemiBold,
} from "@expo-google-fonts/montserrat-alternates";

import {
    Quicksand_500Medium,
    Quicksand_600SemiBold,
} from "@expo-google-fonts/quicksand";
import { View } from "react-native";
import { CustomButton, TitleButton } from "../../components/Button/styles";
import { Links } from "../../components/Links/style";
import { FinalDataQueryModal } from "../../components/Modais/FinalDataQueryModal/FinalDataQueryModal";

import moment from "moment";

export const SelectDate = ({ navigation, route }) => {
    const [selected, setSelected] = useState("");
    const [showModalQuery, setShowModalQuery] = useState(false);
    const [category, setCategory] = useState(null);

    const [agendamento, setAgendamento] = useState({});

    const [textWarning, setTextWarning] = useState('')

    const workHours = generateWorkHours(8, 22);

    function generateWorkHours(startHour, endHour) {
        const hours = [];
        for (let hour = startHour; hour <= endHour; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
                const formattedMinute = minute === 0 ? "00" : `${minute}`;
                const time = `${formattedHour}:${formattedMinute}`;
                hours.push({
                    key: `${formattedHour}:${formattedMinute}`,
                    value: time,
                });
            }
        }
        return hours;
    }

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

    //configuração do calendário
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


    function handleContinue() {
        if (!selected ||!category) {
            setTextWarning("Por favor, selecione o dia e o horário da consulta."); // Exibe uma mensagem de alerta
            return; // Interrompe a execução da função se nenhum dia ou horário estiver selecionado
        }

        setAgendamento({
           ...route.params.agendamento,
            dataConsulta: moment(`${selected} ${category}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm'),
        });

        setShowModalQuery(true);
    }


    return (
        <Container>
            <Title style={{ marginBottom: 20 }}>Selecionar Data</Title>

            <DefaultText
                fontSize={18}
                colorText={"#C81D25"}
                widthText={"90%"}
            >
                {textWarning}
            </DefaultText>

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

            <SelectList
                setSelected={(val) => setCategory(val)}
                data={workHours}
                placeholder="Selecione o Horário"
                fontFamily="MontserratAlternates_600SemiBold"
                boxStyles={{
                    width: "90%",
                    borderColor: "#34898F",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    marginTop: 45,
                }}
                dropdownStyles={{
                    borderColor: "#34898F",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    display: "flex",
                    alignItems: "start",
                }}
                inputStyles={{
                    color: "#34898F",
                    fontSize: 16,
                }}
                dropdownTextStyles={{
                    color: "#34898F",
                    fontSize: 16,
                }}
                arrowicon={
                    <FontAwesome
                        name="chevron-down"
                        size={14}
                        color={"#34898F"}
                    />
                }
                search={false}
            />

            <CustomButton
                style={{ marginTop: 50 }}
                onPress={() => handleContinue()}
            >
                <TitleButton>Continuar</TitleButton>
            </CustomButton>

            <Links
                colorLink={"#344F8F"}
                fontSize={18}
                style={{ marginTop: 12 }}
                onPress={() => navigation.navigate("Main")}
            >
                Cancelar
            </Links>

            <FinalDataQueryModal
                visible={showModalQuery}
                setShowModalQuery={setShowModalQuery}
                agendamento={agendamento}
            />
        </Container>
    );
};
