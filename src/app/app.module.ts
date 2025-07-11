import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BodyComponent } from './components/body/body.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './components/feed/feed.component';
import { RootRedirectComponent } from './components/root-redirect/root-redirect.component';
import { ConnectionsComponent } from './components/connections/connections.component';
import { UserRequestsComponent } from './components/user-requests/user-requests.component';
import { PremiumComponent } from './components/premium/premium.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    BodyComponent,
    FooterComponent,
    FeedComponent,
    RootRedirectComponent,
    ConnectionsComponent,
    UserRequestsComponent,
    PremiumComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
