import Config from 'react-native-config';
import {getUserId, getUserCourses} from './AsyncStorage';

// TODO: extract cookie expiration date to check if user is still
// authenticated, if authenticated return user courses
// else return false
export const isAuthenticated = () => {
  const url = Config.API_URL + '/auth/check';
  return getUserId().then((userId) => {
    if (userId == null) {
      return false;
    }

    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }).then((response) => {
      if (response.ok) {
        return getUserCourses().then((courses) => courses);
      } else {
        return false;
      }
    });
  });
};

// TODO: extract device MAC addess here and sent it with other
// cedentials
export const login = ({name, password, accountType}) => {
  return new Promise((resolve) => {
    const loginCredentials = {
      universityId: 'ab235sde1f',
      userId: 'e3h2cnsa96r42w',
      message: '',
    };
    setTimeout(() => resolve(loginCredentials), 1000);
  });
};

// TODO : extract the name and id of registered univerisities
export const getRegisteredUniversityNames = () => {
  const url = Config.API_URL + '/info/universities';
  return fetch(url)
    .then((response) => response.json())
    .then((universities) => universities);
};

// Function to extract university courses by university
// used during sign up of user
export const getUniversityCourses = (universityId) => {
  const url = Config.API_URL + '/info/courses/' + universityId;
  return fetch(url)
    .then((response) => response.json())
    .then((courses) => courses.map((course) => ({...course, selected: false})));
};

// Function to Sign up a new user
export const signUp = (userData) => {
  const url = Config.API_URL + '/auth/signup';
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => response.json());
};
