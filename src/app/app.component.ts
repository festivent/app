import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {AuthProvider} from "../providers/auth/auth";
import {SplashPage} from "../pages/splash/splash";
import {TranslateService} from "@ngx-translate/core";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
    rootPage:any = null;

    constructor(
        platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        auth: AuthProvider,
        translate: TranslateService
    ) {
        translate.setDefaultLang('tr');

        auth.reload().then(check => {
            if (check) {
                this.nav.setRoot(TabsPage);
            } else {
                this.nav.setRoot(SplashPage);
            }
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
