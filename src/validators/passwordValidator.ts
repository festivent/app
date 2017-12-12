import {FormControl} from '@angular/forms';

export class PasswordValidator
{
    /**
     * Is valid password.
     *
     * @param {FormControl} control
     * @returns {any}
     */
    static isValid(control: FormControl)
    {
        let PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/;

        if (control.value != "" && !PASSWORD_REGEXP.test(control.value)) {
            return { invalidPassword: true };
        }

        return null;
    }
}
