import { DeviceEventEmitter } from 'react-native';
import Notification from 'react-native-push-notification';

Notification.configure({
    onRegister: (token) => console.log('[notification.ts line 4]: ', token),
    onNotification: (notification: any) => {
        // console.log('[notification.ts line 6]: ', notification);
    }
});

export default (
    noteId: number,
    subText: string,
    tag: string,
    title: string,
    message: string,
    date: Date,
    color: string = 'white',
    soundName: string = 'default'
) => {

    Notification.localNotificationSchedule({
        id: String(noteId),
        subText,
        tag,
        ongoing: false,
        visibility: 'private',
        importance: 'high',
        priority: 'high',
        title,
        message,
        playSound: true,
        soundName,
        autoCancel: true,
        date,
        color,
        vibrate: true,
        vibration: 2000
    })
}