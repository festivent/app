import {FormControl} from '@angular/forms';

export class EmailValidator
{
    /**
     * Is valid email.
     *
     * @param {FormControl} control
     * @returns {any}
     */
    static isValid(control: FormControl)
    {
        let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control.value != "" && !EMAIL_REGEXP.test(control.value)) {
            return { invalidEmail: true };
        }

        return null;
    }
}
