import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import PushNotification from 'react-native-push-notification';

const SView = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LastNotificationView = styled.View`
  border: 1px;
  border-style: dashed;
  border-radius: 1px;
  margin-top: 20px;
  padding: 10px;
`;

const App: React.FC = () => {
  const [receivedText, setReceivedText] = useState(null);

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {
        console.log(files);
        setReceivedText(files[0].text);
        PushNotification.localNotification({
          channelId: '1', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.

          invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

          title: 'Nowe produkty',
          message: files[0].text
        });
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
      setReceivedText(null);
    };
  }, []);

  return (
    <SView>
      <Text>Welcome to Broadcoast Receiver for Shopping List app</Text>
      {receivedText ? (
        <LastNotificationView>
          <Text style={{ fontWeight: 'bold' }}>Ostatnie powiadomienie:</Text>
          <Text>{receivedText}</Text>
        </LastNotificationView>
      ) : (
        <LastNotificationView>
          <Text>Brak nowych powiadomień</Text>
        </LastNotificationView>
      )}
      <Text style={{ marginTop: 20 }}>Autor:</Text>
      <Text style={{ fontWeight: 'bold' }}>Łukasz Kurpiewski</Text>
    </SView>
  );
};

export default App;
