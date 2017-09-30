import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http,Headers} from '@angular/http';
import {Camera, CameraOptions} from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { ActionSheetController } from 'ionic-angular';
import {SupplierInfoPage} from '../supplier-info/supplier-info'

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public http:Http, public camera: Camera, public transfer:Transfer, public actionSheetCtrl:ActionSheetController) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileInfoPage');
  }
  
  boolcheck:boolean;
  phone:any = this.navParams.get('phones');
    profileImage:any;
  accountType:any = this.navParams.get('accountType');
  currentDate: string = (new Date()).toLocaleDateString();
  currentTime: string = (new Date()).toLocaleTimeString();
  dateTime:any = (new Date()).toJSON();
  Cameraupload()
  {
    const options: CameraOptions = {
      quality:100,
       destinationType:this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.CAMERA,
      }
    return options;
   }

   GalleryUpload()
   {
     const options: CameraOptions = {
      quality:100,
       destinationType:this.camera.DestinationType.FILE_URI,
       encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      }
    return options;
   }


   deploy(check)
   {
    // alert(this.phone);
     var ops;
     if(check == 1)
     {
       ops = this.Cameraupload();
     }
     else
     {
       ops = this.GalleryUpload();
     }
     //alert(ops.quality);
     this.camera.getPicture(ops).then((imageData)=>{
       let image = 'data:image/jpeg;FILE_URI' + imageData;
       //alert(image);

       const fileTransfer: TransferObject = this.transfer.create();


       let option1: FileUploadOptions = {
         fileKey:'file',
         fileName: '.jpeg',
         headers: {},
         mimeType: "multipart/form-data",
         httpMethod: 'POST',
         params: {
           phone: JSON.stringify(this.phone),
           accountType:JSON.stringify(this.accountType),
         }
        }
        
        fileTransfer.upload(imageData, 'http://10.0.2.2/signup-API/new1.php?rquest=getImage',option1).then((data)=>{
          //alert(data.response);
          var key = Object.keys(data);
          //alert(key);
           var save = JSON.parse(data.response);

           if(save.status == 'Success')
          {
            this.boolcheck = true;
            //alert(save.profileImage);
          this.profileImage = "http://10.0.2.2/signup-API/" + save.profileImage;
          }
          /*this.navCtrl.push(SupplierInfoPage);*/
        },
        (err) =>{
          alert('failed');
        }
        );        
         
        },
     (err)=>{
        alert("failed");
     }
     
       );
      
  }




   presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Profile picture',
      buttons: [
        {
          text: 'From Gallery',
          role: 'destructive',
          handler: () => {
            this.deploy(0);
          }
        },{
          text: 'Use camera',
          handler: () => {
            this.deploy(1);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  skip()
  {
    this.navCtrl.push(SupplierInfoPage);
  }
}


      

