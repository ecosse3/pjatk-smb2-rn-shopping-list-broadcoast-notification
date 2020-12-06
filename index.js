/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import SendIntentAndroid from 'react-native-send-intent';
import App from './App';
import { name as appName } from './app.json';

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
    SendIntentAndroid.openApp('com.pjatksmb1rnshoppinglist').then((wasOpened) =>
      console.log(wasOpened)
    );
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios'
});

PushNotification.createChannel(
  {
    channelId: '1', // (required)
    channelName: 'Main channel', // (required)
    channelDescription: 'A channel for main notifications', // (optional) default: undefined.
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true // (optional) default: true. Creates the default vibration patten if true.
  },
  (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);
