import {Component} from '@angular/core';
import {App, IonicPage} from 'ionic-angular';
import {GenderHelper} from "../../../helpers/genderHelper";
import {Form} from "../../../models/former/form";
import {TabsPage} from "../../tabs/tabs";
import {AuthProvider} from "../../../providers/auth/auth";

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    public registerForm: Form;

    /**
     * Register page.
     *
     * @param {AuthProvider} auth
     * @param {App} app
     */
    constructor(
        private auth: AuthProvider,
        private app: App
    ) {
        this.registerForm = {
            method: 'POST',
            action: 'auth/register',
            submitText: 'Oluştur',
            fields: [
                {
                    name: 'name',
                    type: 'text'
                },
                {
                    name: 'email',
                    type: 'email'
                },
                {
                    name: 'password',
                    type: 'password'
                },
                {
                    name: 'password_confirmation',
                    type: 'password'
                },
                {
                    name: 'gender',
                    type: 'select',
                    items: GenderHelper.all()
                },
                {
                    name: 'birth_at',
                    type: 'datetime',
                    displayFormat: 'DD/MM/YYYY'
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
