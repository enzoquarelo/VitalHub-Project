import styled from "styled-components/native";

export const Container = styled.View`
    width: ${props => (props.widthContainer ? props.widthContainer : "100%")};
    height: ${props => (props.heightContainer ? props.heightContainer : "100%")};

    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "white"};

    display: flex;
    align-items: ${props => (props.alignItems ? props.alignItems : "center")};
    justify-content: ${props => (props.justifyContent ? props.justifyContent : "center")};
    flex-direction: ${props => (props.flexDirection ? props.flexDirection : "column")};
`

export const BoxElevation = styled.View`
    width: 75%;
    height: 80px;

    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "white"};

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    border-radius: 10px;

    position: relative;
    bottom: 30;

    elevation: 20;
`

export const ScrollViewContainer = styled(Container)``

export const ContainerInputAndTitle = styled.View`
    width: ${props => (props.widthContainer ? props.widthContainer : "180px")};
    height: 85px;

    display: flex;
    justify-content: space-between;
`

export const ContainerImageExame = styled.View`
  width: 90%;
  height: 180px;
  border: 2px solid #CECCCC;
  border-radius: 5px;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;