export interface IContact {
    id: string,
    name: string,
    email: string,
    phone: string,
    photo: string
}

export interface IContactMutation {
    name: string,
    email: string,
    phone: string,
    photo: string
}

export interface IContactAPI {
    [key: string]: IContactMutation
}