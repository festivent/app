import {User} from "../user";

export interface AuthResponse {
    data: User,
    token: string
}