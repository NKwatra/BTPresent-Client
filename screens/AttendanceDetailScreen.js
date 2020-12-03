import React, {useState, useEffect} from 'react';
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
import {logout} from '../utils/Auth';
import {
  extractStudentNames,
  getAttendanceRecord,
  sendAttendanceToBackend,
} from '../utils/attendance';
import {PacmanIndicator} from 'react-native-indicators';

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

const getMarkedDates = (month, year, attendance) => {
  if (month < 10) {
    month = '0' + month;
  }
  let tempDates = {};
  if (
    !attendance.hasOwnProperty(year) ||
    !attendance[year].hasOwnProperty(month)
  ) {
    return {};
  }

  const {present, absent} = attendance[year][month];
  for (let date of present) {
    if (date < 10) {
      date = '0' + date;
    }
    const dateString = year + '-' + month + '-' + date;
    tempDates[dateString] = {selected: true, selectedColor: '#87C289'};
  }

  for (let date of absent) {
    if (date < 10) {
      date = '0' + date;
    }
    const dateString = year + '-' + month + '-' + date;
    tempDates[dateString] = {selected: true, selectedColor: '#ED7479'};
  }

  return tempDates;
};

const AttendanceDetailScreen = ({navigation, route}) => {
  const tabOptions =
    route.params.accountType === 'STUDENT'
      ? ['Previous Record', 'Give Attendance']
      : ['Previous Record', 'Take Attendance'];

  let univID;

  const [state, updateState] = useState({
    selectedIndex: 0,
    attendance: {},
    markedDates: {},
    addOverlay: false,
  });

  const [students, updateStudents] = useState([]);

  const [loading, updateLoading] = useState(true);

  useEffect(() => {
    getAttendanceRecord(route.params.id, route.params.accountType).then(
      (record) => {
        const today = new Date();
        const markedDates = getMarkedDates(
          today.getMonth() + 1,
          today.getFullYear(),
          record,
        );
        updateState({...state, attendance: record, markedDates});
        updateLoading(false);
      },
    );
  }, [route.params.id, route.params.accountType, getMarkedDates]);

  const removeListItem = (roll) => {
    const newStudents = students.filter((student) => student.roll !== roll);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    updateStudents(newStudents);
  };

  const saveAttendance = () => {
    if (univID === undefined) {
      alert('Please perform a search first');
    }
    sendAttendanceToBackend(students, univID, route.params.id).then(
      ({saved, error}) => {
        if (error) {
          alert('Session expired, please login again');
          logout(navigation);
          return;
        }
        if (saved) {
          updateStudents([]);
          alert('Attendance Recorded');
        } else {
          alert(
            'There was some error in attendance recording, Please try again later',
          );
        }
      },
    );
  };

  const closeAddOverlay = () => updateState({...state, addOverlay: false});

  const addStudent = (name, roll) => {
    updateStudents([...students, {name, roll}]);
    closeAddOverlay();
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <PacmanIndicator color="#EACDA3" size={200} />
      ) : (
        <>
          <View style={styles.row}>
            <TouchableOpacity>
              <Image
                source={require('../assets/images/back-arrow-white.png')}
                style={styles.backArrow}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout(navigation)}>
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
                          .then((devices) => extractStudentNames(devices))
                          .then(({universityID, studentPresent, error}) => {
                            if (error === undefined) {
                              updateStudents(studentPresent);
                              univID = universityID;
                            } else {
                              alert('Session expired, please login again');
                              navigation.navigate('login');
                            }
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
              onMonthChange={({month, year}) => {
                const markedDates = getMarkedDates(
                  month,
                  year,
                  state.attendance,
                );
                updateState({...state, markedDates});
              }}
              renderArrow={(direction) => (
                <CalendarArrow direction={direction} />
              )}
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
              {route.params.accountType === 'TEACHER' ? (
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
                      onPress={() => saveAttendance()}>
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
              ) : null}
            </>
          )}
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
