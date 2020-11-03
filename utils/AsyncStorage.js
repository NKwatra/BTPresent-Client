import AsyncStorage from '@react-native-async-storage/async-storage';

const ACCOUNT_TYPE = 'accountType';

export const setAccountType = (accountType) => {
  return AsyncStorage.setItem(ACCOUNT_TYPE, accountType).catch((err) => {
    console.log(err);
  });
};
