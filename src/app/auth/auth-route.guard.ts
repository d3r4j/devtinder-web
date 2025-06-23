import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const authRouteGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthUserService)
  const router = inject(Router);

  const isLoggedIn = auth.isLoggedIn?.()

  if (!isLoggedIn) {
    router.navigate(['/login'])
    return false
  }
  return true
};
