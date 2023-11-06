import React, { useCallback, useState, useRef } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  FlatList,
  SafeAreaView,
} from 'react-native';
import styles from './History.style';
import Header from '../../components/Header';
import { TextInput, Portal, Modal, Button } from 'react-native-paper';
import ActivityCard from '../../components/ActivityCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { storage } from '../../services/storage';
import { useAppSelector } from '../../utils/useStore';
import { deleteAll } from '../../store/historyListSlice';
import { useDispatch } from 'react-redux';

export type TActivity = {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
};

const History: React.FC = () => {
  const [value, setValue] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [visible, setVisible] = React.useState(false);
  const [activityList, setActivityList] = useState<TActivity[]>([]);

  const inputRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const historyListData = useAppSelector((item) => item.history.activityArray);

  useFocusEffect(
    useCallback(() => {
      setActivityList(historyListData);
    }, [historyListData]),
  );

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const handleDelete = useCallback(() => {
    storage.clearAll();
    setActivityList([]);
    hideModal();
    dispatch(deleteAll());
  }, [hideModal]);

  const handleChangeText = useCallback((text: string) => {
    setValue(text);
    function startsWithActivity(activity: string, searchString: string) {
      return activity.startsWith(searchString);
    }
    const filteredActivities = historyListData.filter((activity) =>
      startsWithActivity(activity.activity.toLowerCase(), text.toLowerCase()),
    );
    setActivityList(filteredActivities);
  }, []);

  const handleClosePress = useCallback(() => {
    inputRef.current.blur();
    setIsFocused(false);
    setValue('');
    setActivityList(historyListData);
  }, [historyListData]);

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
              item: { ...item, sendRequest: false },
            })
          }
          containerStyle={styles.activityCard}
        />
      );
    },
    [],
  );

  const renderHeaderCenter = useCallback(() => {
    return (
      <View style={styles.headerCenter}>
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
            <Text style={styles.headerCancel}>Cancel</Text>
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
            style={styles.headerImage}
            source={require('../../assets/trash.png')}
          />
        }
        rightIconPress={showModal}
        centerComponent={renderHeaderCenter()}
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
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContent}>
          <Image
            style={styles.trashImage}
            source={require('../../assets/trash.png')}
          />
          <Text style={styles.deleteTitle}>Delete History</Text>
          <Text style={styles.deleteText}>
            Are you sure to remove all history items, this action is
            irreversible!
          </Text>
          <View style={styles.modalButtons}>
            <Button
              mode="outlined"
              style={styles.randomizeButton}
              textColor="black"
              onPress={hideModal}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={styles.findButton}
              textColor="white"
              onPress={handleDelete}>
              Delete
            </Button>
          </View>
        </Modal>
      </Portal>
    </SafeAreaView>
  );
};

export default History;
