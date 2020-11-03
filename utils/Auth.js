// TODO: extract cookie expiration date to check if user is still
// authenticated
export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(false), 2000);
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
