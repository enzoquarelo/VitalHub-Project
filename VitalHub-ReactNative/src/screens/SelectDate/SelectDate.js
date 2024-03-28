import { React, useState, useEffect } from "react";

import { Calendar, LocaleConfig } from "react-native-calendars";
import { SelectList } from "react-native-dropdown-select-list";

//import Components
import { Container } from "../../components/Container/style";
import { Title } from "../../components/Title/style";
import { TextSelectDatelabel, ViewCalendar } from "./style";


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

export const SelectDate = ({ navigation }) => {
    const [selected, setSelected] = useState("");

    const [category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");

    const categories = [
        { key: '9h', value: '09:00' },
        { key: '10h', value: '10:00' },
    ]

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
        <Container>
            <Title style={{ marginBottom: 20 }}>Selecionar Data</Title>

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

            <View>
                <SelectList
                    setSelected={setCategory}
                    data={categories}
                    placeholder="Selecione o Horário"
                    defaultOption={{ key: '9h', value: '09:00' }}
                    style={{
                        width: '90%', // Define a largura para 90% da tela
                        borderColor: '#34898F', // Define a cor da borda
                        borderWidth: 1, // Define a espessura da borda
                        borderRadius: 5, // Define o raio da borda para arredondar os cantos
                        padding: 10, // Adiciona um pouco de padding interno
                        marginBottom: 20, // Adiciona um espaço abaixo do componente
                    }}
                    placeholderStyle={{
                        color: '#34898F', // Define a cor do texto do placeholder
                    }}
                />
            </View>
        </Container>
    );
};