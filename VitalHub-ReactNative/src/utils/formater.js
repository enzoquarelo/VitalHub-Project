export const UseMask = (mask, value, secure = false) => {
    let indexValor = 0;
    if (secure) {
        value = Array.from(SecureValue(value.toString()));
    } else {
        value = Array.from(value.toString());
    }

    mask = Array.from(mask);

    let formatedText = ""

    for (let index = 0; index < mask.length; index++) {
        if (mask[index] === "#") {
            if (value[indexValor] != undefined) {
                formatedText += value[indexValor];
                indexValor++;
            } else {
                break;
            }
        } else {
            formatedText += mask[index];
        }
    }

    return formatedText;
}