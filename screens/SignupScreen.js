import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const SignupScreen = (props) => {
  const [state, updateState] = useState({
    Fname: '',
    Lname: '',
    email: '',
    password: '',
    university: '',
    altemail: '',
    enrollmentNo: '',
  });

  const accountType = props.route.params || 'STUDENT';

  return (
    <LinearGradient
      useAngle
      angle={198.69}
      angleCenter={{x: 0.5, y: 0.5}}
      colors={['#2F2E41', 'rgba(214, 174, 123, 0)']}
      locations={[0.4428, 1.4643]}
      style={styles.gradient}>
      <ScrollView>
        <Image
          source={require('../assets/images/back-arrow.png')}
          style={styles.backArrow}
        />
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
          />
        </View>
        <TouchableOpacity>
          <View style={styles.next}>
            <Image
              source={require('../assets/images/right-arrow.png')}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  backArrow: {
    width: 7,
    height: 12,
    marginLeft: 24,
    marginTop: 40,
  },
  welcome: {
    fontSize: 36,
    color: '#FFFFFF',
    marginHorizontal: 24,
    marginTop: 36,
    fontFamily: 'Montserrat-Bold',
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    marginLeft: 12,
  },
  input: {
    borderColor: 'rgba(255,255,255,0.52)',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
    backgroundColor: '#2F2E41',
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
