import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileInfoPage } from './profile-info';

@NgModule({
  declarations: [
    ProfileInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileInfoPage),
  ],
  exports: [
    ProfileInfoPage
  ]
})
export class ProfileInfoPageModule {}
