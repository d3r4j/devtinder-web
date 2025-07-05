import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FeedComponent } from './components/feed/feed.component';
import { RootRedirectComponent } from './components/root-redirect/root-redirect.component';
import { authRouteGuard } from './auth/auth-route.guard';
import { loginRouteGuard } from './auth/login-route.guard';
import { ConnectionsComponent } from './components/connections/connections.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { PremiumComponent } from './components/premium/premium.component';


const routes: Routes = [
  { path: '', component: RootRedirectComponent },
  { path: 'feed', component: FeedComponent, canActivate: [authRouteGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginRouteGuard] }, //reverse guard
  { path: 'profile', component: ProfileComponent, canActivate: [authRouteGuard] },
  { path: 'connections', component: ConnectionsComponent, canActivate: [authRouteGuard] },
  { path: 'requests', component: UserRequestsComponent, canActivate: [authRouteGuard] },
  { path: 'premium', component: PremiumComponent, canActivate: [authRouteGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
