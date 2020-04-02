import Notification from 'react-native-push-notification';

Notification.configure({
    onRegister: (token) => console.log('[notification.ts line 4]: ', token),
    onNotification: (notification) => console.log('[notification.ts line 5]: ', notification),
    senderID: 'my id'

});

export default () => {
    console.log('Hola');

    Notification.checkPermissions((permissions) => console.log(permissions));

    Notification.localNotificationSchedule({
        // subText: 'Texto secundario',
        // tag: '#mytag',
        // ongoing: true,
        // visibility: 'public',
        // importance: 'high',
        // priority: 'high',
        // title: 'Nombre del título',
        message: 'mensaje de la notificación',
        // playSound: true,
        // repeatType: 'day',
        // soundName: 'default',
        date: new Date(Date.now() + 20 * 1000)
    })
}