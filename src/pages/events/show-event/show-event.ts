import {Component} from '@angular/core';
import {LoadingController, NavParams, ViewController} from 'ionic-angular';
import {Event} from "../../../models/event";
import {AuthProvider} from "../../../providers/auth/auth";

@Component({
    selector: 'page-show-event',
    templateUrl: 'show-event.html',
})
export class ShowEventPage
{
    private id: number;
    public event: Event = {
        title: null,
        description: null,
        image: null,
        started_at: null,
        ended_at: null,
        price: null,
        price_type: null,
        capacity: null,
        age_limit: null
    };

    constructor(
        private navParams: NavParams,
        private auth: AuthProvider,
        private loadingCtrl: LoadingController,
        private viewCtrl: ViewController)
    {}

    ionViewDidLoad()
    {
        this.id = this.navParams.get('id');
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('GET', `events/${this.id}`).then(response => {
            this.event = response.data;
            loading.dismiss();
        }).catch(() => loading.dismiss());
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
