import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const CoursesScreen = ({navigation, route}) => {
  const [courses, updateCourses] = useState([
    {selected: false, name: 'Advanced Computer Networks', id: '1'},
    {selected: false, name: 'Software Testing', id: '2'},
    {selected: false, name: 'FEDT', id: '3'},
    {selected: false, name: 'Artificial Intelligence', id: '4'},
    {selected: false, name: 'Advanced Java', id: '5'},
    {selected: false, name: 'Data Mining', id: '6'},
  ]);

  const {accountType, address} = route.params;
  console.log(address);

  return (
    <View style={styles.linearGradient}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require('../assets/images/back-arrow-white.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.courseHeader}>Courses</Text>
      </View>
      <FlatList
        data={courses}
        keyExtractor={(course) => course.id}
        numColumns={2}
        style={styles.courseContainer}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                let newCourses = [...courses];
                newCourses[index].selected = !newCourses[index].selected;
                updateCourses(newCourses);
              }}>
              {item.selected ? (
                <LinearGradient
                  colors={['#E9585E', '#5F70B2']}
                  locations={[0.4, 1.0]}
                  style={styles.courseGradient}>
                  <View style={[styles.course, styles.selected]}>
                    <Text style={styles.courseText}>{item.name}</Text>
                  </View>
                </LinearGradient>
              ) : (
                <View style={[styles.course, styles.normal]}>
                  <Text style={styles.courseText}>{item.name}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={styles.tick}
        onPress={() => navigation.navigate('selectedCourses', {accountType})}>
        <View>
          <Image
            source={require('../assets/images/tick-white.png')}
            style={styles.tickImage}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    backgroundColor: '#435C59',
  },
  backArrow: {
    width: 26,
    height: 21,
    marginTop: 8,
    marginRight: Dimensions.get('window').width * 0.2,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  courseHeader: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  tick: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 3,
    position: 'absolute',
    bottom: 12,
    left: '42%',
    backgroundColor: '#1F1F1F',
  },
  tickImage: {
    marginHorizontal: 18,
    marginVertical: 21,
  },
  courseContainer: {
    padding: 20,
  },
  course: {
    backgroundColor: '#EACDA3',
    padding: 32,
    width: 150,
    height: 150,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseGradient: {
    width: 150,
    height: 150,
    borderRadius: 25,
    marginRight: 20,
    marginVertical: 20,
  },
  courseText: {
    color: '#3A3A3A',
  },
  normal: {
    elevation: 10,
  },
  selected: {
    elevation: 0,
    width: 140,
    height: 140,
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default CoursesScreen;
