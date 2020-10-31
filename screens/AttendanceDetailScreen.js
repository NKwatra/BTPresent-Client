import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Text} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CalendarArrow = (props) => {
  return props.direction === 'left' ? (
    <Image source={require('../assets/images/left-angle-black.png')} />
  ) : (
    <Image source={require('../assets/images/right-angle-black.png')} />
  );
};

const calendarTheme = {
  backgroundColor: '#F3E2CA',
  calendarBackground: '#F3E2CA',
  textSectionTitleColor: '#000000',
  todayTextColor: '#00adf5',
  textDisabledColor: '#7A7585',
  dayTextColor: '#000000',
  monthTextColor: '#000000',
  textDayFontFamily: 'IBMPlexSans-Medium',
  textMonthFontFamily: 'IBMPlexSans-Regular',
  textDayHeaderFontFamily: 'IBMPlexSans-Bold',
  textDayFontWeight: '500',
  textMonthFontWeight: '400',
  textDayHeaderFontWeight: '700',
  textDayFontSize: 14,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 10,
};

const AttendanceDetailScreen = ({navigation, route}) => {
  const tabOptions =
    route.params.accountType === 'STUDENT'
      ? ['Previous Record', 'Give Attendance']
      : ['Previous Record', 'Take Attendance'];

  const [state, updateState] = useState({
    selectedIndex: 0,
    attendance: {
      2020: {
        11: {
          present: [15, 17, 21, 20, 12],
          absent: [10, 13],
        },
        12: {
          present: [1, 20, 31, 12, 15],
          absent: [4, 9],
        },
      },
    },
    markedDates: {},
  });

  const updateMarkedDates = (month, year) => {
    if (month < 10) {
      month = '0' + month;
    }
    let tempDates = {};
    if (
      !state.attendance.hasOwnProperty(year) ||
      !state.attendance[year].hasOwnProperty(month)
    ) {
      return;
    }

    const {present, absent} = state.attendance[year][month];
    for (let date of present) {
      if (date < 10) {
        date = '0' + date;
      }
      const dateString = year + '-' + month + '-' + date;
      tempDates[dateString] = {selected: true, selectedColor: '#87C289'};
    }

    for (let date of absent) {
      const dateString = year + '-' + month + '-' + date;
      tempDates[dateString] = {selected: true, selectedColor: '#ED7479'};
    }

    updateState({...state, markedDates: tempDates});
  };

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
              onPress={() => updateState({...state, selectedIndex: index})}
              key={index}>
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
      {state.selectedIndex === 0 ? (
        <Calendar
          onMonthChange={({month, year}) => updateMarkedDates(month, year)}
          renderArrow={(direction) => <CalendarArrow direction={direction} />}
          enableSwipeMonths={true}
          theme={calendarTheme}
          style={styles.calendarContainer}
          markedDates={state.markedDates}
        />
      ) : null}
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
  calendarContainer: {
    padding: 32,
    backgroundColor: '#F3E2CA',
    borderRadius: 20,
    marginTop: 24,
    marginHorizontal: -15,
  },
});

export default AttendanceDetailScreen;
