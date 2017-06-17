import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


/**
 * Generated class for the OtpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})

export class OtpPage {
otp:FormGroup
appNumber: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public formBuilder: FormBuilder) {
    this.otp = formBuilder.group({
        otps: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

phone:any = this.navParams.get('phone');
accountType:any = this.navParams.get('accountType');

  sendOtp()
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = JSON.stringify({
      phone: this.phone,
      otp: this.otp.get('otps').value,
      accountType: this.accountType,
    });
    
    console.log("otp value is" + this.otp.get('otps').value);

    this.http.post('http://localhost/signup-API/new1.php?rquest=getOtp',data,headers).map(res => res.json()).subscribe(res => {
      if(res.status === 'Success')
      {
      console.log('successfully entered login details' + res.msg);
    }
    else{
      console.log(res.msg);
    }
    
    },
    (err)=>{
      console.log("failed")
    }
    )
  }
}






