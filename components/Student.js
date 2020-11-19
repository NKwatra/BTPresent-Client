import React, {useRef} from 'react';
import {Animated, View, StyleSheet, Text, Image} from 'react-native';
import {State, PanGestureHandler} from 'react-native-gesture-handler';

const threshold = 120;

const Student = ({name, roll, removeItem}) => {
  const xPos = useRef(new Animated.Value(0)).current;

  return (
    <PanGestureHandler
      activeOffsetX={40}
      onGestureEvent={Animated.event(
        [
          {
            nativeEvent: {
              translationX: xPos,
            },
          },
        ],
        {
          useNativeDriver: true,
          listener: (evt) => {
            const translationX = evt.nativeEvent.translationX;
            if (translationX >= threshold) {
              removeItem(roll);
            }
          },
        },
      )}
      onHandlerStateChange={(evt) => {
        const state = evt.nativeEvent.state;
        const translation = evt.nativeEvent.translationX;
        if (
          (state === State.END || state === State.CANCELLED) &&
          translation < threshold
        ) {
          Animated.spring(xPos, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      }}>
      <View style={styles.studentContainer}>
        <View style={[styles.studentElement, styles.back]}>
          <Image
            source={require('../assets/images/delete.png')}
            style={styles.delete}
          />
        </View>
        <Animated.View
          style={[
            styles.studentElement,
            styles.front,
            {transform: [{translateX: xPos}]},
          ]}>
          <Text style={styles.studentName}>{name}</Text>
          <Text style={styles.studentRoll}>{roll}</Text>
        </Animated.View>
      </View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  studentElement: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  studentContainer: {
    position: 'relative',
    width: '100%',
    height: 70,
    marginVertical: 6,
  },
  back: {
    backgroundColor: 'red',
  },
  front: {
    backgroundColor: '#56706D',
    zIndex: 2,
  },
  studentName: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-SemiBold',
  },
  studentRoll: {
    color: '#FFFFFF',
    marginTop: 6,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  delete: {
    width: 16,
    height: 20,
    marginLeft: 8,
    marginTop: 18,
  },
});

export default Student;
