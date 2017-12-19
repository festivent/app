import {Organizer} from "./organizer";
import {Address} from "./address";

export interface Event {
    id?: number,
    key?: string,
    title: string,
    description: string,
    image: string,
    started_at: any,
    ended_at: any,
    price: number,
    price_type: string,
    capacity: number,
    age_limit: number,
    organizer?: Organizer,
    address?: Address,
    user_id?: number,
    organizer_id?: number,
    address_id?: number,
    category_ids?: number[]
}