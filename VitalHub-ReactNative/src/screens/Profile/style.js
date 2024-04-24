import styled from "styled-components";

export const UserImage = styled.Image`
  width: 100%;
`;
export const ButtonCamera = styled.TouchableOpacity.attrs({
  ActiveOpacity: 0.8,
})`
  padding: 12px;
  border-radius: 10px;
  background-color: #496bba;
  border: 1px solid #fbfbfb;

  bottom: -25px;
  right: -120px;
  position: absolute;
`;
export const ViewImage = styled.View`
  whidht: 100%;
`;

export const LastPhoto = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 5px;
`;

export const ButtonGaleria = styled.TouchableOpacity`
  width: 60px;
  height: 50px;
  padding: 12px;
  border-radius: 10px;
  margin-top: 770px;
  right: -30px;
  border: 1px solid #fbfbfb;
  background-color: #fbfbfb;
`;
