import React, {useEffect} from 'react';
import Background from '../components/Background';
import {StyleSheet, Image, Text} from 'react-native';

const SplashScreen = ({navigation, route}) => {
  const accountType = route.params.accountType;

  useEffect(() => {
    setTimeout(() => navigation.navigate('login', {accountType}), 1500);
  });

  return (
    <Background>
      <Image
        source={
          accountType === 'STUDENT'
            ? require('../assets/images/student-main.png')
            : require('../assets/images/teacher-main.png')
        }
        style={styles.mainImage}
      />
      <Text style={styles.title}>{accountType}</Text>
    </Background>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  mainImage: {
    marginTop: 96,
    marginHorizontal: 32,
  },
  title: {
    marginTop: 48,
    color: '#435C59',
    fontFamily: 'Petrona-Bold',
    fontSize: 48,
    textAlign: 'center',
  },
});
