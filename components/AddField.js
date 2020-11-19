import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';

const AddField = ({label, onChange, value}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        style={styles.input}
        onChangeText={(newText) => onChange(newText)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: '#435C59',
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  input: {
    borderBottomColor: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#435C59',
    textAlign: 'center',
    borderBottomWidth: 2,
    marginHorizontal: 32,
  },
  container: {
    marginTop: 32,
  },
});

export default AddField;
