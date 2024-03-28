import { Image } from 'react-native'

export const Logo = () => {
    return (
        <Image
        source={require("../../../assets/images/VitalHub_logo.png")}
        style={{height: 120, width: 240}}
        />
    )
}