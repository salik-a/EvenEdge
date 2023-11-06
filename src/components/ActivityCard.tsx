import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

interface IActivityCard {
  activity: string;
  type: string;
  participants: number;
  price: number;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

const ActivityCard: React.FC<IActivityCard> = ({
  activity,
  type,
  participants,
  price,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Ionicons name="checkmark-done-circle-sharp" size={26} />
      <View>
        <Text style={styles.activityText}>{activity}</Text>
        <Text style={styles.bottomText}>
          {type} · {participants} Person · {price}
        </Text>
      </View>
      <Entypo name="chevron-thin-right" size={26} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10,
    width: '90%',
    height: 75,
  },
  activityText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    maxWidth: 250,
  },
  bottomText: {
    color: 'black',
    fontSize: 14,
  },
});

export default ActivityCard;
