import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

const SelectedCoursesScreen = ({navigation, route}) => {
  const [courses, updateCourses] = useState([
    {name: 'Artificial Intelligence', id: '1'},
    {name: 'Advance Computer Network', id: '2'},
    {name: 'Software Testing', id: '3'},
    {name: 'Frontend Development', id: '4'},
    {name: 'Testing Lab', id: '5'},
  ]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <TouchableOpacity onPress={navigation.goBack}>
            <Image
              source={require('../assets/images/back-arrow-white.png')}
              style={styles.backArrow}
            />
          </TouchableOpacity>
          <Text style={styles.white}>Course List</Text>
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Image
              source={require('../assets/images/logout.png')}
              style={styles.logout}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headerMargin}>
          <Text style={[styles.light, styles.center]}>Total Courses</Text>
          <Text style={[styles.white, styles.center]}>{courses.length}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.course}>
              <Text style={styles.courseName}>{item.name}</Text>
              <Image
                source={require('../assets/images/right-angle.png')}
                style={styles.rightArrow}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(234, 205, 163, 0.62)',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: '#435C59',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
  },
  backArrow: {
    width: 26,
    height: 21,
    marginTop: 4,
  },
  white: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: 'white',
  },
  logout: {
    width: 21,
    height: 21,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    textAlign: 'center',
  },
  light: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    color: '#A2BFBD',
  },
  headerMargin: {
    marginTop: 24,
  },
  footer: {
    backgroundColor: '#435C59',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    marginTop: 14,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 56,
    paddingBottom: 16,
  },
  course: {
    backgroundColor: 'rgba(162, 191, 189, 0.2)',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 12,
  },
  rightArrow: {
    width: 7,
    height: 12,
    marginTop: 4,
  },
  courseName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  },
});

export default SelectedCoursesScreen;
