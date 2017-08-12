import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CategoryPage} from '../category/category';
import {ShowRequestsPage} from '../show-requests/show-requests';
import {Storage} from '@ionic/storage';
import {LoginPage} from '../login/login';

/**
 * Generated class for the DashboardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  Category()
  {
    this.navCtrl.push(ShowRequestsPage);
  }

  cat()
  {
    this.navCtrl.push(CategoryPage);
  }

 
  LogOut()
  {
    this.storage.remove('sid');
    this.storage.get('sid').then(val => {
      if(!val)
      {
        this.navCtrl.push(LoginPage);
      }
    });
  }
}
