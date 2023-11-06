import React, { useCallback, useState, useRef } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './Search.style';
import Header from '../../components/Header';
import { TextInput } from 'react-native-paper';

const Search: React.FC = () => {
  const [data, setData] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef(null);
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
            <Text style={{ fontSize: 18, marginLeft: 4 }}>Cancel</Text>
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
            style={{
              width: 25,
              height: 25,
            }}
            source={require('../../assets/icAvatar.png')}
          />
        }
        centerComponent={<HeaderCenter />}
      />
    </View>
  );
};

export default Search;
