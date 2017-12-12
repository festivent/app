import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from "../../../validators/emailValidator";
import {PasswordValidator} from "../../../validators/passwordValidator";
import {ConfirmedValidator} from "../../../validators/confirmedValidator";
import {GenderHelper} from "../../../helpers/genderHelper";
import {GenderValidator} from "../../../validators/genderValidator";

@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})
export class RegisterPage {
    public registerForm: FormGroup;
    public genderHelper = GenderHelper;

    constructor(
        public navCtrl: NavController,
        public formBuilder: FormBuilder
    ) {
        this.registerForm = formBuilder.group({
            name: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(127)
            ])],
            email: ['', Validators.compose([
                Validators.required,
                Validators.maxLength(127),
                EmailValidator.isValid
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(32),
                PasswordValidator.isValid
            ])],
            password_confirmation: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(32),
                PasswordValidator.isValid
            ])],
            gender: ['', Validators.compose([
                Validators.required,
                GenderValidator.isValid
            ])],
            birth_at: ['', Validators.compose([
                Validators.required
            ])]
        }, {
            validator: ConfirmedValidator.isValid('password', 'password_confirmation')
        });
    }

    /**
     * Check the field has error.
     *
     * @param {string} name
     * @returns {boolean}
     */
    public hasError(name: string)
    {
        return this.registerForm.controls[name].touched && !this.registerForm.controls[name].valid;
    }

    public register()
    {
        console.log(this.registerForm);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad RegisterPage');
    }

}
