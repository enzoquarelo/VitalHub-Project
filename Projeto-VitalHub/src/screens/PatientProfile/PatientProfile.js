import {
    Container,
    ContainerInputs,
    ContainerInputs2,
    ContainerInputs3,
    ContainerRecordInsertion,
    ContainerText3,
} from "../../components/Container/Style";
import { ImageRecordInsertion } from "../../components/Logo/Style";
import { TitleRecordInsertion2 } from "../../components/Title/Style";
import {
    TextRecordInsertion,
    TextRecordInsertion2,
    TextRecordPaciente,
} from "../../components/Text/Text";
import {
    InputRecordInsertion,
    InputRecordInsertion2,
} from "../../components/Input/Input";
import {
    ButtonExitApp,
    ButtonRecordInsertion,
    ButtonTitle,
} from "../../components/Button/style";

export const PatientProfile = ({navigation}) => {

    //Chamar a função Login
    async function Login() {
        navigation.replace("Login");
    }

    return (
        <Container>
            <ContainerRecordInsertion>
                <ImageRecordInsertion
                    source={require("../../assets/imagemPaciente.png")}
                />

                <ContainerText3>
                    <TitleRecordInsertion2>Richard Kosta</TitleRecordInsertion2>

                    <TextRecordPaciente>
                        richard.kosta@gmail.com
                    </TextRecordPaciente>
                </ContainerText3>

                <ContainerInputs>
                    <TextRecordInsertion>
                        Data de nascimento:
                    </TextRecordInsertion>
                    <InputRecordInsertion2 placeholder="04/05/1999" />

                    <TextRecordInsertion>CPF</TextRecordInsertion>
                    <InputRecordInsertion2 placeholder="859********" />

                    <TextRecordInsertion>Endereço</TextRecordInsertion>
                    <InputRecordInsertion2 placeholder="Rua Vicenso Silva, 987" />

                    <ContainerInputs2>
                        <ContainerInputs3>
                            <TextRecordInsertion2>Cep</TextRecordInsertion2>
                            <InputRecordInsertion2 placeholder="06548-909" />
                        </ContainerInputs3>

                        <ContainerInputs3>
                            <TextRecordInsertion2>Cidade</TextRecordInsertion2>
                            <InputRecordInsertion2 placeholder="Moema-SP" />
                        </ContainerInputs3>
                    </ContainerInputs2>

                    <ButtonRecordInsertion>
                        <ButtonTitle>SALVAR</ButtonTitle>
                    </ButtonRecordInsertion>
                    <ButtonRecordInsertion>
                        <ButtonTitle>EDITAR</ButtonTitle>
                    </ButtonRecordInsertion>
                    <ButtonExitApp onPress={() => Login()}>
                    <ButtonTitle>sair do app</ButtonTitle>
                    </ButtonExitApp>
                </ContainerInputs>
            </ContainerRecordInsertion>
        </Container>
    );
};
