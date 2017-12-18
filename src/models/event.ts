import {CarbonDatetime} from "./carbon-datetime";
import {Organizer} from "./organizer";
import {Address} from "./address";

export interface Event {
    id?: number,
    key?: string,
    title: string,
    description: string,
    image: string,
    started_at: CarbonDatetime | string,
    ended_at: CarbonDatetime | string,
    price: number,
    price_type: string,
    capacity: number,
    age_limit: number,
    organizer?: Organizer,
    address?: Address,
    user_id?: number,
    organizer_id?: number,
    address_id?: number
}