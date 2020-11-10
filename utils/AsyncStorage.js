import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNT_TYPE = 'accountType';
const USER_ID = 'user_id';
const USER_COURSES = 'user_courses';
const UNIVERSITY_ID = 'university_id';

export const setAccountType = (accountType) => {
  return AsyncStorage.setItem(ACCOUNT_TYPE, accountType).catch((err) => {
    console.log(err);
  });
};

export const getAccountType = () => {
  return AsyncStorage.getItem(ACCOUNT_TYPE).catch((err) => console.log(err));
};

export const setUserId = (id) => {
  return AsyncStorage.setItem(USER_ID, id).catch((err) => console.log(err));
};

export const getUserId = () => {
  return AsyncStorage.getItem(USER_ID).catch((err) => console.log(err));
};

export const setUserCourses = (courses) => {
  return AsyncStorage.setItem(
    USER_COURSES,
    JSON.stringify(courses),
  ).catch((err) => console.log(err));
};

export const getUserCourses = () => {
  return AsyncStorage.getItem(USER_COURSES)
    .then((courses) => JSON.parse(courses))
    .catch((err) => console.log(err));
};

export const setUserCredentials = ({userId, universityId}) => {
  let promises = [];
  promises.push(AsyncStorage.setItem(USER_ID, userId));
  promises.push(AsyncStorage.setItem(UNIVERSITY_ID, universityId));

  return Promise.all(promises)
    .then((results) => results)
    .catch((err) => console.log(err));
};
