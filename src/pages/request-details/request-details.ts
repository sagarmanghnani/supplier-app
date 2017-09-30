import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {BiddingPage} from '../bidding/bidding';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
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

  constructor(
    public navCtrl: NavController, 
  public navParams: NavParams, 
  public storage:Storage, 
  public http:Http,
  public app: App,
  ) {
  }

  requirement:any = this.navParams.get('params');
  minrange:any;
  maxrange:any;
  hasBid:any;
  supplierId:any;
  requestId:any;
  bidClosed:boolean;

  ionViewWillEnter()
  {
    //alert(this.requirement);
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestDetailsPage');
    this.show();
  }

  show()
{
  this.storage.get('sid').then(val => {
    console.log(this.requirement);
  var separate = this.requirement.priceRange;
  var sep = separate.split(",");
  this.minrange = sep[0];
  this.maxrange = sep[1];
  this.supplierId = val;
  this.requestId = this.requirement.id1;
  
  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  let data = JSON.stringify({
    supplierId:this.supplierId,
    requestId:this.requestId,
  });
  //alert(data);
  this.http.post('http://localhost/signup-API/new1.php?rquest=checkBid', data,headers).map(res => res.json()).subscribe(res =>{
    //alert(res.status);
    if(this.requirement.bidStatus == 1)
      {
        this.bidClosed = true;
      }
    else
      {
        this.bidClosed = false;
      }
      
    if(res.status == 'Bided')
    {
      this.hasBid = true;
    }
    else
    {
      this.hasBid = false;
    }
    //alert(this.hasBid);
  });
  });
  
}

bidDetails()
{
  //alert(this.hasBid);
  
  //solution to get out of tabs page
  let nav = this.app.getRootNav();
  nav.push(BiddingPage, {
    bidDetails: this.requirement,
    maxrange: this.maxrange,
  });
  /*this.navCtrl.push(BiddingPage, {
    bidDetails: this.requirement,
    maxrange: this.maxrange,
  });*/
}

}
