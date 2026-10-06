import API from '../index';
import { AuthUser } from '../../types/index';

function setCookie(name: string, value: string, days: number) {}

const Login = async (user: AuthUser) => {
  try {
    const response = await API.post('login', user);

    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      setCookie('token', token, 7);
    } else {
      return 'usuario não encontrado: ' + response.data.message;
    }

    return 'Login successful';
  } catch (error) {
    return 'Login failed due to an error: ' + error;
  }
};

const Register = async (user: AuthUser, cookies: any) => {
  try {
    const response = await API.post('register', user, cookies);

    if (response.status === 200 || response.status === 204) {
      const token = response.data.token;
      setCookie('token', token, 7);
    } else {
      return 'usuario não cadastrado: ' + response.data.message;
    }

    return 'Registration successful';
  } catch (error) {
    return 'Cadastro falou devido ao erro: ' + error;
  }
};

export { Login, Register };
