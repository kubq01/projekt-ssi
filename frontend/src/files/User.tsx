// @ts-ignore
import {Favourites} from "./Favourites.tsx";
import {type} from "@testing-library/user-event/dist/type";

export type User = {
    id: number,
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    login: String,
    password: String,
    email: String,
    role: String,
    favourites: Favourites[],
    isUserBlocked: Boolean,
}
