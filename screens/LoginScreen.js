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

const LoginScreen = ({route, navigation}) => {
  const accountType = route.params.accountType || 'STUDENT';
  const [state, updateState] = useState({
    name: '',
    password: '',
  });
  return (
    <View style={styles.gradient}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/images/back-arrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
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
            textContentType="emailAddress"
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
            secureTextEntry
            textContentType="password"
            style={styles.input}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('selectedCourses', {accountType})}>
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
    color: '#A2BFBD',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
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
});

export default LoginScreen;
