import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Background from '../components/Background';
import AccountType from '../components/AccountType';
import {getAccountType, setAccountType} from '../utils/AsyncStorage';
import {isAuthenticated} from '../utils/Auth';
import {PacmanIndicator} from 'react-native-indicators';
import {resetState} from '../utils/Common';

const HomeScreen = ({navigation}) => {
  /*
    To keep track of loading state of current screen
  */
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      /*
        Check if user had previously set account type
      */
      getAccountType().then((accountType) => {
        if (accountType === null) {
          /*
            No account type, so first time app loading, stop loading
            and display home page
          */
          setLoading(false);
        } else {
          /*
            check if user is still authenticated
          */
          const authStatePromise = isAuthenticated();
          authStatePromise
            .then((authState) => {
              /*
              Still authenticated, display the courses of user
            */
              if (authState) {
                const navigationState = {
                  index: 0,
                  routes: [
                    {
                      name: 'selectedCourses',
                      params: {
                        selectedCourses: authState,
                        accountType,
                        inactive: true,
                      },
                    },
                  ],
                };
                resetState(navigation, navigationState);
              } else {
                /*
                Logged out or first time login, redirect to login page
                and reset state
              */
                const navigationState = {
                  index: 0,
                  routes: [
                    {
                      name: 'login',
                      params: {
                        accountType,
                        inactive: true,
                      },
                    },
                  ],
                };

                resetState(navigation, navigationState);
              }
              setLoading(false);
            })
            .catch(() =>
              alert('Please check your internet connection and try again'),
            );
        }
      });
    }, 300);
  }, [navigation]);

  /*
    Function to handle swipe by user for account type selection
  */
  const handleSwipe = (direction) => {
    const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (direction) {
      case SWIPE_LEFT:
        handleLeftSwipe();
        break;
      case SWIPE_RIGHT:
        handleRightSwipe();
        break;
    }
  };

  /*
    Select the account type as teacher and move to next screen
  */
  const handleLeftSwipe = () => {
    setAccountType('TEACHER').then(
      navigation.navigate('splash', {accountType: 'TEACHER'}),
    );
  };
  /*
    Select the account type as student and move to next screen
  */
  const handleRightSwipe = () => {
    setAccountType('STUDENT').then(
      navigation.navigate('splash', {accountType: 'STUDENT'}),
    );
  };

  return (
    <Background>
      {loading ? (
        <PacmanIndicator color="#435C59" size={200} />
      ) : (
        <>
          <Image
            source={require('../assets/images/homeImage.png')}
            style={styles.mainImage}
          />
          <GestureRecognizer
            style={styles.gesture}
            onSwipe={(direction) => handleSwipe(direction)}>
            <AccountType
              type="STUDENT"
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.student}
            />
            <AccountType
              type="TEACHER"
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.teacher}
            />
            <Image
              source={require('../assets/images/right-arrow-double.png')}
              style={[styles.arrow, styles.right]}
            />
            <Image
              source={require('../assets/images/left-arrow-double.png')}
              style={[styles.arrow, styles.left]}
            />
          </GestureRecognizer>
        </>
      )}
    </Background>
  );
};

const styles = StyleSheet.create({
  mainImage: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 72,
  },
  arrow: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.19 || 120,
  },
  student: {
    alignItems: 'flex-end',
    left: -104,
  },
  teacher: {
    alignItems: 'flex-start',
    right: -104,
  },
  right: {
    left: 128,
  },
  left: {
    right: 128,
  },
  gesture: {
    flex: 1,
    position: 'relative',
  },
});

export default HomeScreen;
