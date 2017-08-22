import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs } from 'ionic-angular';
import {RequestDetailsPage} from '../request-details/request-details';
import {ShowbidsPage} from '../showbids/showbids';
import {ConsumerPage} from '../consumer/consumer';
/**
 * Generated class for the HostrequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hostrequest',
  templateUrl: 'hostrequest.html',
})
export class HostrequestPage {

  tab1Root = RequestDetailsPage;
  tab2Root = ShowbidsPage;
  tab3Root = ConsumerPage;
  params = {
    params:this.navParams.get('reqDet')
  }

  @ViewChild('myTabs')tabRef: Tabs;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostrequestPage');
    
  }


}
