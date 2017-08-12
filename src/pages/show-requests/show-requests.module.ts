import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowRequestsPage } from './show-requests';

@NgModule({
  declarations: [
    ShowRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowRequestsPage),
  ],
  exports: [
    ShowRequestsPage
  ]
})
export class ShowRequestsPageModule {}
