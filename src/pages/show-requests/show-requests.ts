import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import {RequestDetailsPage} from '../request-details/request-details';
/**
 * Generated class for the ShowRequestsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var tempLog;
@IonicPage()
@Component({
  selector: 'page-show-requests',
  templateUrl: 'show-requests.html',
})


export class ShowRequestsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public http:Http) {
  }
  request:any;
  public categoryId:any;
  public logid:any;

  ionViewWillEnter()
{
  
  this.getLogid();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRequestsPage');
  }

  getLogid()
  {
    this.storage.get('sid').then(val => {
      this.logid = val;
      this.storage.get(val).then(val => {
        this.categoryId = val;
        console.log(val);
         var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let data = JSON.stringify({
        categoryid:this.categoryId
      });
      
      
      this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=supplierRequests', data,headers).map(res => res.json()).subscribe(res =>{
        if(res.status == 'Success')
        {
          this.request = res.msg;
        }
      },
      (err)=>{
        alert("connection failed");
      }
      );
        
      })
    });
  }

  

  requirementDetail(requirement)
  {
    console.log(requirement);
    this.navCtrl.push(RequestDetailsPage, {
      reqDet:requirement,
    });
  }

}
