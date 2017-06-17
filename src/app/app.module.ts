import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {SignupPage} from '../pages/signup/signup'
import { IonicStorageModule } from '@ionic/storage';
import {LoginPage} from '../pages/login/login'
import { HttpModule } from '@angular/http';
import {OtpPage} from '../pages/otp/otp';
import {ProfileInfoPage} from '../pages/profile-info/profile-info';
import {AppVersion} from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    OtpPage,
    ProfileInfoPage,  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    LoginPage,
    OtpPage,
    ProfileInfoPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Storage,
    AppVersion,

  ]
})
export class AppModule {}
