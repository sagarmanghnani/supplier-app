import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BiddingPage} from '../bidding/bidding';
/**
 * Generated class for the RequestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-request-details',
  templateUrl: 'request-details.html',
})
export class RequestDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  requirement:any = this.navParams.get('reqDet');
  minrange:any;
  maxrange:any;

  ionViewWillEnter()
  {
    this.show();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailsPage');
  }

  show()
{
  var separate = this.requirement.priceRange;
  var sep = separate.split(",");
  this.minrange = sep[0];
  this.maxrange = sep[1];
}

bidDetails()
{
  this.navCtrl.push(BiddingPage, {
    bidDetails: this.requirement,
    maxrange: this.maxrange,
  });
}

}
