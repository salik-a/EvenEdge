import React, { useCallback, useState, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './History.style';
import Header from '../../components/Header';
import { TextInput, Portal, Modal, Button } from 'react-native-paper';

const History: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef(null);

  const [visible, setVisible] = React.useState(false);

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);

  const handleDelete = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const HeaderCenter = useCallback(() => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          ref={inputRef}
          placeholder="Search"
          mode="outlined"
          value={data}
          onChangeText={(text) => setData(text)}
          left={<TextInput.Icon icon="text-search" />}
          right={
            data !== '' ? (
              <TextInput.Icon
                onPress={() => {
                  inputRef.current.blur();
                  setIsFocused(false);
                  setData('');
                }}
                icon="close-circle"
              />
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
          <TouchableOpacity>
            <Text style={styles.headerCancel}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }, [data, setData, isFocused, setIsFocused]);
  return (
    <View style={styles.container}>
      <Header
        title={'Bored AI'}
        rightIcon={
          <Image
            style={styles.headerImage}
            source={require('../../assets/trash.png')}
          />
        }
        rightIconPress={showModal}
        centerComponent={<HeaderCenter />}
      />
      <Text>History Screen</Text>
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
    </View>
  );
};

export default History;
