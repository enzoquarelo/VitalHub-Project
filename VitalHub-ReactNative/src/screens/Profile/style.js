import styled from "styled-components";

export const UserImage = styled.Image`
    width: 100%;
    height: 280px;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    ActiveOpacity: 0.8,
})`
    padding: 12px;
    border-radius: 10px;
    background-color: #496bba;
    border: 1px solid #fbfbfb;
  
    bottom: -25px;
    right: -180px;
    position: absolute;
  `;
export const ViewImage = styled.View`
    whidht: 100%;
`;

export const LastPhoto = styled.Image`
    width: 60px;
    height: 50px;
    border-radius: 5px;
  `;

export const ButtonGaleria = styled.TouchableOpacity`
    width: 60px;
    height: 50px;
    border-radius: 10px;
  `;
