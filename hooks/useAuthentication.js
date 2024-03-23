import { useContext, useState } from 'react';
import { createUser, validateUser } from '../utils/auth';
import { AuthContext } from '../store/authContext';

export function useAuthenthication() {
  const { authenticate, isAuthenticated, logOut } = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(false);

  async function signUpUser({ email, password }) {
    setIsFetching(true);
    try {
      const response = await createUser({ email, password });
    } catch (error) {
      console.log(error.response.data.error.message);
    } finally {
      setIsFetching(false);
    }
  }

  async function signInUser({ email, password }) {
    setIsFetching(true);
    try {
      const response = await validateUser({ email, password });
      authenticate({ token: response.idToken });
    } catch (error) {
      console.log(error.response.data.error.message);
    } finally {
      setIsFetching(false);
    }
  }

  function signOut() {
    logOut();
  }

  return { isAuthenticated, isFetching, signUpUser, signInUser, signOut };
}
