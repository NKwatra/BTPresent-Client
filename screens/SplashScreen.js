import React, {useEffect, useRef} from 'react';
import Background from '../components/Background';
import {StyleSheet, Image, Text, Animated} from 'react-native';

const SplashScreen = ({navigation, route}) => {
  const accountType = route.params.accountType;
  let imageOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('i ran');
    let timeout = setTimeout(
      () => navigation.navigate('login', {accountType, backButton: true}),
      1500,
    );

    Animated.timing(imageOpacity, {
      toValue: 1,
      duration: 1000,
    }).start();

    return () => clearTimeout(timeout);
  }, [navigation, accountType, imageOpacity]);

  return (
    <Background>
      <Animated.View style={{opacity: imageOpacity}}>
        <Image
          source={
            accountType === 'STUDENT'
              ? require('../assets/images/student-main.png')
              : require('../assets/images/teacher-main.png')
          }
          style={styles.mainImage}
        />
        <Text style={styles.title}>{accountType}</Text>
      </Animated.View>
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
