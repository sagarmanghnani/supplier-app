import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FileChooser } from '@ionic-native/file-chooser';
import {FilePath} from '@ionic-native/file-path';
import 'rxjs/add/operator/map';
import {Http, Headers} from '@angular/http';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import {DashboardPage} from '../dashboard/dashboard';
import {CategoryPage} from '../category/category';
import {Storage} from '@ionic/storage';
/**
 * Generated class for the SupplierInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var temp;
@IonicPage()
@Component({
  selector: 'page-supplier-info',
  templateUrl: 'supplier-info.html',
})

export class SupplierInfoPage {
@ViewChild(Slides) setslide:Slides;
supplierInfo:FormGroup
public keys:any
public show:any
public upload:any

accountType = 'Supplier'
supplierServices = 'free'
sid:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public fileChooser:FileChooser, public filePath: FilePath, public http:Http, public transfer:Transfer, public storage:Storage)  {
    this.supplierInfo = formBuilder.group({
      gst: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(15)])],
      cname:['', Validators.required],
      address:['', Validators.required],
      vlink:'',
      portfolio:'',
      website:'',
      complaint:['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])],
    })
  }

ionViewWillEnter()
{
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierInfoPage');
    this.getId();
  }

getPortfolio()
{
	this.fileChooser.open()
  .then(uri => {
	  this.keys = uri;
    return uri;
  }).then((uri)=>{
    this.filePath.resolveNativePath(uri).then(filePath=>{
      this.show = filePath;
      //alert("corrected path " + this.show);
      var lastindex = this.show.lastIndexOf("/");
      var newfile = this.show.slice(lastindex + 1);
      this.upload = newfile;
      //alert(newfile);
    })
  })
}

getId()
{
  this.storage.get('sid').then(val => {
    this.sid = val; 
  })
}

sendData()
{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    //alert(this.sid);
    var mata = JSON.stringify({
           gst: this.supplierInfo.get('gst').value,
           cname:this.supplierInfo.get('cname').value,
           address:this.supplierInfo.get('address').value,
           vlink: this.supplierInfo.get('vlink').value,
           website: this.supplierInfo.get('website').value,
           complaint: this.supplierInfo.get('complaint').value,
           portfolio: this.keys,
           id:this.sid,
           accountType: this.accountType,
           supplierServices: this.supplierServices,
    });
    console.log(mata);
    //New content

    if(!(this.supplierInfo.get('portfolio').value))
      {
        alert("no portfolio");
        //var kata = JSON.parse(mata);
        //kata.portfolio = "";
        //mata = JSON.stringify(kata);
        console.log("new mata" + mata);
        this.http.post('http://10.0.2.2/signup-API/new1.php?rquest=withoutPortfolio', mata, headers).map(res => res.json()).subscribe(res =>{
          if(res.status == 'Success')
            {
              alert("done without portfolio");
              alert(res.msg);
              this.navCtrl.push(CategoryPage);
            }
          else
            {
              alert(res.msg);
            }
        },
     
    )
      }

    //ends here
    //alert(mata); 
    else
    {
    const fileTransfer: TransferObject = this.transfer.create();
    let option1: FileUploadOptions = {
         fileKey:'file',
         fileName: this.upload,
         headers: {},
         mimeType: "multipart/form-data",
         httpMethod: 'POST',
         params:{
           data:mata,
         }
    }
    fileTransfer.upload(this.keys, 'http://10.0.2.2/signup-API/new1.php?rquest=supplierInfo',option1).then((data)=>{
      //alert(data.response);
      var res = data.response;
      console.log(data.response); 
      var stringResponse = JSON.parse(res);
      if(stringResponse.status == 'Success')
        {
          this.navCtrl.push(CategoryPage);
          console.log("congrats");
        }
      else
        {
          alert(stringResponse.msg);
        }
       console.log(typeof(stringResponse));
        console.log(stringResponse);
        //this.navCtrl.push(CategoryPage);
    },
    (err)=>{
      alert("failed to send");
    }
    );
  }

}

next()
  {
    this.setslide.lockSwipes(false);
    this.setslide.slideNext();
    this.setslide.lockSwipes(true);

  }
  prev()
  {
    this.setslide.lockSwipes(false);
    this.setslide.slidePrev();
    this.setslide.lockSwipes(true);
  }

}

















