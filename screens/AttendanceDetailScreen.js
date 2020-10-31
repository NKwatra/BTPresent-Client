import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';

const AttendanceDetailScreen = ({navigation, route}) => {
  const tabOptions =
    route.params.accountType === 'STUDENT'
      ? ['Previous Record', 'Give Attendance']
      : ['Previous Record', 'Take Attendance'];

  const [state, updateState] = useState({
    selectedIndex: 0,
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require('../assets/images/back-arrow-white.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Image
            source={require('../assets/images/logout.png')}
            style={styles.logout}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.courseName}>{route.params.name}</Text>
      </View>

      <View style={styles.tabsContainer}>
        {tabOptions.map((option, index) => {
          return (
            <TouchableOpacity
              style={[
                styles.tab,
                index === state.selectedIndex ? styles.selected : {},
                index === 0 ? styles.firstTab : {},
                index === tabOptions.length - 1 ? styles.lastTab : {},
              ]}
              onPress={() => updateState({...state, selectedIndex: index})}>
              <Text
                style={[
                  styles.tabHeader,
                  index === state.selectedIndex ? styles.selectedText : {},
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#435C59',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backArrow: {
    width: 26,
    height: 21,
    marginTop: 4,
  },
  logout: {
    width: 21,
    height: 21,
    marginTop: 4,
  },
  courseName: {
    marginTop: 8,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  tabsContainer: {
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 58,
    marginHorizontal: -15,
  },
  tab: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: '#56706D',
  },
  selected: {
    backgroundColor: '#F3E2CA',
  },
  firstTab: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  lastTab: {
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
  },
  tabHeader: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Medium',
  },
  selectedText: {
    color: '#000000',
  },
});

export default AttendanceDetailScreen;
