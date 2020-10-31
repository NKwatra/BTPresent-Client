import React, {useState} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const SignupScreen = ({navigation, route}) => {
  const [state, updateState] = useState({
    Fname: '',
    Lname: '',
    email: '',
    password: '',
    university: '',
    altemail: '',
    enrollmentNo: '',
  });

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
      <ScrollView>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image
            source={require('../assets/images/back-arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.welcome}>Create Account</Text>
        <View style={[styles.margin, styles.marginTopLarge]}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            value={state.Fname}
            onChangeText={(newText) =>
              updateState({
                ...state,
                Fname: newText,
              })
            }
            style={styles.input}
          />
        </View>
        <View style={[styles.margin, styles.marginTopSmall]}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            value={state.Lname}
            onChangeText={(newText) =>
              updateState({
                ...state,
                Lname: newText,
              })
            }
            style={styles.input}
          />
        </View>
        <View style={[styles.margin, styles.marginTopSmall]}>
          <Text style={styles.label}>University</Text>
          <TextInput
            value={state.univeristy}
            onChangeText={(newText) =>
              updateState({
                ...state,
                university: newText,
              })
            }
            style={styles.input}
          />
        </View>
        <View style={[styles.margin, styles.marginTopSmall]}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={state.email}
            onChangeText={(newText) =>
              updateState({
                ...state,
                email: newText,
              })
            }
            style={styles.input}
            textContentType="emailAddress"
          />
        </View>
        {accountType === 'STUDENT' ? (
          <>
            <View style={[styles.margin, styles.marginTopSmall]}>
              <Text style={styles.label}>Alternate Email</Text>
              <TextInput
                value={state.altemail}
                onChangeText={(newText) =>
                  updateState({
                    ...state,
                    altemail: newText,
                  })
                }
                style={styles.input}
                textContentType="emailAddress"
              />
            </View>
            <View style={[styles.margin, styles.marginTopSmall]}>
              <Text style={styles.label}>Enrollment Number</Text>
              <TextInput
                value={state.enrollmentNo}
                onChangeText={(newText) =>
                  updateState({
                    ...state,
                    enrollmentNo: newText,
                  })
                }
                style={styles.input}
              />
            </View>
          </>
        ) : null}
        <View style={[styles.margin, styles.marginTopSmall]}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={state.password}
            onChangeText={(newText) =>
              updateState({
                ...state,
                password: newText,
              })
            }
            style={styles.input}
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            // if (fieldsFilled()) {
            //   navigation.navigate('courses', {...state, accountType});
            // } else {
            //   alert('Please fill all fields');
            // }
            navigation.navigate('courses', {...state, accountType});
          }}>
          <View style={styles.next}>
            <Image
              source={require('../assets/images/right-arrow.png')}
              style={styles.arrow}
            />
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
  backArrow: {
    width: 26,
    height: 21,
    marginLeft: 24,
    marginTop: 40,
  },
  welcome: {
    fontSize: 36,
    color: '#A2BFBD',
    marginHorizontal: 24,
    marginTop: 36,
    fontFamily: 'Montserrat-Bold',
  },
  label: {
    color: '#A2BFBD',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 12,
  },
  input: {
    borderColor: '#A2BFBD',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
    color: '#A2BFBD',
  },
  margin: {
    marginHorizontal: 24,
  },
  marginTopLarge: {
    marginTop: 64,
  },
  marginTopSmall: {
    marginTop: 40,
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
  arrow: {
    position: 'absolute',
    top: 28,
    left: 28,
  },
});

export default SignupScreen;
