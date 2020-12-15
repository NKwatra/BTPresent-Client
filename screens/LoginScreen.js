import React, {useState, useEffect} from 'react';
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
import {getRegisteredUniversityNames, login} from '../utils/Auth';
import SearchableDropdown from '../components/SearchableDropdown';
import {PacmanIndicator} from 'react-native-indicators';
import BluetoothModule from '../utils/BluetoothModule';

const LoginScreen = ({route, navigation}) => {
  const accountType = route.params.accountType || 'STUDENT';
  const [state, updateState] = useState({
    name: '',
    password: '',
    university: '',
    universityOptions: [],
    loading: true,
  });

  useEffect(() => {
    /*
      get the names of all registred universities for dropdown
    */
    getRegisteredUniversityNames()
      .then((universities) =>
        updateState((oldState) => ({
          ...oldState,
          universityOptions: universities,
          loading: false,
        })),
      )
      .catch(() =>
        alert('Please check your internet connection and try again'),
      );
  }, []);

  /*
    Function to check if user has filled all fields
  */
  const fieldsFilled = () => {
    return state.name && state.password && state.university;
  };

  /*
    Function to login user into the app
  */
  const loginUser = () => {
    if (!fieldsFilled()) {
      alert('Please fill all fields');
    } else {
      /*
        extract device MAC address and send it to server
        along with other credentials
      */
      BluetoothModule.getMacAddress()
        .then((address) => {
          console.log(address);
          /*
          send to backend to validate credentials
        */
          login({...state, address}).then((result) => {
            console.log(result);
            /*
            If correct credentials, move to selected courses page
            sending in data received from server
          */
            if (result.navigate) {
              navigation.navigate('selectedCourses', {
                accountType,
                selectedCourses: result.selectedCourses,
              });
            } else {
              /*
              alert error message sent by server
            */
              alert(result.message);
            }
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <View style={styles.gradient}>
      {state.loading ? (
        <PacmanIndicator color="#EACDA3" size={200} />
      ) : (
        <ScrollView>
          <BackArrow
            goBack={navigation.goBack}
            active={route.params.backButton}
          />
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

          <View style={[styles.margin, styles.marginTopSmall]}>
            <Text style={styles.label}>University</Text>
            <SearchableDropdown
              items={state.universityOptions}
              updateSelectedItem={(id) =>
                updateState({
                  ...state,
                  university: id,
                })
              }
            />
          </View>
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
      )}
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
  marginTopSmall: {
    marginTop: 40,
  },
});

export default LoginScreen;
