import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Form} from "../../../models/former/form";

@IonicPage()
@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html',
})
export class CreateEventPage
{
    public createForm: Form;

    constructor() {
        this.createForm = {
            action: 'events/create',
            method: 'POST',
            submitText: 'Oluştur',
            fields: [
                {
                    name: 'title',
                    type: 'text'
                },
                {
                    name: 'description',
                    type: 'textarea'
                },
                {
                    name: 'image',
                    type: 'image'
                },
                {
                    name: 'started_at',
                    type: 'datetime',
                    displayFormat: 'DD/MM/YYYY HH:mm'
                },
                {
                    name: 'ended_at',
                    type: 'datetime',
                    displayFormat: 'DD/MM/YYYY HH:mm'
                },
                {
                    name: 'price',
                    type: 'number'
                },
                {
                    name: 'capacity',
                    type: 'number'
                },
                {
                    name: 'age_limit',
                    type: 'number'
                }
            ]
        };
    }
}
