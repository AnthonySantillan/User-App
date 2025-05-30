import { createReducer, on } from "@ngrx/store";
import { loginSuccess, logout} from "./auth.actions";

interface LoginState {
  isAuth: boolean;
  isAdmin: boolean;
  user: any;
}

export const initialLogin: LoginState = {
  isAuth: false,
  isAdmin: false,
  user: undefined
};

const savedLogin = sessionStorage.getItem('login');
export const initialState: LoginState = savedLogin
  ? JSON.parse(savedLogin)
  : initialLogin;

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { login }) => ({
    isAuth: true,
    isAdmin: login.isAdmin,
    user: login.user
  })),
  on(logout, () => ({ ...initialLogin }))
);
