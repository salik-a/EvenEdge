import React, { useCallback, useState, useRef } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import styles from './Search.style';
import Header from '../../components/Header';
import { TextInput } from 'react-native-paper';
import allActivities from '../../utils/allActivities.json';
import ActivityCard from '../../components/ActivityCard';
import { useNavigation } from '@react-navigation/native';

type TActivity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};
const Search: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [activityList, setActivityList] = useState<TActivity[]>(allActivities);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef(null);
  const navigation = useNavigation();

  const handleChangeText = useCallback((text: string) => {
    setValue(text);
    function startsWithActivity(activity: string, searchString: string) {
      return activity.startsWith(searchString);
    }
    const filteredActivities = allActivities.filter((activity) =>
      startsWithActivity(activity.activity.toLowerCase(), text.toLowerCase()),
    );
    setActivityList(filteredActivities);
  }, []);

  const handleClosePress = useCallback(() => {
    inputRef.current.blur();
    setIsFocused(false);
    setValue('');
    setActivityList(allActivities);
  }, [allActivities]);

  const renderItem = useCallback(
    ({ item, index }: { item: TActivity; index: number }) => {
      return (
        <ActivityCard
          activity={item.activity}
          type={item.type}
          participants={item.participants}
          price={item.price}
          onPress={() =>
            navigation.navigate('Chat', {
              item: { ...item, sendRequest: true },
            })
          }
          containerStyle={{ marginVertical: 5, borderWidth: 0.2 }}
        />
      );
    },
    [],
  );
  const renderCenterHeader = useCallback(() => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          ref={inputRef}
          placeholder="Search"
          mode="outlined"
          value={value}
          onChangeText={handleChangeText}
          left={<TextInput.Icon icon="text-search" />}
          right={
            value !== '' ? (
              <TextInput.Icon onPress={handleClosePress} icon="close-circle" />
            ) : null
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            backgroundColor: 'white',
            borderRadius: 20,
            width: isFocused ? '80%' : '99%',
          }}
          outlineStyle={{ borderRadius: 50 }}
          outlineColor="#00000050"
          activeOutlineColor="black"
        />
        {isFocused && (
          <TouchableOpacity onPress={Keyboard.dismiss}>
            <Text style={{ fontSize: 18, marginLeft: 4 }}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [value, setValue, isFocused, setIsFocused]);

  return (
    <SafeAreaView style={styles.container}>
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
        centerComponent={renderCenterHeader()}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
        <View style={styles.innerContainer}>
          <FlatList
            data={activityList}
            renderItem={renderItem}
            keyExtractor={(item: TActivity) => item.key}
            onScroll={Keyboard.dismiss}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
