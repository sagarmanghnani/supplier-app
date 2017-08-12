import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiddingPage } from './bidding';

@NgModule({
  declarations: [
    BiddingPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddingPage),
  ],
  exports: [
    BiddingPage
  ]
})
export class BiddingPageModule {}
