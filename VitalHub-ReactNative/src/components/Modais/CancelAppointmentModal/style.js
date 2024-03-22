import styled from 'styled-components/native';

export const ModalContainer = styled.View`
 flex: 1;
 align-items: center ;
 justify-content:center ;

 background-color: rgba(0, 0, 0, 0.60) ;
`;

export const ModalView = styled.View`
 width: 90%;
 height: 310px;

 background-color: #FFFFFF;
 border-radius: 15px;
 
 display: flex;
 justify-content: space-around;
 align-items: center;

 padding: 10%;

 shadow-color: #000;
 shadow-offset: 0px 2px;
 shadow-opacity: 0.25;
 shadow-radius: 4px;
 elevation: 5;
`;