import API from '../index';
import { AuthUser } from '../../types/index';

function setCookie(name: string, value: string, days: number) {}

const Login = async (user: AuthUser, cookies: any) => {
  try {
    await API.post('login', user, cookies);
    return 'Login successful';
  } catch (error) {
    return 'Login failed due to an error: ' + error;
  }
};
