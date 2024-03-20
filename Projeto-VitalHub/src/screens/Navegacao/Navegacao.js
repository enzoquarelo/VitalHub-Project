import { Button, View } from "react-native";

export const Navegacao = ({ navigation }) => {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Button
                title="Login"
                onPress={() => navigation.navigate("Login")}
            />
            <Button
                title="ForgotPassword"
                onPress={() => navigation.navigate("ForgotPassword")}
            />
            <Button
                title="EmailCode"
                onPress={() => navigation.navigate("EmailCode")}
            />
            <Button
                title="NewPassword"
                onPress={() => navigation.navigate("NewPassword")}
            />
            <Button
                title="Register"
                onPress={() => navigation.navigate("Register")}
            />
            <Button
                title="RecordInsertion"
                onPress={() => navigation.navigate("RecordInsertion")}
            />
            <Button
                title="PatientRecordInsertion"
                onPress={() => navigation.navigate("PatientRecordInsertion")}
            />
            <Button
                title="PatientConsultations"
                onPress={() => navigation.navigate("PatientConsultations")}
            />
            <Button
                title="PatientProfile"
                onPress={() => navigation.navigate("PatientProfile")}
            />
            <Button
                title="PatientProfile2"
                onPress={() => navigation.navigate("PatientProfile2")}
            />
            <Button
                title="DoctorConsultations"
                onPress={() => navigation.navigate("DoctorConsultations")}
            />
            <Button
                title="SelectDoctor"
                onPress={() => navigation.navigate("SelectDoctor")}
            />
            <Button
                title="SelectClinic"
                onPress={() => navigation.navigate("SelectClinic")}
            />
            <Button
                title="SelectDate"
                onPress={() => navigation.navigate("SelectDate")}
            />
            <Button
                title="ConsultationLocation"
                onPress={() => navigation.navigate("ConsultationLocation")}
            />
            <Button
                title="MedicalRecord"
                onPress={() => navigation.navigate("MedicalRecord")}
            />
           
        </View>
    );
};
