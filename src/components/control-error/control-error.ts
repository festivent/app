import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'control-error',
    templateUrl: 'control-error.html'
})
export class ControlErrorComponent
{
    @Input() private form: FormGroup;
    @Input() private name: string;

    public error: string;

    constructor (private translate: TranslateService) {}

    ngOnInit()
    {
        this.form.controls[this.name].statusChanges.subscribe(() => {
            if (this.form.controls[this.name].invalid) {
                this.error = this.getError();
            } else {
                this.hide();
            }
        });
    }

    /**
     * Get error.
     *
     * @returns {string}
     */
    private getError(): string
    {
        for (let error in this.form.controls[this.name].errors) {
            return error;
        }

        return null;
    }

    /**
     * Get the error text.
     *
     * @returns {Observable<string | any>}
     */
    private text(): Observable<string>
    {
        return this.translate.get(`validation.${this.getError()}`, {
            attribute: this.translate.get(`attributes.${this.name}`)
        });
    }

    /**
     * Hide the component.
     */
    private hide()
    {
        console.log('hide', this.form.controls[this.name]);
        this.error = null;
    }
}
