import React, {useState, useEffect} from 'react';
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
import {PacmanIndicator} from 'react-native-indicators';
import {getUniversityCourses, signUp} from '../utils/Auth';
import {setUserId, setUserCourses} from '../utils/AsyncStorage';
import BackArrow from '../components/BackArrow';

const CoursesScreen = ({navigation, route}) => {
  const [courses, updateCourses] = useState([]);

  const [loading, updateLoading] = useState(true);
  const {university} = route.params;
  useEffect(() => {
    getUniversityCourses(university)
      .then((Courses) => {
        updateCourses(Courses);
        updateLoading(false);
      })
      .catch(() =>
        alert('Please check your internet connection and try again'),
      );
  }, [university]);

  return (
    <View style={styles.linearGradient}>
      {loading ? (
        <PacmanIndicator color="#EACDA3" size={200} />
      ) : (
        <>
          <View style={styles.header}>
            <BackArrow
              goBack={navigation.goBack}
              propsStyles={styles.backArrow}
            />
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
            onPress={() => {
              const {
                Fname,
                Lname,
                email,
                password,
                altemail,
                enrollmentNo,
                address,
                accountType,
              } = route.params;

              const selectedCourses = courses.filter(
                (course) => course.selected,
              );

              signUp({
                fName: Fname,
                lName: Lname,
                password,
                email,
                university,
                altEmail: altemail,
                enrollNo: enrollmentNo,
                macAddress: address,
                accountType,
                courses: selectedCourses.map((course) => course.id),
              }).then((response) => {
                if (response.hasOwnProperty('message')) {
                  alert(response.message);
                } else {
                  setUserId(response.token);
                  setUserCourses(selectedCourses);
                  navigation.navigate('selectedCourses', {
                    accountType,
                    selectedCourses,
                  });
                }
              });
            }}>
            <View>
              <Image
                source={require('../assets/images/tick-white.png')}
                style={styles.tickImage}
              />
            </View>
          </TouchableOpacity>
        </>
      )}
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
    marginLeft: 4,
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
