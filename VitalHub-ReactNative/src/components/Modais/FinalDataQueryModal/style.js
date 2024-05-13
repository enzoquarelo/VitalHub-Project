import styled from "styled-components";

export const QueryDaraModal = styled.View`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.60);
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.View`
    padding: 30px;
    width: 94%;
    height: 75%;
    border-radius: 10px;
    background-color: #fff;
    align-items: center;
`;

export const ContainerDataQueryText = styled.View`
    width: 90%;
    height: 46px;

    display: flex;
    justify-content: space-between;
    align-items: start;
`

export const SubTitleData = styled.Text`
    color: #33303E;

    font-family: "MontserratAlternates_600SemiBold";
    font-size: ${props => (props.fontSize ? props.fontSize + "px" : "18px")};
`

export const TextDataQuery = styled.Text`
    color: #33303e;

    font-family: "Quicksand_500Medium";
    font-size: 16px;
`