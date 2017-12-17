import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {GenderHelper} from "../../../helpers/genderHelper";
import {Form} from "../../../models/former/form";
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
     */
    constructor(
        private auth: AuthProvider
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
            }
        };
    }
}
