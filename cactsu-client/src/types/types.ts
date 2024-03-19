export interface IUser {
    id: number;
    phoneNumber: string;
    token: string;
}

export interface IUserData {
    phoneNumber: string;
    name: string;
    surname: string;
    username : string;
    password: string;
}

export interface IResponseUser {
    phoneNumber: string;
    name: string;
    surname: string;
    username : string;
    password: string;
    id: string;
}

export interface IResponseUserData { 
    token: string;
    user: IResponseUser;
}