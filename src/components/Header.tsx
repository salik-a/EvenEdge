import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

interface IHeader {
  title: string;
  showGoBack?: boolean;
  rightIcon?: JSX.Element;
  rightIconPress?: () => void;
  centerComponent?: JSX.Element;
}

const Header: React.FC<IHeader> = ({
  title,
  showGoBack = false,
  rightIcon,
  rightIconPress,
  centerComponent,
}) => {
  const navigation = useNavigation();
  const renderCenterContent = useCallback(() => {
    if (React.isValidElement(centerComponent)) {
      return centerComponent;
    } else {
      return null;
    }
  }, [centerComponent]);

  const renderRightIcon = useCallback(() => {
    if (React.isValidElement(rightIcon)) {
      return rightIcon;
    } else {
      return null;
    }
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#00000015'} />
      <View style={styles.titleContainer}>
        <View style={styles.title}>
          {showGoBack && (
            <Entypo
              style={styles.backIcon}
              name="chevron-thin-left"
              size={26}
              onPress={() => navigation.goBack()}
            />
          )}
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {rightIcon && (
          <TouchableOpacity onPress={rightIconPress}>
            {renderRightIcon()}
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.centerComponent}>{renderCenterContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#00000015',
    marginBottom: 20,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
  },
  centerComponent: {
    marginTop: 10,
  },
  backIcon: {
    marginRight: 10,
  },
});

export default Header;
