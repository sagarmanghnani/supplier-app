import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Headers} from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  submit: boolean = false;
  loginform: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public http: Http) {
    this.loginform = formBuilder.group({
      username:['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.pattern('[a-zA-Z]*'), Validators.required])],
      accountType:['', Validators.required],
    })
  }
  error:string;
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

postLoginRequest()
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let data = JSON.stringify({
      username: this.loginform.get('username').value,
      password:this.loginform.get('password').value,
      accountType: this.loginform.get('accountType').value,
});
    this.http.post('http://localhost/signup-API/new1.php?rquest=logIn', data, headers).map(res=>res.json()).subscribe(res=>
    {
      console.log(res.status);
      if(res.status === "Success")
      {
        this.error = res.msg;
      }
      else
      {
        this.error = res.msg;
      }
    },
    (err) =>{
      console.log("failed");
    });

}
}
