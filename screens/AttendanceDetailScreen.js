import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import BluetoothModule from '../utils/BluetoothModule';
import Student from '../components/Student';
import AttendanceAdd from '../components/AttendanceAdd';

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
    addOverlay: false,
  });

  const [students, updateStudents] = useState([
    {
      name: 'Nishkarsh Kwatra',
      roll: '20216403217',
      id: 'abgd3o26',
    },
    {
      name: 'Mansi Sharma',
      roll: '20116403217',
      id: 'abgd3o27',
    },
    {
      name: 'Omisha Sapra',
      roll: '70116403217',
      id: 'abgd3o28',
    },
    {
      name: 'Sarthak Sadh',
      roll: '41516403217',
      id: 'abgd3o29',
    },
    {
      name: 'Shradha Dua',
      roll: '40216403217',
      id: 'abgd3o22',
    },
  ]);

  const removeListItem = (roll) => {
    const newStudents = state.students.filter(
      (student) => student.roll !== roll,
    );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    updateState({editing: state.editing, students: newStudents});
  };

  const closeAddOverlay = () => updateState({...state, addOverlay: false});

  const addStudent = (name, roll) => {
    updateStudents([...students, {name, roll}]);
    closeAddOverlay();
  };

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
              onPress={() => {
                updateState({...state, selectedIndex: index});
                if (index === tabOptions.length - 1) {
                  let {accountType} = route.params;
                  if (accountType === 'STUDENT') {
                    BluetoothModule.askBluetoothPermission();
                  } else {
                    BluetoothModule.startDeviceScan()
                      .then((devices) => {
                        console.log(devices);
                      })
                      .catch((msg) => console.log(msg));
                  }
                }
              }}
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
          onDayPress={(date) => {
            if (route.params.accountType === 'TEACHER') {
              navigation.navigate('attendanceRecord', {
                accountType: route.params.accountType,
                date,
                name: route.params.name,
              });
            }
          }}
        />
      ) : (
        <>
          <FlatList
            data={students}
            keyExtractor={(item) => item.roll}
            renderItem={({item}) => (
              <Student {...item} removeItem={removeListItem} />
            )}
            style={styles.studentList}
          />
          <View style={[styles.fabContainer, styles.row]}>
            <TouchableOpacity
              style={[styles.fab, styles.marginRight]}
              onPress={() => updateState({...state, addOverlay: true})}>
              <Image
                source={require('../assets/images/plus.png')}
                style={styles.plus}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.fab}
              onPress={() => updateState({...state, editing: false})}>
              <Image
                source={require('../assets/images/save.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          {state.addOverlay ? (
            <AttendanceAdd cancel={closeAddOverlay} save={addStudent} />
          ) : null}
        </>
      )}
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
  studentList: {
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: -24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: '2.5%',
    right: '6.67%',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1F1F1F',
    zIndex: 1000,
  },
  icon: {
    width: 25,
    height: 25,
    marginTop: 16,
    marginLeft: 16,
  },
  plus: {
    width: 21,
    height: 21,
    marginLeft: 20,
    marginTop: 20,
  },
  marginRight: {
    marginRight: 8,
  },
});

export default AttendanceDetailScreen;
