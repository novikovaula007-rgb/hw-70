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

export interface IContactInList {
    id: string,
    name: string,
    photo: string
}