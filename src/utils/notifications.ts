import Notification from 'react-native-push-notification';

Notification.configure({
    onRegister: (token) => console.log('[notification.ts line 4]: ', token),
    onNotification: (notification: any) => {
        // console.log('[notification.ts line 6]: ', notification);
    }
});

export default (
    subText: string,
    tag: string,
    title: string,
    message: string,
    date: Date
) => {

    Notification.localNotificationSchedule({
        subText,
        tag,
        ongoing: false,
        visibility: 'private',
        importance: 'high',
        priority: 'high',
        title,
        message,
        playSound: true,
        soundName: 'default',
        autoCancel: true,
        date
    })
}