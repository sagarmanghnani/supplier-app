import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import { AlertController } from 'ionic-angular';
import {ShowRequestsPage} from '../show-requests/show-requests';
/**
 * Generated class for the ShowbidsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-showbids',
  templateUrl: 'showbids.html',
})
export class ShowbidsPage {

  requestInfo = this.navParams.get('params');
  supplierId: any;
  noData: any;
 public bidData:any;
  bidvalue:any;
  bidterms:any;
  requestId:any;
  biis:any;
  constructor(public navCtrl: NavController,
   public navParams: NavParams,
    public storage:Storage,
     public http:Http,
     public alertcontrol:AlertController,
     public app:App,
     ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowbidsPage');
    
  }

   ionViewWillEnter()
  {
    this.getBid(); 
  }

  getBid()
  {
    this.storage.get('sid').then(val => {
      this.supplierId = val;
      this.requestId = this.requestInfo.id1;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let data = JSON.stringify({
        supplierId:this.supplierId,
        requestId: this.requestInfo.id1
      });
      
      this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=viewSuppBid', data,headers).map(res => res.json()).subscribe(res =>{
        if(res.status == "Success")
        {
          this.bidData = res.msg;
          //doubt property of bidData is not accessible
          this.bidvalue = this.bidData.bidValue;
          this.bidterms = this.bidData.bidTerms;
        }
        else
        {
          this.noData = res.msg;
          //alert(this.noData);
        }
      });
      console.log(this.bidterms);
    })
    
  }

  deleteBid()
  {
    
    let alerts = this.alertcontrol.create({
      title: 'Delete Bid On ' + this.requestInfo.Title,
      message: 'Do you Really want to Delete bid on ' + this.requestInfo.Title,
      buttons: [
        {
          text:'Cancel',
          role:'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let data = JSON.stringify({
              supplierId:this.supplierId,
              requestId: this.requestInfo.id1
            });

            this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=deleteBid', data,headers).map(res => res.json()).subscribe(res =>{
              if(res.status == 'Success')
              {
                let nav = this.app.getRootNav();
                nav.push(ShowRequestsPage);
                //this.navCtrl.push(ShowRequestsPage);
              }
              else
              {
                alert("failed to delete bid");
              }
            });
          }
        }
      ]
    });
    alerts.present();
  }

}



/*

 var headers = new Headers();
            headers.append('Content-Type', 'application/json');

            let data = JSON.stringify({
              supplierId:this.supplierId,
              requestId: this.requestInfo.id1
            })
          this.http.post('http://localhost/signup-API/new1.php?rquest=viewSuppBid', data,headers).map(res => res.json()).subscribe(res =>{
            if(res.status == 'Success')
            {
              this.bidData = res.msg;
              alert("success");
              this.bidvalue = this.bidData.bidValue;
              this.bidterms = this.bidData.bidTerms;
              alert(this.bidvalue);
            }
          })

*/ 