import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AddButton from './AddButton';
import AddField from './AddField';

const AttendanceAdd = ({cancel, save}) => {
  const [state, updateState] = useState({
    name: '',
    roll: '',
  });
  return (
    <LinearGradient
      colors={['#E9585E', '#5F70B2']}
      locations={[0.4, 1.0]}
      style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.head}>Add Attendance</Text>
        <AddField
          label="Name of Student"
          value={state.name}
          onChange={(newText) => updateState({...state, name: newText})}
        />
        <AddField
          label="Enrollment Number"
          value={state.roll}
          onChange={(newText) => updateState({...state, roll: newText})}
        />
        <View style={styles.buttonsContainer}>
          <AddButton label="Cancel" clickHandler={cancel} />
          <AddButton
            label="Save"
            clickHandler={() => save(state.name, state.roll)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 32,
  },
  gradient: {
    width: Dimensions.get('window').width - 36,
    height: 420,
    borderRadius: 20,
    position: 'absolute',
    left: 18,
    bottom: '15%',
    zIndex: 1000,
  },
  container: {
    width: Dimensions.get('window').width - 46,
    margin: 5,
    height: 410,
    borderRadius: 20,
    backgroundColor: '#F3E2CA',
  },
  head: {
    fontSize: 28,
    textAlign: 'center',
    marginTop: 32,
    color: '#435C59',
    fontFamily: 'IBMPlexSans-Bold',
  },
});

export default AttendanceAdd;
