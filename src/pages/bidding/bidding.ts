import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';

/**
 * Generated class for the BiddingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
})
export class BiddingPage {

  bidding: FormGroup
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage,public formBuilder: FormBuilder, public http:Http, public alert:AlertController) {
    this.bidding = formBuilder.group({
      bidValue: ['', Validators.required],
      biddingTerms: ['', Validators.required]
    });

    var bidval = parseInt(this.bidding.get('bidValue').value);
    if(bidval > this.maxrange)
    {
      let alert = this.alert.create({
        title : 'Warning!!',
        subTitle: 'Bid Value you entered is more then the maximum range provided by the consumer for product',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  // this.bidDetails.id is request id
  supplierId:any;
  bidDetails:any = this.navParams.get('bidDetails');
  maxrange:any = parseInt(this.navParams.get('maxrange'));
  ionViewDidLoad() {
    console.log('ionViewDidLoad BiddingPage');
  }

  bidData()
  {
    
    this.storage.get('sid').then(val => {
      
      var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     // alert message
     let data = JSON.stringify({  
       requestId: this.bidDetails.id,
       supplierId: val,
       bidValue: this.bidding.get('bidValue').value,
       biddingTerms: this.bidding.get('biddingTerms').value
     });  
     alert(data);
     this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=postBidding', data, headers).map(res => res.json()).subscribe(res => {
      alert(res.msg);
     });

    
  });
  } 

}
