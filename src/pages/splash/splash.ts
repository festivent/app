import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LoginPage} from "../auth/login/login";
import {RegisterPage} from "../auth/register/register";
import {TermsPage} from "../common/terms/terms";
import {PrivacyPage} from "../common/privacy/privacy";

@IonicPage()
@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html',
})
export class SplashPage {
    public loginPage: any;
    public registerPage: any;
    public termsPage: any;
    public privacyPage: any;

    public constructor()
    {
        this.loginPage = LoginPage;
        this.registerPage = RegisterPage;
        this.termsPage = TermsPage;
        this.privacyPage = PrivacyPage;
    }
}
