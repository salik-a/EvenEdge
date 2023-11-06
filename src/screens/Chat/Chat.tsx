import React, { useCallback, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './Chat.style';
import Header from '../../components/Header';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { apiKey } from '../../utils/constants';

const Chat: React.FC = ({ route }) => {
  const message = useMemo(() => route.params.message, [route]);
  const [gptMessage, setGptMessage] = useState('');
  const handleSubmit = async () => {
    const client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'OpenAI-Organization': 'org-OPKit4SghBGYNqyRm0pi8Emt',
      },
    });
    const response = await client.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: message,
        temperature: 0.7,
        max_tokens: 150,
        model: 'text-davinci-003',
      },
    );
    setGptMessage(response.data.choices[0].text);
  };
  useFocusEffect(
    useCallback(() => {
      handleSubmit();
    }, []),
  );
  return (
    <View style={styles.container}>
      <Header
        title={'Bored AI'}
        rightIcon={
          <Image
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../assets/icAvatar.png')}
          />
        }
        showGoBack
      />
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <View style={[styles.messageContainer, styles.gptMessageContainer]}>
        <Text style={styles.messageText}>
          {gptMessage === '' ? 'Thinking...' : gptMessage}
        </Text>
      </View>
    </View>
  );
};

export default Chat;
