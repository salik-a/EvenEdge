import React, { useCallback, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Home.style';
import Header from '../../components/Header';
import activities from '../../utils/activities.json';
import Slider from '@react-native-community/slider';
import { Button } from 'react-native-paper';
import getData from '../../services/getData';
import ActivityCard from '../../components/ActivityCard';
import { useNavigation } from '@react-navigation/native';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<any>(null);
  const [values, setValues] = useState({
    price: 0.5,
    participants: 2,
    accessibility: 0.5,
    type: 'All',
  });
  const navigation = useNavigation();

  const handleRandomize = useCallback(() => {
    setValues({
      price: Number(Math.random().toFixed(1)),
      participants: Number(Math.floor(Math.random() * 10).toFixed(0)),
      accessibility: Number(Math.random().toFixed(1)),
      type: activities[Number(Math.floor(Math.random() * 10).toFixed(0))],
    });
  }, []);

  const handleFindActivity = useCallback(() => {
    setLoading(true);
    getData(
      `http://www.boredapi.com/api/activity?participants=${values.participants}&minprice=0&maxprice=${values.price}&minaccessibility=0&maxaccessibility=${values.accessibility}`,
    )
      .then((result) => setData(result))
      .catch((error) => setError(true));
    setLoading(false);
  }, []);

  const HeaderCenter = useCallback(() => {
    return (
      <ScrollView horizontal>
        {activities.map((title) => {
          return (
            <TouchableOpacity
              key={title}
              onPress={() =>
                setValues((exData) => {
                  return { ...exData, type: title };
                })
              }
              style={{
                borderWidth: 1,
                borderRadius: 15,
                paddingVertical: 5,
                paddingHorizontal: 8,
                marginHorizontal: 4,
                backgroundColor: values.type === title ? 'black' : '#fff15',
              }}>
              <Text
                style={{
                  color: values.type === title ? 'white' : 'black',
                  fontWeight: 'bold',
                }}>
                {title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }, [values, setValues]);

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
      {data ? (
        <ActivityCard
          activity={data.activity}
          type={data.type}
          participants={data.participants}
          price={data.price}
          onPress={() => navigation.navigate('Chat')}
        />
      ) : (
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            borderWidth: 1,
            borderRadius: 10,
            width: '90%',
            height: 75,
          }}>
          <Ionicons name={loading ? 'reload' : 'search'} size={26} />
          <View>
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
              {loading ? 'Loading ...' : 'Stop Being Bored!'}
            </Text>
            <Text style={{ color: 'black', fontSize: 14 }}>
              {loading
                ? 'Searching for activities'
                : 'Configure parameters to find activities.'}
            </Text>
          </View>
        </View>
      )}
      <View style={{ alignItems: 'center', width: '100%', marginTop: 20 }}>
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
          Price
        </Text>
        <Text>{Number(values.price).toFixed(1)}</Text>
        <Slider
          style={{ width: '92%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          // minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) =>
            setValues((exData) => {
              return { ...exData, price: value };
            })
          }
          value={values.price}
        />
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
          Participants
        </Text>
        <Text>{Number(values.participants).toFixed(0)}</Text>
        <Slider
          style={{ width: '92%', height: 40 }}
          minimumValue={0}
          maximumValue={10}
          // minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) =>
            setValues((exData) => {
              return { ...exData, participants: value };
            })
          }
          value={values.participants}
        />
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}>
          Accessibility
        </Text>
        <Text>{Number(values.accessibility).toFixed(1)}</Text>
        <Slider
          style={{ width: '92%', height: 40 }}
          minimumValue={0}
          maximumValue={1}
          // minimumTrackTintColor="#000000"
          maximumTrackTintColor="#000000"
          onValueChange={(value) =>
            setValues((exData) => {
              return { ...exData, accessibility: value };
            })
          }
          value={values.accessibility}
        />
      </View>
      <Button
        icon="sync"
        mode="outlined"
        style={{
          width: '80%',
          alignSelf: 'center',
          borderColor: 'black',
          borderRadius: 6,
          marginTop: 20,
        }}
        textColor="black"
        onPress={handleRandomize}>
        Randomize Values
      </Button>
      <Button
        mode="contained"
        style={{
          width: '80%',
          alignSelf: 'center',
          borderColor: 'black',
          borderRadius: 6,
          backgroundColor: 'black',
          marginTop: 12,
        }}
        textColor="white"
        onPress={handleFindActivity}>
        Find Activity
      </Button>
    </View>
  );
};

export default Home;
