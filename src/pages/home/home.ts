import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {LoginPage} from '../login/login';
import {ProfileInfoPage} from '../profile-info/profile-info';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
    navigate(){
      this.navCtrl.push(SignupPage);
    }
    
  login(){
    this.navCtrl.push(LoginPage);
  }

  nav()
  {
    this.navCtrl.push(SignupPage);
  }

  pageinfo()
  {
    this.navCtrl.push(ProfileInfoPage);
  }
}
