import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {Address} from "../../../models/address";
import {Province} from "../../../models/province";
import {County} from "../../../models/county";
import {Category} from "../../../models/category";
import {Event} from "../../../models/event";
import {HttpErrorResponse} from "@angular/common/http";
import {ValidationErrors} from "../../../models/validation-errors";
import * as moment from "moment";

@IonicPage()
@Component({
    selector: 'page-create-event',
    templateUrl: 'create-event.html',
})
export class CreateEventPage
{
    public page: String = 'address';
    public showAddressForm: boolean = false;
    public selectedAddress: Address;
    public provinces: Province[] = [];
    public counties: County[] = [];
    public categories: Category[] = [];
    public selectedCategories: Category[] = [];
    public clickedCategory: Category;
    public event: Event;
    public errors: ValidationErrors = {};
    public resultAddresses: Address[] = [];

    constructor(
        private auth: AuthProvider,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) {
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
            (this.selectedAddress.id || (
                this.selectedAddress.name && this.selectedAddress.address &&
                this.selectedAddress.province_id && this.selectedAddress.county_id
            ))
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

    public submit(): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.errors = {};

        if (!this.selectedAddress.id) {
            this.auth.request('POST', 'addresses/create', this.selectedAddress).then(response => {
                this.selectedAddress = response.data;

                this.submitEvent(loading);
            }).catch(response => {
                this.parseErrors(response, 'address');
                loading.dismiss();
            });
        } else {
            this.submitEvent(loading);
        }
    }

    private submitEvent(loading: Loading): void
    {
        let event: Event = { ...this.event };
        event.address_id = this.selectedAddress.id;
        event.started_at = moment(event.started_at).format();

        if (event.ended_at) {
            event.ended_at = moment(event.ended_at).format();
        }

        event.category_ids = [];
        for (let category of this.selectedCategories) {
            event.category_ids.push(category.id);
        }

        this.auth.request('POST', 'events/create', event).then(response => {
            this.event = response.data;

            loading.dismiss().then(() => {
                let alert = this.alertCtrl.create({
                    title: 'Oluşturuldu!',
                    subTitle: `${this.event.title} isimli etkinliğiniz başarıyla oluşturuldu`
                });

                alert.addButton({
                    text: 'Tamam',
                    handler: () => {
                        // TODO: Implement the show event page.
                    }
                });

                alert.present();
            });
        }).catch(response => {
            this.parseErrors(response);
            loading.dismiss();
        });
    }

    private parseErrors(response: any, prefix: string = null) {
        if (response instanceof HttpErrorResponse) {
            if (response.error && typeof response.error.errors !== undefined) {
                for (let name in response.error.errors) {
                    for (let error of response.error.errors[name]) {
                        this.errors[prefix ? `${prefix}.${name}` : name] = error;
                        break;
                    }
                }
            }
        }
    }

    public hasError(name: string): boolean
    {
        return !!this.errors[name];
    }

    public cancelAddress(): void
    {
        this.selectedAddress = null;
        this.showAddressForm = false;
    }

    public selectAddress(address: Address): void
    {
        this.fillProvincesIfNotFilled().then(() => {
            this.selectedAddress = address;
            this.showAddressForm = true;
        });
    }

    public searchAddresses(event): void
    {
        this.resultAddresses = [];
        let query = event.target.value;

        if (query && query.length >= 3) {
            this.auth.request('GET', 'addresses/search', {
                query: query
            }).then(result => {
                this.resultAddresses = result.data;
            });
        }
    }
}
