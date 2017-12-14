import {TranslateLoader} from "@ngx-translate/core";
import {Observable} from "rxjs/Observable";
import {tr} from "../langs/tr";

export class AppTranslateLoader implements TranslateLoader
{
    /**
     * Get translation loader.
     *
     * @param {string} lang
     * @returns {Observable<any>}
     */
    public getTranslation(lang: string): Observable<any>
    {
        return Observable.create(observer => {
            observer.next(tr);
            observer.complete();
        });
    }
}