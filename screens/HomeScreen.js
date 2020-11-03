import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Background from '../components/Background';
import AccountType from '../components/AccountType';
import {setAccountType} from '../utils/AsyncStorage';
import {isAuthenticated} from '../utils/Auth';
import {PacmanIndicator} from 'react-native-indicators';

const HomeScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const authStatePromise = isAuthenticated();
      authStatePromise.then((authState) => {
        if (authState) {
          navigation.navigate('login', {...authState});
        }
        setLoading(false);
      });
    }, 300);
  }, [navigation]);

  const handleSwipe = (direction) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (direction) {
      case SWIPE_LEFT:
        handleLeftSwipe();
        break;
      case SWIPE_RIGHT:
        handleRightSwipe();
        break;
    }
  };

  const handleLeftSwipe = () => {
    setAccountType('TEACHER').then(
      navigation.navigate('splash', {accountType: 'TEACHER'}),
    );
  };

  const handleRightSwipe = () => {
    setAccountType('STUDENT').then(
      navigation.navigate('splash', {accountType: 'STUDENT'}),
    );
  };

  return (
    <Background>
      {loading ? (
        <PacmanIndicator color="#435C59" size={200} />
      ) : (
        <>
          <Image
            source={require('../assets/images/homeImage.png')}
            style={styles.mainImage}
          />
          <GestureRecognizer
            style={styles.gesture}
            onSwipe={(direction) => handleSwipe(direction)}>
            <AccountType
              type="STUDENT"
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.student}
            />
            <AccountType
              type="TEACHER"
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.teacher}
            />
            <Image
              source={require('../assets/images/right-arrow-double.png')}
              style={[styles.arrow, styles.right]}
            />
            <Image
              source={require('../assets/images/left-arrow-double.png')}
              style={[styles.arrow, styles.left]}
            />
          </GestureRecognizer>
        </>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  mainImage: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 72,
  },
  arrow: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.19 || 120,
  },
  student: {
    alignItems: 'flex-end',
    left: -104,
  },
  teacher: {
    alignItems: 'flex-start',
    right: -104,
  },
  right: {
    left: 128,
  },
  left: {
    right: 128,
  },
  gesture: {
    flex: 1,
    position: 'relative',
  },
});

export default HomeScreen;
