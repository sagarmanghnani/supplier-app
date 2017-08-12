import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {SignupPage} from '../signup/signup';
import {LoginPage} from '../login/login';
import {ProfileInfoPage} from '../profile-info/profile-info';
import {SupplierInfoPage} from '../supplier-info/supplier-info';
import {CategoryPage} from '../category/category';
import {ShowRequestsPage} from '../show-requests/show-requests';
import {BiddingPage} from '../bidding/bidding';
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

  supplier()
  {
    this.navCtrl.push(SupplierInfoPage);
  }

  category()
  {
    this.navCtrl.push(CategoryPage);
  }

  request()
  {
    this.navCtrl.push(ShowRequestsPage);
  }

  bidding()
  {
    this.navCtrl.push(BiddingPage);
  }
}
