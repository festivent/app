import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from "@ionic/storage";
import {User} from "../../models/user";
import {ApiResponse} from "../../models/responses/api-response";
import {Observable} from "rxjs/Observable";
import {Subscriber} from "rxjs/Subscriber";

@Injectable()
export class AuthProvider {
    /**
     * API Endpoint url.
     *
     * @type {string}
     */
    public static API: string = 'http://festivent.kodizm.com/api/';

    /**
     * The auth status observable.
     */
    public observable: Observable<boolean>;

    /**
     * The token and user data.
     */
    private token: string;
    private user: User;

    /**
     * The storage key of token.
     * @type {string}
     */
    private static TOKEN_KEY = 'token';

    /**
     * The storage key of user.
     * @type {string}
     */
    private static USER_KEY = 'user';

    /**
     * The auth status subscriber.
     */
    private observer: Subscriber<boolean>;

    /**
     * Auth provider.
     *
     * @param {Storage} storage
     * @param {HttpClient} http
     */
    constructor(
        private storage: Storage,
        private http: HttpClient
    ) {
        this.observable = new Observable<boolean>(observer => this.observer = observer);
    }

    public refresh(): Promise<User>
    {
        return new Promise((resolve, reject) => {
            this.request('GET', 'users/me').then(response => {
                this.setUser(response.data);
            }).catch(() => {
                this.logout();
                reject();
            });
        });
    }

    public setToken(token: string): void
    {
        this.storage.set(AuthProvider.TOKEN_KEY, token);
        this.token = token;

        this.observer.next(true);
    }

    public setUser(user: User): void{
        this.storage.set('user', user);
        this.user = user;
    }

    public getToken(): string
    {
        return this.token;
    }

    public logout()
    {
        this.token = null;
        this.user = null;

        this.storage.remove(AuthProvider.TOKEN_KEY);
        this.storage.remove(AuthProvider.USER_KEY);

        this.observer.next(false);
    }

    public reload(): Promise<boolean>
    {
        return new Promise(resolve => {
            this.storage.get(AuthProvider.TOKEN_KEY).then(token => {
                if (token) {
                    this.storage.get(AuthProvider.USER_KEY).then(user => {
                        if (user) {
                            this.token = token;
                            this.user = user;

                            // Resolve the loading but start to refresh.
                            this.observer.next(true);
                            resolve(true);

                            this.refresh();
                        } else {
                            this.logout();
                            resolve(false);
                        }
                    });
                } else {
                    this.logout();
                    resolve(false);
                }
            });
        });
    }

    public check(): boolean {
        return !!this.token;
    }

    /**
     * Send a request.
     *
     * @param {string} method
     * @param {string} uri
     * @param data
     * @returns {Promise<Object>}
     */
    public request(method: string, uri: string, data?: any): Promise<ApiResponse>
    {
        return new Promise((resolve, reject) => {
            let options = {
                body: data ? data : {},
                headers: {}
            };

            if (this.check()) {
                options.headers['Authorization'] = `Bearer ${this.token}`;
            }

            this.http.request(method, AuthProvider.API + uri, options).toPromise().then((response: ApiResponse) => {
                resolve(response);
            }).catch(error => {
                // TODO: Implement refresh token request.

                reject(error);
            });
        });
    }
}
