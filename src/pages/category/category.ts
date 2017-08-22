import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import {Http, Headers} from '@angular/http';
import { ViewController } from 'ionic-angular';
import {ShowRequestsPage} from '../show-requests/show-requests';
import {Storage} from '@ionic/storage';
import {DashboardPage} from '../dashboard/dashboard';
/**
 * Generated class for the CategoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public storage:Storage) {
  }
@ViewChild(Slides) setslide:Slides;
  data:any
show:any
id:any
passon:any
children:any
pass:any
logid:any;
partialUrl:any;
error:any;

ionViewWillEnter()
{
  this.getCategory();
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostrequestPage');
  }


  getCategory()
  {
    var arr = new Array();
    this.http.get('http://localhost/signup-API/new1.php?rquest=showCategory').map(res => res.json()).subscribe(res =>{
      this.data = res.msg;
      this.passon = this.data;

      for(let i of this.data)
      {
        if(i.parent == null)
        {
          arr.push(i);
        }
      }
      function compare(a,b)
      {
        if(a.sequence < b.sequence)
        {
          return -1;
        }
        if(a.sequence > b.sequence)
        {
          return 1;
        }
        return 0;
      }
      arr.sort(compare);
      this.show = arr;
      this.partialUrl = "http://localhost/signup-API/";
    },
    (err)=>{
      alert("failed");
    }
    );

     this.storage.get('sid').then(res => {
      this.logid = res;
    })
  }

  selectSubcategory(parents)
  {
    var child = new Array();
    for(var i of this.passon)
    {
      if(parents == i.parent)
      {
        child.push(i);
      }
    }
    this.children = child;
    this.setslide.lockSwipes(false);
    this.setslide.slideNext();
    this.setslide.lockSwipes(true);
  }

  showing(passid)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    
    let data = JSON.stringify({
      supplierId: this.logid,
      categoryId:passid,
    });
    //alert(data);
   this.http.post('http://localhost/signup-API/new1.php?rquest=updateSuppCategory', data, headers).map(res=>res.json()).subscribe(res=>
    {
      if(res.status == "Success")
      {
        this.navCtrl.push(DashboardPage);
      }
      else
      {
        this.error = res.msg;
        alert(this.error);
      }

    });
   //
  }
  
}



