import {Component} from '@angular/core';
import {IonicPage, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../../providers/auth/auth";
import {Category} from "../../../models/category";

@IonicPage()
@Component({
    selector: 'page-manage-categories',
    templateUrl: 'manage-categories.html',
})
export class ManageCategoriesPage {

    public userCategories: Category[] = [];
    public categories: Category[] = [];
    public clickedCategory: Category;

    constructor(private auth: AuthProvider, private loadingCtrl: LoadingController) {}

    ionViewDidLoad()
    {
        this.initializeCategories();
    }

    /**
     * Initialize categories.
     */
    private initializeCategories(): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('GET', 'users/me/categories').then(result => {
            this.userCategories = result.data;

            this.auth.request('GET', 'categories').then(result => {
                this.categories = result.data;
                loading.dismiss();
            }).catch(() => loading.dismiss());
        }).catch(() => loading.dismiss());
    }

    public clickCategory(category: Category): void
    {
        this.clickedCategory = category;
    }

    public cancelCategory(): void
    {
        this.clickedCategory = null;
    }

    public addCategory(category: Category): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('POST', 'users/me/categories/create', {
            'category_id': category.id
        }).then(() => {
            this.userCategories.push(category);

            loading.dismiss();
        }).catch(() => loading.dismiss());
    }

    public deleteCategory(category: Category): void
    {
        let loading = this.loadingCtrl.create();
        loading.present();

        this.auth.request('DELETE', `users/me/categories/${category.id}`).then(() => {
            let index = this.userCategories.indexOf(category);
            if (index > -1) {
                this.userCategories.splice(index, 1);
            }

            loading.dismiss();
        }).catch(() => loading.dismiss());
    }
}
