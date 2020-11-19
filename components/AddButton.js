import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const AddButton = ({label, clickHandler}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={clickHandler}>
      <Text style={styles.labelText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 32,
    paddingVertical: 8,
    backgroundColor: '#435C59',
    borderRadius: 20,
  },
  labelText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
});

export default AddButton;
