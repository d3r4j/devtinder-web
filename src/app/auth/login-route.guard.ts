import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthUserService } from '../services/auth-user.service';

export const loginRouteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthUserService)

  const isLoggedIn = auth.isLoggedIn?.()

  if (isLoggedIn) {
    router.navigate(['/feed']);
    return false;
  }

  return true;
};
