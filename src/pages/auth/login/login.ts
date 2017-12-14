import {Component} from '@angular/core';
import {App, IonicPage} from 'ionic-angular';
import {Form} from "../../../models/former/form";
import {AuthProvider} from "../../../providers/auth/auth";
import {TabsPage} from "../../tabs/tabs";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    public loginForm: Form;

    /**
     * Login page.
     *
     * @param {AuthProvider} auth
     * @param {App} app
     */
    constructor(
        private auth: AuthProvider,
        private app: App
    ) {
        this.loginForm = {
            action: 'auth/login',
            method: 'POST',
            submitText: 'Giriş',
            fields: [
                {
                    name: 'email',
                    type: 'email'
                },
                {
                    name: 'password',
                    type: 'password'
                }
            ],
            success: (result) => {
                this.auth.setToken(result.token);
                this.auth.setUser(result.data);

                this.app.getRootNav().push(TabsPage);
            }
        };
    }
}
