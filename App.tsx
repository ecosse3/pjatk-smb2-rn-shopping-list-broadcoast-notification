import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

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
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      ReceiveSharingIntent.clearReceivedFiles();
    };
  }, [ReceiveSharingIntent]);

  return (
    <SView>
      <Text>Welcome to Broadcoast Receiver for Shopping List app</Text>
      {receivedText && (
        <LastNotificationView>
          <Text style={{ fontWeight: 'bold' }}>Ostatnie powiadomienie:</Text>
          <Text>{receivedText}</Text>
        </LastNotificationView>
      )}
      <Text style={{ marginTop: 20 }}>Autor:</Text>
      <Text style={{ fontWeight: 'bold' }}>Łukasz Kurpiewski</Text>
    </SView>
  );
};

export default App;
