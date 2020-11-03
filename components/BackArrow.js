import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const BackArrow = ({goBack}) => {
  return (
    <TouchableOpacity onPress={goBack}>
      <Image
        source={require('../assets/images/back-arrow.png')}
        style={styles.backArrow}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backArrow: {
    width: 26,
    height: 21,
    marginLeft: 24,
    marginTop: 40,
  },
});

export default BackArrow;
