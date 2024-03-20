import styled from "styled-components";

//import linearGradiente
import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #fafafa;
`;

export const Container2 = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 15px 5px 15px 5px;
`;

export const Container3 = styled.View`
  flex-direction: row;
  width: 90%;
  align-self: center;
  height: 120px;
  align-items: center;
  /* elevation: 1px; */
  border-radius: 5px;
  background-color: #fefcfc;
  margin-top: 15px;
  background-color: #F5F3F3;
`;

export const Container4 = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 30px;
  background-color: ${({ situacao }) =>
    situacao === "pendente" ? "#dffdff" : "#F1F0F5"};
  /* background-color: #dffdff; */
  border-radius: 5px;
  margin-top: 10px;
`;

export const Container9 = styled(Container4)`
  background-color: #E8FCFD;
`

export const Container5 = styled.View`
  flex-direction: row;
`;

export const Container6 = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fefcfc;
  position: absolute;
  bottom: 0;
`;

export const Container7 = styled.View`
  flex-direction: row;
  background-color: #ecf2ff;
  width: 120px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const Container8 = styled(Container6)`
  justify-content: space-around;
`;

export const ContainerInputs = styled.View`
  width: 90%;
  align-self: center;
  margin-top: 65px;
  margin-bottom: 30px;
`;

export const ContainerInputs2 = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 20px;
`;

export const ContainerInputs3 = styled.View`
  width: 45%;
`;

export const ContainerIcon = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  margin-top: 20px;
  margin-bottom: -40px;
`;

export const ContainerIconPatient = styled.View`
  margin-left: 120px;
  margin-top: 90px;
`;

export const ContainerIconPatient2 = styled.View`
  margin-left: 120px;
  margin-top: 90px;
`;

export const ContainerEmailCode = styled.View`
  width: 90%;
  flex-direction: row;
  margin-top: 272px;
  justify-content: space-evenly;
  padding: 10px;
`;

export const ContainerRecordInsertion = styled.ScrollView`
  width: 100%;
`;

export const ContainerText = styled.ScrollView`
  width: 100%;
  height: 130px;
  background-color: #e6e6e6;
  margin-top: 20px;
  border-radius: 5px;
`;
export const ContainerText2 = styled(ContainerText)`
  height: 70px;
`;

export const ContainerText3 = styled.View`
  position: absolute;
  margin-top: 270px;
  width: 330px;
  height: 110px;
  background-color: #ffffff;
  border-radius: 5px;
  align-self: center;
  elevation: 10px;
`;

export const ContainerHeader = styled(LinearGradient).attrs({
  colors: ["#60BFC5", "#496BBA"],
  start: { x: -0.05, y: 1.08 },
  end: { x: 1, y: 0 },
})`
  position: relative;
  width: 100%;
  height: 170px;
  flex-direction: row;
  border-radius: 0px 0px 15px 15px;
  elevation: 10px;
`;
export const ContainerImageTextPatient = styled.View`
  position: absolute;
  flex-direction: row;
`;

export const ContainerTextPatient = styled.View`
  margin-left: 10px;
  margin-top: 85px;
`;

export const ContainerTextPatient2 = styled.View`
  margin-left: 10px;
`;

export const ContainerSelectDoctor = styled(Container)`
  padding-top: 80px;
`;
export const ContainerSelectClinicIcon = styled.View`
  align-items: center;
  justify-content: center;
  width: 40%;
  margin-right: -10px;
`;
export const ContainerIcon2 = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: flex-end;
  margin-right: 18px;
`;
export const ContainerTextPatient3 = styled.View`
  padding: 5px;
  width: 60%;
`;
export const ContainerTextPatient4 = styled.View`
  margin-left: 10px;
  gap: 10px;
`;
export const ContainerTextPatient5 = styled.View`
  flex-direction: row;
  margin-left: 10px;
  gap: 10px;
`;

export const ContainerSelectDate = styled(Container)`
   padding-top: 80px;
`
