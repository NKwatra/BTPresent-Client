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

const LoginScreen = (props) => {
  const {accountType} = props.route.params || 'STUDENT';
  const [state, updateState] = useState({
    name: '',
    password: '',
  });
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
        <Text style={styles.welcome}>Welcome Back</Text>
        <View style={[styles.margin, styles.marginTopLarge]}>
          <Text style={styles.label}>
            {accountType === 'STUDENT' ? 'Username' : 'Email'}
          </Text>
          <TextInput
            value={state.name}
            onChangeText={(newText) =>
              updateState({
                ...state,
                name: newText,
              })
            }
            style={styles.input}
          />
        </View>
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
          <View style={[styles.margin, styles.button]}>
            <Text style={styles.SignIn}>Sign in</Text>
            <Image
              source={require('../assets/images/right-arrow.png')}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={[styles.margin, styles.row]}>
            <Text style={styles.label}>Don't have an account?</Text>
            <Text style={[styles.label, styles.register]}>Register</Text>
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
  arrow: {
    marginTop: 12,
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
  margin: {
    marginHorizontal: 24,
  },
  marginTopLarge: {
    marginTop: 64,
  },
  marginTopSmall: {
    marginTop: 40,
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
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2F2E41',
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 82,
  },
  SignIn: {
    color: '#FFFFFF',
    fontSize: 24,
    fontFamily: 'Montserrat-SemiBold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  register: {
    marginLeft: 6,
    color: '#2F2E41',
  },
});

export default LoginScreen;
