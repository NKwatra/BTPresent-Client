import Config from 'react-native-config';
import {getUserId} from './AsyncStorage';

export const extractStudentNames = (addresses) => {
  const url = Config.API_URL + '/info/extract';
  return getUserId().then((token) => {
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify({address: addresses}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {error: true};
      }
    });
  });
};

export const sendAttendanceToBackend = (students, univID, courseID) => {
  const url = Config.API_URL + '/info/attendance/add';
  return getUserId().then((token) => {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({students, univID, courseID}),
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return {error: true};
      }
    });
  });
};

export const getAttendanceRecord = (courseID, accountType) => {
  const url = `${Config.API_URL}/info/attendance?courseID=${courseID}&accountType=${accountType}`;
  return getUserId().then((token) => {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((attendanceRecord) => attendanceRecord);
  });
};
