import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const BackArrow = ({goBack, inactive = false, propsStyles}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (!inactive) {
          goBack();
        }
      }}>
      <Image
        source={require('../assets/images/back-arrow.png')}
        style={
          !inactive
            ? [styles.backArrow, {...propsStyles}]
            : [styles.backArrow, styles.inactive, {...propsStyles}]
        }
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
