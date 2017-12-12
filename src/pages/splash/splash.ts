import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {LoginPage} from "../auth/login/login";
import {RegisterPage} from "../auth/register/register";

@IonicPage()
@Component({
    selector: 'page-splash',
    templateUrl: 'splash.html',
})
export class SplashPage {
    public loginPage = LoginPage;
    public registerPage = RegisterPage;
}
