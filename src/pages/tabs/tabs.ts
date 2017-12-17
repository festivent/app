import {Component} from '@angular/core';
import {UserHomePage} from "../user/user-home/user-home";
import {HomeEventsPage} from "../events/home-events/home-events";
import {SearchEventsPage} from "../events/search-events/search-events";
import {CreateEventPage} from "../events/create-event/create-event";

@Component({
    templateUrl: 'tabs.html'
})
export class TabsPage {
    public homeEventsPage = HomeEventsPage;
    public searchEventsPage = SearchEventsPage;
    public createEventPage = CreateEventPage;
    public userPage = UserHomePage;
}
