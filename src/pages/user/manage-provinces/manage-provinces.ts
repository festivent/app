import {Component} from '@angular/core';
import {IonicPage, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {Province} from "../../../models/province";

@IonicPage()
@Component({
    selector: 'page-manage-provinces',
    templateUrl: 'manage-provinces.html',
})
export class ManageProvincesPage
{
    public userProvinces: Province[] = [];
    public resultProvinces: Province[] = [];
    public isSearching: boolean = false;
    private availableProvinces: Province[] = [];

    constructor(private auth: AuthProvider, private loadingCtrl: LoadingController)
    {
        this.initializeProvinces();
    }

    /**
     * Initialize provinces.
     */
    private initializeProvinces(): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('GET', 'users/me/provinces').then(result => {
            this.userProvinces = result.data;

            this.auth.request('GET', 'provinces').then(result => {
                this.availableProvinces = result.data;
                loading.dismiss();
            }).catch(() => loading.dismiss());
        }).catch(() => loading.dismiss());
    }

    public searchProvinces(event: any): void
    {
        this.isSearching = true;

        this.resultProvinces = this.availableProvinces.filter(province => {
            return this.userProvinces.indexOf(province) < 0;
        });

        let val = event.target.value;
        if (val && val.trim() != '') {
            this.resultProvinces = this.resultProvinces.filter((province) => {
                return (province.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    }

    public cancelSearch(): void
    {
        this.isSearching = false;
    }

    public addProvince(province: Province): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('POST', 'users/me/provinces/create', {
            'province_id': province.id
        }).then(() => {
            this.userProvinces.push(province);
            this.isSearching = false;

            loading.dismiss();
        }).catch(() => loading.dismiss());
    }

    public deleteProvince(province: Province): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('DELETE', `users/me/provinces/${province.id}`).then(() => {
            let index = this.userProvinces.indexOf(province);
            if (index > -1) {
                this.userProvinces.splice(index, 1);
            }

            loading.dismiss();
        }).catch(() => loading.dismiss());
    }
}
