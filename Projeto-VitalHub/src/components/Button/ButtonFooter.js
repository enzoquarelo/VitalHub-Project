import { ButtonTabsStyle2, TextButton2 } from "./style";

export const ButtonFooter = ({ textButton, clickButton = false, onPress }) => {
    return (
        <ButtonTabsStyle2 clickButton={clickButton} onPress={onPress}>
            <TextButton2 clickButton={clickButton}>{textButton}</TextButton2>
        </ButtonTabsStyle2>
    );
};
