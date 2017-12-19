import {County} from "./county";
import {Province} from "./province";

export interface Address {
    id?: number,
    name: string,
    address: string,
    hint?: string,
    province_id: number,
    county_id: number,
    county?: County,
    province?: Province
}