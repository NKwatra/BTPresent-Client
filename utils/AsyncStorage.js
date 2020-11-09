import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNT_TYPE = 'accountType';
const USER_ID = 'user_id';
const UNIVERSITY_ID = 'university_id';

export const setAccountType = (accountType) => {
  return AsyncStorage.setItem(ACCOUNT_TYPE, accountType).catch((err) => {
    console.log(err);
  });
};

export const getAccountType = () => {
  return AsyncStorage.getItem(ACCOUNT_TYPE).catch((err) => console.log(err));
};

export const setUserCredentials = ({userId, universityId}) => {
  let promises = [];
  promises.push(AsyncStorage.setItem(USER_ID, userId));
  promises.push(AsyncStorage.setItem(UNIVERSITY_ID, universityId));

  return Promise.all(promises)
    .then((results) => results)
    .catch((err) => console.log(err));
};