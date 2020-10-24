import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Image, Text, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const HomeScreen = ({navigation}) => {
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

  const handleLeftSwipe = () =>
    navigation.navigate('login', {accountType: 'TEACHER'});

  const handleRightSwipe = () =>
    navigation.navigate('login', {accountType: 'STUDENT'});

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['rgba(234, 205, 163, 0.1)', 'rgba(214, 174, 123, 0.85)']}
      locations={[-0.1203, 1.0219]}>
      <Image
        source={require('../assets/images/homeImage.png')}
        style={styles.mainImage}
      />
      <GestureRecognizer
        style={styles.gesture}
        onSwipe={(direction) => handleSwipe(direction)}>
        <LinearGradient
          style={styles.student}
          colors={['rgba(250, 244, 236, 0)', '#FAF4EC']}
          locations={[0.5, 1]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.largeText}>STUDENT</Text>
        </LinearGradient>
        <LinearGradient
          style={styles.teacher}
          colors={['rgba(250, 244, 236, 0)', '#FAF4EC']}
          locations={[0.5, 1]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}>
          <Text style={styles.largeText}>TEACHER</Text>
        </LinearGradient>
        <Image
          source={require('../assets/images/right-arrow-double.png')}
          style={styles.right}
        />
        <Image
          source={require('../assets/images/left-arrow-double.png')}
          style={styles.left}
        />
      </GestureRecognizer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  mainImage: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 72,
  },
  student: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 208,
    height: 220,
    borderRadius: 90.5,
    position: 'absolute',
    left: -104,
    bottom: Dimensions.get('window').height * 0.05 || 30,
    textAlign: 'center',
  },
  largeText: {
    fontSize: 16,
    marginHorizontal: 4,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  },
  teacher: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 208,
    height: 220,
    borderRadius: 90.5,
    position: 'absolute',
    right: -104,
    bottom: Dimensions.get('window').height * 0.05 || 30,
    textAlign: 'center',
  },
  right: {
    position: 'absolute',
    left: 128,
    bottom: Dimensions.get('window').height * 0.19 || 120,
  },
  left: {
    position: 'absolute',
    right: 128,
    bottom: Dimensions.get('window').height * 0.19 || 120,
  },
  gesture: {flex: 1, position: 'relative'},
});

export default HomeScreen;
