import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';
import {Http, Headers} from '@angular/http';
import {Platform} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileUploadOptions, TransferObject, Transfer} from '@ionic-native/transfer'
/**
 * Generated class for the ProfileInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile-info',
  templateUrl: 'profile-info.html',
})
export class ProfileInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public platform:Platform, public transfer:Transfer, public camera:Camera  ) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileInfoPage');
  }

    upload()
    {
      let options = {
        quality: 100
      };
      this.camera.getPicture(options).then((imagedata)=>{
        const fileTransfer:TransferObject = this.transfer.create();
        let options1: FileUploadOptions = {
          fileKey:'file',
          fileName: 'firstImage.jpg',
          headers:{}
        }

        fileTransfer.upload(imagedata, 'http://10.0.2.2/signup-API/new1.php?rquest=getImage', options1).then((data)=>{
          alert('success');
        },
        (err)=>{
          alert("error" + JSON.stringify(err));
        }
        );
      })
    }

} 

      

