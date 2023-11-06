import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './Home.style';
import Header from '../../components/Header';
import activities from '../../utils/activityTypes.json';
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
              style={[
                styles.activityContainer,
                {
                  backgroundColor: values.type === title ? 'black' : '#fff15',
                },
              ]}>
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
    <SafeAreaView style={styles.container}>
      <Header
        title={'Bored AI'}
        rightIcon={
          <Image
            style={styles.headerImage}
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
          onPress={() =>
            navigation.navigate('Chat', {
              item: { ...data, sendRequest: true },
            })
          }
        />
      ) : (
        <View style={styles.topContainer}>
          <Ionicons name={loading ? 'reload' : 'search'} size={26} />
          <View>
            <Text style={styles.topText}>
              {loading ? 'Loading ...' : 'Stop Being Bored!'}
            </Text>
            <Text style={styles.bottomText}>
              {loading
                ? 'Searching for activities'
                : 'Configure parameters to find activities.'}
            </Text>
          </View>
        </View>
      )}
      <View style={styles.slidersContainer}>
        <Text style={styles.topText}>Price</Text>
        <Text>{Number(values.price).toFixed(1)}</Text>
        <Slider
          style={styles.sliderStyle}
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
        <Text style={styles.topText}>Participants</Text>
        <Text>{Number(values.participants).toFixed(0)}</Text>
        <Slider
          style={styles.sliderStyle}
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
        <Text style={styles.topText}>Accessibility</Text>
        <Text>{Number(values.accessibility).toFixed(1)}</Text>
        <Slider
          style={styles.sliderStyle}
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
        style={styles.randomizeButton}
        textColor="black"
        onPress={handleRandomize}>
        Randomize Values
      </Button>
      <Button
        mode="contained"
        style={styles.findButton}
        textColor="white"
        onPress={handleFindActivity}>
        Find Activity
      </Button>
    </SafeAreaView>
  );
};

export default Home;
