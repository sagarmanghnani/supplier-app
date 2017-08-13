import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowbidsPage } from './showbids';

@NgModule({
  declarations: [
    ShowbidsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowbidsPage),
  ],
  exports: [
    ShowbidsPage
  ]
})
export class ShowbidsPageModule {}
