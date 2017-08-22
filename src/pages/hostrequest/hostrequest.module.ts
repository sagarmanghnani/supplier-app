import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HostrequestPage } from './hostrequest';

@NgModule({
  declarations: [
    HostrequestPage,
  ],
  imports: [
    IonicPageModule.forChild(HostrequestPage),
  ],
  exports: [
    HostrequestPage
  ]
})
export class HostrequestPageModule {}
