import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BiddingPage} from '../bidding/bidding';
import {Storage} from '@ionic/storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage) {
  }

  requirement:any = this.navParams.get('reqDet');
  minrange:any;
  maxrange:any;
  hasBid:any;
  supplierId:any;

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

  this.storage.get('sid').then(val => {
    this.supplierId = val;
  }).then(val => {
    var temp = this.supplierId + this.requirement.id;
    this.storage.get(temp).then(val => {
      if(val == true)
      {
        this.hasBid = true;
      }
      else
      {
        this.hasBid = false;
      }
    })
  })
}

bidDetails()
{
  alert(this.hasBid);
  this.navCtrl.push(BiddingPage, {
    bidDetails: this.requirement,
    maxrange: this.maxrange,
  });
}

}
