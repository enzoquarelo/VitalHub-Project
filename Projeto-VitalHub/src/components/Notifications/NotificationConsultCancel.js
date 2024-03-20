//expo notifications biblioteca
import * as Notifications from "expo-notifications";

//solicitar oermissões de notificação ao iniciar o app
Notifications.requestPermissionsAsync();

//definir como as notificações devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //mostra o alerta quando a notificação for recebida
    shouldShowAlert: true,
    //configura reproduz ou não som ao receber a notificação
    shouldPlaySound: true,
    //configura o numero de notificações no icone do app
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
  
    // Se o usuário não permitiu as notificações, pede permissão
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Se a permissão não foi concedida, sai da função
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Obtém o token do dispositivo para as notificações
    const token = await Notifications.getExpoPushTokenAsync();
  
    // Aqui pode salvar o token do usuário no seu backend
  
    console.log(token);
  }
  
  // Chama a função para registrar as notificações
  registerForPushNotificationsAsync();