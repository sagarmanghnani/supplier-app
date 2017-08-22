import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import {DashboardPage} from '../dashboard/dashboard';
import {LoginPage} from '../login/login';
import {CategoryPage} from '../category/category';
import {HomePage} from '../home/home';

/**
 * Generated class for the DeletePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-delete',
  templateUrl: 'delete.html',
})
export class DeletePage {

   tab1 = HomePage;
  tab2 = DashboardPage;
  tab3 = LoginPage;
  tab4 = CategoryPage;
  @ViewChild('myTabs')tabRef: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeletePage');
  }

}
