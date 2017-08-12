import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierInfoPage } from './supplier-info';

@NgModule({
  declarations: [
    SupplierInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplierInfoPage),
  ],
  exports: [
    SupplierInfoPage
  ]
})
export class SupplierInfoPageModule {}
