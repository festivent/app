import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {Event} from "../../../models/event";
import {AuthProvider} from "../../../providers/auth/auth";

@IonicPage()
@Component({
    selector: 'page-search-events',
    templateUrl: 'search-events.html',
})
export class SearchEventsPage
{
    public resultEvents: Event[] = [];

    constructor(private auth: AuthProvider)
    {

    }

    ionViewDidLoad()
    {
        console.log('ionViewDidLoad SearchEventsPage');
    }

    public searchEvents(event): void
    {
        let query = event.target.value;

        this.resultEvents = [];
        if (query && query.length >= 3) {
            this.auth.request('GET', 'events/search', {
                query: query
            }).then(response => {
                this.resultEvents = response.data;
            });
        }
    }
}
