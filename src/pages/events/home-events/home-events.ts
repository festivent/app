import {Component} from '@angular/core';
import {IonicPage, ModalController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {Event} from "../../../models/event";
import {ShowEventPage} from "../show-event/show-event";

@IonicPage()
@Component({
    selector: 'page-home-events',
    templateUrl: 'home-events.html',
})
export class HomeEventsPage
{
    public events: Event[] = [];

    constructor(private auth: AuthProvider, private modalCtrl: ModalController) {}

    ionViewDidLoad() {
        this.initializeEvents();
    }

    public openEvent(event: Event): void
    {
        this.modalCtrl.create(ShowEventPage, {
            id: event.id
        }).present();
    }

    private initializeEvents(): void
    {
        this.auth.request('GET', 'events').then(response => {
            this.events = response.data;
        });
    }
}
