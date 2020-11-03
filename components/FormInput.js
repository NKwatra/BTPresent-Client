import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';

export default function FormInput({first, label, value, updateValue, extras}) {
  return (
    <View
      style={[
        styles.margin,
        first ? styles.marginTopLarge : styles.marginTopSmall,
      ]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(newText) => updateValue(newText)}
        style={styles.input}
        {...extras}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  margin: {
    marginHorizontal: 24,
  },
  marginTopLarge: {
    marginTop: 64,
  },
  marginTopSmall: {
    marginTop: 40,
  },
  label: {
    color: '#A2BFBD',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 12,
  },
  input: {
    borderColor: '#A2BFBD',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    color: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
});
