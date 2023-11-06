import React, { useCallback, useMemo, useState } from 'react';
import { Image, Text, View } from 'react-native';
import styles from './Chat.style';
import Header from '../../components/Header';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { apiKey } from '../../utils/constants';
import { storage } from '../../services/storage';

const Chat: React.FC = ({ route }) => {
  const item = useMemo(() => route.params.item, [route]);
  const [gptMessage, setGptMessage] = useState('');

  const handleSubmit = async () => {
    const client = axios.create({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'OpenAI-Organization': 'org-OPKit4SghBGYNqyRm0pi8Emt',
      },
    });
    await client
      .post('https://api.openai.com/v1/completions', {
        prompt: item.activity,
        temperature: 0.7,
        max_tokens: 150,
        model: 'text-davinci-003',
      })
      .then((res) => {
        setGptMessage(res.data.choices[0].text);
        const activitiesGetArray = storage.getString('activitiesArray');
        const activitiesArray = activitiesGetArray
          ? JSON.parse(activitiesGetArray)
          : [];
        const serializedArray = JSON.stringify([
          ...activitiesArray,
          { ...item, gptMessage: res.data.choices[0].text, date: Date.now() },
        ]);
        storage.set('activitiesArray', serializedArray);
      })
      .catch((err) => console.log(err));
  };
  useFocusEffect(
    useCallback(() => {
      if (item.sendRequest) {
        handleSubmit();
      } else {
        setGptMessage(item.gptMessage);
      }
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
        <Text style={styles.messageText}>{item.activity}</Text>
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
