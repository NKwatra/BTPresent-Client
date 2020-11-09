import React, {useEffect, useState} from 'react';
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
import {PacmanIndicator} from 'react-native-indicators';
import {getRegisteredUniversityNames} from '../utils/Auth';
import SearchableDropdown from '../components/SearchableDropdown';
import BluetoothModule from '../utils/BluetoothModule';

const SignupScreen = ({navigation, route}) => {
  const [state, updateState] = useState({
    Fname: '',
    Lname: '',
    email: '',
    password: '',
    university: '',
    altemail: '',
    enrollmentNo: '',
    universityOptions: [],
    loading: true,
  });

  useEffect(() => {
    getRegisteredUniversityNames().then((universities) =>
      updateState((oldState) => ({
        ...oldState,
        universityOptions: universities,
        loading: false,
      })),
    );
  }, []);

  const accountType = route.params.accountType || 'STUDENT';

  const fieldsFilled = () => {
    if (
      !(
        state.Fname.length > 0 &&
        state.Lname.length > 0 &&
        state.university.length > 0 &&
        state.email.length > 0 &&
        state.password.length > 0
      )
    ) {
      return false;
    }

    if (
      accountType === 'STUDENT' &&
      (state.altemail.length === 0 || state.enrollmentNo.length === 0)
    ) {
      return false;
    }

    return true;
  };

  return (
    <View style={styles.gradient}>
      {state.loading ? (
        <PacmanIndicator color="#EACDA3" size={200} />
      ) : (
        <ScrollView>
          <BackArrow goBack={navigation.goBack} />
          <Text style={styles.welcome}>Create Account</Text>
          <FormInput
            label="First Name"
            first
            value={state.Fname}
            updateValue={(newText) =>
              updateState({
                ...state,
                Fname: newText,
              })
            }
          />
          <FormInput
            label="Last Name"
            value={state.Lname}
            updateValue={(newText) =>
              updateState({
                ...state,
                Lname: newText,
              })
            }
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
          <FormInput
            value={state.email}
            updateValue={(newText) =>
              updateState({
                ...state,
                email: newText,
              })
            }
            label="Email"
            extras={{textContentType: 'emailAddress'}}
          />
          {accountType === 'STUDENT' ? (
            <>
              <FormInput
                value={state.altemail}
                updateValue={(newText) =>
                  updateState({
                    ...state,
                    altemail: newText,
                  })
                }
                label="Alternative Email"
                extras={{textContentType: 'emailAddress'}}
              />

              <FormInput
                value={state.enrollmentNo}
                updateValue={(newText) =>
                  updateState({
                    ...state,
                    enrollmentNo: newText,
                  })
                }
                label="Enrollment Number"
              />
            </>
          ) : null}

          <FormInput
            label="Password"
            value={state.password}
            updateValue={(newText) =>
              updateState({
                ...state,
                password: newText,
              })
            }
            extras={{textContentType: 'password', secureTextEntry: true}}
          />

          <TouchableOpacity
            onPress={() => {
              // if (fieldsFilled()) {
              //   navigation.navigate('courses', {...state, accountType});
              // } else {
              //   alert('Please fill all fields');
              // }
              BluetoothModule.getMacAddress().then((address) =>
                navigation.navigate('courses', {
                  ...state,
                  accountType,
                  address,
                }),
              );
            }}>
            <View style={styles.next}>
              <Image
                source={require('../assets/images/right-arrow.png')}
                style={styles.arrow}
              />
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
  welcome: {
    fontSize: 36,
    color: '#A2BFBD',
    marginHorizontal: 24,
    marginTop: 36,
    fontFamily: 'Montserrat-Bold',
  },
  next: {
    borderRadius: 50,
    width: 72,
    height: 72,
    backgroundColor: '#EACDA3',
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 56,
    marginBottom: 36,
    position: 'relative',
  },
  input: {
    borderColor: '#A2BFBD',
    borderWidth: 2,
    borderStyle: 'solid',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 15,
    color: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: 'transparent',
  },
  arrow: {
    position: 'absolute',
    top: 28,
    left: 28,
  },
  margin: {
    marginHorizontal: 24,
  },
  marginTopSmall: {
    marginTop: 40,
  },
  label: {
    color: '#A2BFBD',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 12,
  },
  dropdown: {
    width: '100%',
    zIndex: 100,
  },
  placeHolder: {
    color: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
});

export default SignupScreen;
