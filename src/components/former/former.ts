import {Component, Input} from '@angular/core';
import {Form} from "../../models/former/form";
import {TranslateService} from "@ngx-translate/core";
import {LoadingController} from "ionic-angular";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthProvider} from "../../providers/auth/auth";

@Component({
    selector: 'former',
    templateUrl: 'former.html'
})
export class FormerComponent
{
    @Input() form: Form;

    public placeholders: string[] = [];
    public ready: boolean = false;
    public errors: {[name: string]: string} = {};

    public constructor(
        private translate: TranslateService,
        private loading: LoadingController,
        private auth: AuthProvider
    ) {}

    ngOnInit()
    {
        if (typeof this.form.model === 'undefined') {
            this.form.model = {};
        }

        this.form.fields.forEach(field => {
            this.placeholders[field.name] = field.name;

            if (typeof this.form.model[field.name] === 'undefined') {
                this.form.model[field.name] = null;
            }

            this.translate.get(`attributes.${field.name}`).subscribe(placeholder => {
                this.placeholders[field.name] = placeholder;
            })
        });

        this.ready = true;
    }

    public submit(): void
    {
        this.clear();
        let loading = this.loading.create();
        loading.present();

        this.auth.request(this.form.method, this.form.action, this.form.model).then(repsonse => {
            loading.dismiss().then(() => {
                if (typeof this.form.success !== 'undefined') {
                    this.form.success(repsonse);
                }
            });
        }).catch(response => {
            loading.dismiss().then(() => {
                if (typeof this.form.error !== 'undefined') {
                    this.form.error(response);
                }

                console.log(response);

                if (response instanceof HttpErrorResponse) {
                    if (response.error && typeof response.error.errors !== 'undefined') {
                        for (let name in response.error.errors) {
                            this.errors[name] = response.error.errors[name][0];
                        }
                    }
                }
            });
        });
    }

    public hasError(name: string): boolean
    {
        if (typeof this.errors[name] === 'undefined') {
            return false;
        }

        return true;
    }

    protected clear(): void
    {
        this.errors = {};
    }
}
