import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet} from 'react-native';

const Background = (props) => {
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['rgba(234, 205, 163, 0.1)', 'rgba(214, 174, 123, 0.85)']}
      locations={[-0.1203, 1.0219]}>
      {props.children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Background;
