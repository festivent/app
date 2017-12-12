import {FormGroup} from '@angular/forms';

export class ConfirmedValidator
{
    static isValid(firstName: string, secondName: string)
    {
        return (group: FormGroup) => {
            let firstInput = group.controls[firstName];
            let secondInput = group.controls[secondName];

            if (firstInput.value && secondInput.value && firstInput.value !== secondInput.value) {
                return secondInput.setErrors({
                    notConfirmed: true
                });
            }

            return secondInput.setErrors(null);
        }
    }
}
