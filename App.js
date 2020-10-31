import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import CoursesScreen from './screens/CoursesScreen';
import SplashScreen from './screens/SplashScreen';
import SelectedCoursesScreen from './screens/SelectedCoursesScreen';
import AttendanceDetailScreen from './screens/AttendanceDetailScreen';

const {Navigator, Screen} = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="home">
        <Screen name="home" component={HomeScreen} />
        <Screen name="login" component={LoginScreen} />
        <Screen name="signup" component={SignupScreen} />
        <Screen name="courses" component={CoursesScreen} />
        <Screen name="splash" component={SplashScreen} />
        <Screen name="selectedCourses" component={SelectedCoursesScreen} />
        <Screen name="attendanceDetail" component={AttendanceDetailScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
