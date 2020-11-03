export const isAuthenticated = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(false), 2000);
  });
};
