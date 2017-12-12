import {FormControl} from '@angular/forms';
import {GenderHelper} from "../helpers/genderHelper";

export class GenderValidator
{
    /**
     * Is valid gender.
     *
     * @param {FormControl} control
     * @returns {any}
     */
    static isValid(control: FormControl)
    {
        console.log(
            GenderHelper.all().indexOf(control.value),
            control.value
        );

        if (control.value && GenderHelper.all().indexOf(control.value) < 0) {
            return { invalidGender: true };
        }

        return null;
    }
}
