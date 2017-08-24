import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';
import {matchingPasswords} from '../../validators/confirmpass';
import {LoginPage} from '../login/login';

/**
 * Generated class for the ForgotpassPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})
export class ForgotpassPage {
  newPassword:FormGroup
  accountType:any = 'Supplier'
  email:any = this.navParams.get('email');
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http:Http) {
    this.newPassword = formBuilder.group({
      password:['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirm:['',Validators.required],
    },
    {
        validator: matchingPasswords('password', 'confirm')
    }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpassPage');
  }


    confirmPassword()
    {
      var headers = new Headers();
     headers.append('Content-Type', 'application/json');

      let data = JSON.stringify({
        password:this.newPassword.get('password').value,
        accountType: this.accountType,
        email:this.email,
      });
      //alert(data);
      this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=newPassword', data,headers).map(res=>res.json()).subscribe(res=>{
        if(res.status == 'Success')
        {
          this.navCtrl.push(LoginPage);
        }
        else
        {
          alert(res.msg);
        }
      },
      (err)=>{
        alert("failed to connect");
      }
      )
    }
}
