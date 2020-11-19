import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  LayoutAnimation,
} from 'react-native';
import Student from '../components/Student';

const monthsMap = {
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const AttendanceRecordScreen = ({navigation, route}) => {
  const [state, updateState] = useState({
    students: [
      {
        name: 'Mansi Sharma',
        roll: '20116403217',
      },
      {
        name: 'Nishkarsh Kwatra',
        roll: '20216403217',
      },
      {
        name: 'Shradha Dua',
        roll: '40216403217',
      },
      {
        name: 'Omisha Sapra',
        roll: '70116403217',
      },
      {
        name: 'Sarthak Sadh',
        roll: '41516403217',
      },
      {
        name: 'Rajat Cambo',
        roll: '65716403217',
      },
    ],
    editing: false,
  });

  const removeListItem = (roll) => {
    const newStudents = state.students.filter(
      (student) => student.roll !== roll,
    );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    updateState({editing: state.editing, students: newStudents});
  };

  const formatDate = ({day, month, year}) => {
    if (day < 10) {
      day = '0' + day;
    }
    month = monthsMap[month];
    return day + ' ' + month + ' ' + year;
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
        <Text style={styles.courseName}>{formatDate(route.params.date)}</Text>
        <Text style={styles.attendance}>Total Attendance</Text>
        <Text style={styles.attendanceCount}>{state.students.length}</Text>
      </View>
      {!state.editing ? (
        <View style={styles.fabContainer}>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => updateState({...state, editing: true})}>
            <Image
              source={require('../assets/images/edit.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.fabContainer, styles.row]}>
          <TouchableOpacity style={[styles.fab, styles.marginRight]}>
            <Image
              source={require('../assets/images/plus.png')}
              style={styles.plus}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.fab}
            onPress={() => updateState({...state, editing: false})}>
            <Image
              source={require('../assets/images/tick-white.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={state.students}
        keyExtractor={(item) => item.roll}
        renderItem={({item}) => (
          <Student {...item} removeItem={removeListItem} />
        )}
        style={styles.studentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#435C59',
    paddingHorizontal: 24,
    paddingVertical: 32,
    paddingBottom: 0,
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
  attendance: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#A2BFBD',
    marginTop: 16,
  },
  attendanceCount: {
    fontSize: 20,
    fontFamily: 'Montserrat-Medium',
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 8,
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
  fabContainer: {
    position: 'absolute',
    bottom: '2.5%',
    right: '6.67%',
  },
  marginRight: {
    marginRight: 8,
  },
  studentList: {
    paddingHorizontal: 10,
    marginTop: 40,
    marginHorizontal: -24,
  },
});

export default AttendanceRecordScreen;
