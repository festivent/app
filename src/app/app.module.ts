import {ErrorHandler, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/about/about';
import {ContactPage} from '../pages/contact/contact';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthProvider} from '../providers/auth/auth';
import {SplashPage} from "../pages/splash/splash";
import {LoginPage} from "../pages/auth/login/login";
import {RegisterPage} from "../pages/auth/register/register";
import {TermsPage} from "../pages/common/terms/terms";
import {PrivacyPage} from "../pages/common/privacy/privacy";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AppTranslateLoader} from "./app.translate.loader";
import {ControlErrorComponent} from "../components/control-error/control-error";
import {FormerComponent} from "../components/former/former";
import {IonicStorageModule} from "@ionic/storage";

@NgModule({
    declarations: [
        MyApp,
        ControlErrorComponent,
        FormerComponent,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SplashPage,
        LoginPage,
        RegisterPage,
        TermsPage,
        PrivacyPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: AppTranslateLoader
            }
        }),
        IonicModule.forRoot(MyApp, {
            backButtonText: ''
        }),
        IonicStorageModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ControlErrorComponent,
        FormerComponent,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SplashPage,
        LoginPage,
        RegisterPage,
        TermsPage,
        PrivacyPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        AuthProvider
    ]
})
export class AppModule {}
