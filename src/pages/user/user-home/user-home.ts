import {Component} from '@angular/core';
import {IonicPage} from 'ionic-angular';
import {ManageProvincesPage} from "../manage-provinces/manage-provinces";
import {ManageCategoriesPage} from "../manage-categories/manage-categories";
import {AuthProvider} from "../../../providers/auth/auth";


@IonicPage()
@Component({
    selector: 'page-user-home',
    templateUrl: 'user-home.html',
})
export class UserHomePage
{
    public manageProvincesPage: any;
    public manageCategoriesPage: any;

    public constructor(private auth: AuthProvider)
    {
        this.manageProvincesPage = ManageProvincesPage;
        this.manageCategoriesPage = ManageCategoriesPage;
    }

    public doLogout()
    {
        this.auth.logout();
    }
}
