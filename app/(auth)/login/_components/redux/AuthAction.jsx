// auth.js
import { login as loginAction, logout as logoutAction } from './AuthSlice'; // Update the path accordingly
import store from './store'; // Update the path accordingly

export const login = (user) => {
  // Simulate API call for authentication
  // Replace this with your actual authentication logic
  // Assume authentication is successful for demonstration purposes
  store.dispatch(loginAction(user));
};

export const logout = () => {
  // Simulate logging out
  store.dispatch(logoutAction());
};
