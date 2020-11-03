import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, Text, Dimensions} from 'react-native';

const AccountType = (props) => {
  return (
    <LinearGradient
      style={[styles.position, props.style]}
      colors={['rgba(250, 244, 236, 0)', '#FAF4EC']}
      locations={[0.5, 1]}
      start={props.start}
      end={props.end}>
      <Text style={styles.largeText}>{props.type}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  largeText: {
    fontSize: 16,
    marginHorizontal: 4,
    fontFamily: 'Montserrat-Medium',
    fontWeight: '500',
  },
  position: {
    justifyContent: 'center',
    width: 208,
    height: 220,
    borderRadius: 90.5,
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.05 || 30,
    textAlign: 'center',
  },
});

export default AccountType;
