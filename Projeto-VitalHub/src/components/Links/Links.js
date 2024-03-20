import styled from "styled-components";

export const LinkMedium = styled.Text`
  font-size: 16px;
  font-family: "MontserratAlternates_500Medium";
  color: #8c8a97;
  margin-top: 10px;
  margin-bottom: 15px;
  align-self: flex-start;
  margin-left: 20px;
  text-decoration: underline;
`;
export const LinkAccount = styled(LinkMedium)`
  margin-top: 0;
  color: #4d659d;
  font-family: "MontserratAlternates_600SemiBold";
  margin-left: 5px;
`;
export const LinkMediumEmail = styled(LinkMedium)`
  color: #496bba;
  margin: 0;
  align-self: center;
`;
export const LinkMediumEmailReenviar = styled(LinkMedium)`
  align-items: center;
  margin-left: 135px;
  margin-top: 30px;
  color: #344F8F
`;
export const LinkRecordInsertion = styled(LinkMedium)`
  align-self: center;
  margin-left: 0;
  margin-top: 30px;
  margin-bottom: 30px;
`;


