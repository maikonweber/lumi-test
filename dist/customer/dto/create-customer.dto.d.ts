export declare class CreateCustomerDto {
    username: string;
    password: string;
    email: string;
}
export declare class LoginCustomerDto {
    email: string;
    password: string;
}
export declare class SessionCookieDto {
    value: string;
    userid: number;
}
export declare class UserLogDto {
    userid: number;
    action: string;
}
