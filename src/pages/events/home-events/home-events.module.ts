import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomeEventsPage} from './home-events';

@NgModule({
  declarations: [
    HomeEventsPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeEventsPage),
  ],
})
export class HomeEventsPageModule {}
