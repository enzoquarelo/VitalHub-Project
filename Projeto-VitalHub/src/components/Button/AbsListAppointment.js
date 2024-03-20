import { ButtonTabsStyle, TextButton } from "./style";

export const AbsListAppointment = ({
    textButton,
    clickButton = false,
    onPress,
}) => {
    return (
        <ButtonTabsStyle clickButton={clickButton} onPress={onPress}>
            <TextButton clickButton={clickButton}>{textButton}</TextButton>
        </ButtonTabsStyle>
    );
};



