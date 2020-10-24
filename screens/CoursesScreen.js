import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const CoursesScreen = (props) => {
  const [courses, updateCourses] = useState([
    {selected: false, name: 'Advanced Computer Networks', id: '1'},
    {selected: false, name: 'Software Testing', id: '2'},
    {selected: false, name: 'FEDT', id: '3'},
    {selected: false, name: 'Artificial Intelligence', id: '4'},
    {selected: false, name: 'Advanced Java', id: '5'},
    {selected: false, name: 'Data Mining', id: '6'},
  ]);
  return (
    <LinearGradient
      style={styles.linearGradient}
      colors={['rgba(234, 205, 163, 0.1)', 'rgba(214, 174, 123, 0.85)']}
      locations={[-0.1203, 1.0219]}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/back-arrow.png')}
          style={styles.backArrow}
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
              <View style={styles.course}>
                <Text style={item.selected ? styles.light : styles.normal}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={styles.footer}>
        <LinearGradient
          colors={['#EACDA3', '#D6AE7B']}
          locations={[-0.3127, 0.725]}
          style={styles.tick}>
          <Image
            source={require('../assets/images/Tick.png')}
            style={styles.tickImage}
          />
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  backArrow: {
    width: 7,
    height: 12,
    marginTop: 16,
    marginRight: Dimensions.get('window').width * 0.2,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#2F2E41',
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
  },
  courseHeader: {
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 48,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: '#2F2E41',
  },
  tick: {
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 3,
    position: 'absolute',
    top: -30,
    left: '42%',
  },
  tickImage: {
    marginHorizontal: 18,
    marginVertical: 21,
  },
  courseContainer: {
    padding: 20,
    marginBottom: 50,
  },
  course: {
    backgroundColor: '#3F9C74',
    padding: 32,
    width: 150,
    height: 150,
    marginRight: 20,
    marginVertical: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  light: {
    color: 'rgba(58, 58, 58, 0.4)',
  },
  normal: {
    color: '#000000',
  },
});

export default CoursesScreen;
