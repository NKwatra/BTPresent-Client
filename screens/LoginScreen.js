import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BackArrow from '../components/BackArrow';
import FormInput from '../components/FormInput';
import {setUserCredentials} from '../utils/AsyncStorage';
import {login} from '../utils/Auth';

const LoginScreen = ({route, navigation}) => {
  const accountType = route.params.accountType || 'STUDENT';
  const [state, updateState] = useState({
    name: '',
    password: '',
  });

  const loginUser = () => {
    login({...state, accountType}).then(({userId, universityId, message}) => {
      if (message.length > 0) {
        alert('invalid credentials');
      } else {
        navigation.navigate('selectedCourses', {userId});
        setUserCredentials({userId, universityId});
      }
    });
  };

  return (
    <View style={styles.gradient}>
      <ScrollView>
        <BackArrow goBack={navigation.goBack} />
        <Text style={styles.welcome}>Welcome Back</Text>
        <FormInput
          first
          value={state.name}
          updateValue={(newValue) => updateState({...state, name: newValue})}
          label={accountType === 'STUDENT' ? 'Username' : 'Email'}
          type={accountType === 'STUDENT' ? '' : 'email'}
          extras={{textContentType: 'emailAddress'}}
        />
        <FormInput
          value={state.password}
          updateValue={(newValue) =>
            updateState({...state, password: newValue})
          }
          label="Password"
          type="password"
          extras={{textContentType: 'password', secureTextEntry: true}}
        />
        <TouchableOpacity onPress={loginUser}>
          <View style={[styles.margin, styles.button]}>
            <Text style={styles.SignIn}>Sign in</Text>
            <Image
              source={require('../assets/images/right-arrow.png')}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('signup', {accountType})}>
          <View style={[styles.margin, styles.row]}>
            <Text style={styles.label}>Don't have an account?</Text>
            <Text style={[styles.label, styles.register]}>Register</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#435C59',
  },
  arrow: {
    marginTop: 8,
  },
  welcome: {
    fontSize: 36,
    color: '#A2BFBD',
    marginHorizontal: 24,
    marginTop: 36,
    fontFamily: 'Montserrat-Bold',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#EACDA3',
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 82,
  },
  SignIn: {
    color: '#435C59',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  register: {
    marginLeft: 6,
    color: '#EACDA3',
  },
  margin: {
    marginHorizontal: 24,
  },
  label: {
    color: '#A2BFBD',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 12,
  },
});

export default LoginScreen;
