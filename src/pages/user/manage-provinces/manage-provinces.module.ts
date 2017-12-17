import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ManageProvincesPage} from './manage-provinces';

@NgModule({
  declarations: [
    ManageProvincesPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageProvincesPage),
  ],
})
export class ManageProvincesPageModule {}
