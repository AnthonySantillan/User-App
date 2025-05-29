import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.authenticated()){
    if (isTokenExpired()){
      service.logout();
      router.navigate(['/login']);
      return false;
    }
    if (!service.isAdmin())
    {
      router.navigate(['/forbidden'])
      return false;
    }
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const service = inject(AuthService);
  const token = service.token;
  const payload = service.getPlayload(token);
  const exp = payload.exp;
  const now = new Date().getTime() / 1000;
  return (now > exp) ? true : false;
}
