import {AuthService} from "../../services/auth.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Router} from "@angular/router";
import {login, loginError, loginSuccess} from "./auth.actions";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import Swal from "sweetalert2";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthEffects {
  constructor(
    private service: AuthService,
    private action$: Actions,
    private router: Router
  ) {
  }

  login$ = createEffect(
    () => this.action$.pipe(
      ofType(login),
      exhaustMap(action => this.service.loginUser({
        username: action.username,
        password: action.password})
        .pipe(
          map(response => {
            const token = response.token;
            const payload = this.service.getPlayload(token);

            const loginData = {
              user:{username: payload.sub} ,
              isAuth: true,
              isAdmin: payload.isAdmin
            }
            this.service.token = token;
            this.service.user = loginData;
            return loginSuccess({login: loginData});
          }),
          catchError((error) => of(loginError({error: error.error.message})))
        ))
    )
  );

  loginSuccess$ = createEffect(() => this.action$.pipe(
    ofType(loginSuccess),
    tap(() => {
      this.router.navigate(['/users/page/0']);
    })
    ), {dispatch: false});

  loginError$ = createEffect(() => this.action$.pipe(
    ofType(loginError),
    tap((action) => {
        Swal.fire('Error en el login', action.error, 'error');
    })
  ), {dispatch: false});
}
