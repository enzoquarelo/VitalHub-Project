import styled from "styled-components";

export const Input = styled.TextInput.attrs({
  placeholderTextColor: "#34898f",
})`
  width: 90%;
  height: 53px;
  padding: 16px;
  margin-top: 15px;
  border: 2px solid #49b3ba;
  border-radius: 5px;
  color: #34898f;
  font-size: 16px;
  font-family: "MontserratAlternates_600SemiBold";
`;

export const InputPassword = styled(Input)`
  width: 70px;
  height: 66px;
  margin-top: -250px;
  font-size: 40px;
  padding: 0%;
  padding-left: 20px;
`;

export const InputRecordInsertion = styled(Input)`
    width: 100%;
    height: 130px;
    padding-bottom: 80px;
`;
export const InputRecordInsertion2 = styled(Input)`
  width: 100%;
`
