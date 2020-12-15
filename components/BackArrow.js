import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const BackArrow = ({goBack, active}) => {
  return (
    <TouchableOpacity onPress={() => (active ? goBack() : null)}>
      <Image
        source={require('../assets/images/back-arrow.png')}
        style={active ? styles.backArrow : [styles.backArrow, styles.inactive]}
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
  inactive: {
    opacity: 0.2,
  },
});

export default BackArrow;
