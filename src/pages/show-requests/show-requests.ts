import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {Http, Headers} from '@angular/http';
import {RequestDetailsPage} from '../request-details/request-details';
import {HostrequestPage} from '../hostrequest/hostrequest';
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
  categoryId:any;
  public logid:any;
  data:boolean;

  ionViewWillEnter()
{
  
  this.getLogid();
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowRequestsPage');
  }

  getCategoryId()
  {
    //alert(this.logid);
  }

  getLogid()
  {
    this.storage.get('sid').then(val => {
      this.logid = val;
      
         var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      let data1 = JSON.stringify({
        supplierId: this.logid
      });

      this.http.post('http://localhost/signup-API/new1.php?rquest=supplierCategory', data1,headers).map(res => res.json()).subscribe(res =>{
        if(res.status = "Success")
        {
          this.categoryId = res.msg;
          let data = JSON.stringify({
          categoryid:this.categoryId,   
        });
        
        // next post request starts here
        console.log(this.logid);
        let data1 = JSON.stringify({
          categoryid:this.categoryId,
          supplierId:this.logid   
        });
            this.http.post('http://localhost/signup-API/new1.php?rquest=supplierRequests', data1,headers).map(res => res.json()).subscribe(res =>{
              //sort function
  
              function compare(a,b)
              {
                if(a.bidStatus > b.bidStatus)
                  {
                    //A negative value if the first argument passed is less than the second argument.
                    return -1;
                  }
                if(a.bidStatus < b.bidStatus)
                  {
                    //A positive value if the first argument is greater than the second argument.
                    return 1;
                  }
                else
                  {
                    //Zero if the two arguments are equivalent.
                    return 0;
                  }
              }

              //ends here
            if(res.status == 'Success')
            {
              var length = Object.keys(res.msg).length;
              if(length === 0)
              {
                this.data = false;
              }
              else
              {
                this.data = true;
                res.msg.sort(compare);
                this.request = res.msg;
                console.log(this.request);
                
              }
            }
          },
            (err)=>{
              alert("connection failed");
            }
          );


        //ends here
        }
      },
      (err)=> {
        alert("failed to connect");
      })

        
    });

  }

  

  /*requirementDetail(requirement)
  {
    console.log(requirement);
    this.navCtrl.push(RequestDetailsPage, {
      reqDet:requirement,
    });
  }*/

  requirementDetail(requirement)
  {
    this.navCtrl.push(HostrequestPage, {
      reqDet:requirement,
    });
  }

}
