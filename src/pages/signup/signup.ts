import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {matchingPasswords} from '../../validators/confirmpass';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';
import {OtpPage} from '../otp/otp'
import {AppVersion} from '@ionic-native/app-version'

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

 items: any[] = [];
 obj: any;
 newItems: any[] = [];
 val: boolean;
submit: boolean = false;
error: string;

 oneform: FormGroup;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public formBuilder: FormBuilder, public http: Http, public appVersion:AppVersion) {
      this.oneform = formBuilder.group({
        password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z]*'), Validators.required])],
        Email:['', Validators.email],
        name:['', Validators.required],
        confirm:['', Validators.required],
        Phone:['', Validators.compose([Validators.minLength(10), Validators.maxLength(10), Validators.required])],
      },
      {
        validator: matchingPasswords('password', 'confirm')
      }
             
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


showData()
{
  alert(this.oneform.get('accountType').value);
}

  postRequest()
    {
      this.appVersion.getVersionNumber().then((s)=>{
      var headers = new Headers();
      //headers.append("Accept", "application/json");
      headers.append('Content-Type', 'application/json');
      //let options = new RequestOptions({headers: headers});
      let data = JSON.stringify({
        email: this.oneform.get('Email').value,
        name:this.oneform.get('name').value,
        Phone:this.oneform.get('Phone').value,
        password:this.oneform.get('password').value,
        accountType: "Supplier",
        appversion:s,
  });
      this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=checkList', data, headers).map(res=>res.json()).subscribe(res=>
      {
        console.log(res);
        if(res.status === 'Success')
        {
          alert("pushing");
          this.navCtrl.push(OtpPage,{
            phone: this.oneform.get('Phone').value,
            accountType: "Supplier",
          })
        }
        else
        {
            this.error = res.show;
        }
      },
      (err) =>{
        console.log("failed");
        alert('failed');
      });
      })
      
      
  }
}