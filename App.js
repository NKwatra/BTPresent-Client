import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const {Navigator, Screen} = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="login">
        <Screen name="home" component={HomeScreen} />
        <Screen name="login" component={LoginScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
