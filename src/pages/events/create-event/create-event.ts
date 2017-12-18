import {Component} from '@angular/core';
import {IonicPage, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {Address} from "../../../models/address";
import {Province} from "../../../models/province";
import {County} from "../../../models/county";
import {Category} from "../../../models/category";
import {Event} from "../../../models/event";

@IonicPage()
@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html',
})
export class CreateEventPage
{
    public page: String = 'address';
    public searchingAddress: String;
    public showAddressForm: boolean = false;
    public selectedAddress: Address;
    public provinces: Province[] = [];
    public counties: County[] = [];
    public categories: Category[] = [];
    public selectedCategories: Category[] = [];
    public clickedCategory: Category;
    public event: Event;

    constructor(private auth: AuthProvider, private loadingCtrl: LoadingController) {
        this.event = {
            title: null,
            description: null,
            image: null,
            started_at: null,
            ended_at: null,
            price: null,
            price_type: null,
            capacity: null,
            age_limit: null,
            user_id: null,
            organizer_id: null,
            address_id: null
        };
    }

    ionViewDidLoad()
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('GET', 'categories').then(response => {
            this.categories = response.data;
            loading.dismiss();
        });
    }

    public showCreateAddressForm(): void
    {
        this.fillProvincesIfNotFilled().then(() => {
            this.selectedAddress = {
                name: null,
                address: null,
                hint: null,
                province_id: null,
                county_id: null
            };

            this.showAddressForm = true;
        });
    }

    private fillProvincesIfNotFilled(): Promise<Province[]>
    {
        return new Promise(resolve => {
            if (!this.provinces.length) {
                let loading = this.loadingCtrl.create();
                loading.present();

                this.auth.request('GET', 'provinces').then(response => {
                    this.provinces = response.data;
                    resolve(this.provinces);
                    loading.dismiss();
                });
            } else {
                resolve();
            }
        });
    }

    public selectedProvince(): void
    {
        if (this.selectedAddress.province_id) {
            let loading = this.loadingCtrl.create();
            loading.present();

            this.auth.request('GET', `provinces/${this.selectedAddress.province_id}/counties`).then(response => {
                this.counties = response.data;
                loading.dismiss();
            });
        } else {
            this.counties = [];
        }
    }

    public isSelectedCategory(category: Category): boolean
    {
        return this.selectedCategories.indexOf(category) > -1;
    }

    public clickCategory(category: Category): void
    {
        let index = this.selectedCategories.indexOf(category);
        if (index > -1) {
            this.selectedCategories.splice(index, 1);
        } else {
            this.selectedCategories.push(category);
        }
    }

    public openCategory(category: Category): void
    {
        this.clickedCategory = category;
    }

    public cancelCategory(): void
    {
        this.clickedCategory = null;
    }

    public canSubmit(): boolean
    {
        return this.isFilledAddressFields() && this.isFilledEventFields() && this.isSelectedAnyCategory();
    }

    public isFilledAddressFields(): boolean
    {
        return !!(
            this.selectedAddress &&
            this.selectedAddress.name && this.selectedAddress.address &&
            this.selectedAddress.province_id && this.selectedAddress.county_id
        );
    }

    public isFilledEventFields(): boolean
    {
        return !!(
            this.event &&
            this.event.title && this.event.started_at
        );
    }

    public isSelectedAnyCategory(): boolean
    {
        return this.selectedCategories.length > 0;
    }
}
