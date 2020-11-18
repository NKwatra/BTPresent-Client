import Config from 'react-native-config';
import {
  getUserId,
  getUserCourses,
  setUserId,
  setUserCourses,
} from './AsyncStorage';

/* Function to check if user is still authenticated */
export const isAuthenticated = () => {
  const url = Config.API_URL + '/auth/check';

  /* Extract API Token from local storage */
  return getUserId().then((userId) => {
    if (userId == null) {
      /* No API token, so first time using app or logout by choice */
      return false;
    }

    /* make a call to backend to check if current token is still valid */
    return fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    }).then((response) => {
      if (response.ok) {
        /* Extract list of courses enrolled by user and pass them */
        return getUserCourses().then((courses) => courses);
      } else {
        /* Token invalid, so user needs to login again */
        return false;
      }
    });
  });
};

/*
  Function to login a user into the app
*/
export const login = ({name, password, university, address}) => {
  const url = Config.API_URL + '/auth/login';
  /*
    Format username so that API can understand and extract all useful
    data from it.
  */
  let username = name + '$' + university + '$' + address;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then((response) => {
    return response.json().then((result) => {
      /*
        In case of a successful login
      */
      if (response.ok) {
        /*
          Update user data in local storage and then send 
          data to login screen
        */
        let {selectedCourses, token} = result;
        selectedCourses = selectedCourses.map((course) => ({
          name: course.courseName,
          id: course._id,
        }));
        return Promise.all([
          setUserId(token),
          setUserCourses(selectedCourses),
        ]).then(() => ({
          navigate: true,
          selectedCourses,
        }));
      } else {
        /*
          Otheriwse display an error message in login screen
        */
        return {navigate: false, message: result.message};
      }
    });
  });
};

/*
  Function to get the name of all registered universities from API
*/
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
