import {CommonActions} from '@react-navigation/native';

export const resetState = (navigation, state) => {
  navigation.dispatch(CommonActions.reset(state));
};
