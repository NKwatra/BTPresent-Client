import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Image, Text} from 'react-native';

const SplashScreen = ({navigation, route}) => {
  const accountType = route.params.accountType;

  useEffect(() => {
    setTimeout(() => navigation.navigate('login', {accountType}), 2000);
  });

  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['rgba(234, 205, 163, 0.1)', 'rgba(214, 174, 123, 0.85)']}
      locations={[-0.1203, 1.0219]}>
      <Image
        source={
          accountType === 'STUDENT'
            ? require('../assets/images/student-main.png')
            : require('../assets/images/teacher-main.png')
        }
        style={styles.mainImage}
      />
      <Text style={styles.title}>{accountType}</Text>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingHorizontal: 32,
  },
  mainImage: {
    marginTop: 96,
  },
  title: {
    marginTop: 48,
    color: '#435C59',
    fontFamily: 'Petrona-Bold',
    fontSize: 48,
    textAlign: 'center',
  },
});
