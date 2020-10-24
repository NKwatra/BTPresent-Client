import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';

const {Navigator, Screen} = createStackNavigator();

const App = (props) => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="home" component={HomeScreen} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
