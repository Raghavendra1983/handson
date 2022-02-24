
export interface User {
    email: string,
    id: number,
    token: any;
}
export interface LoginInitValuesType {
    email: string,
    password: string,
    serverError?: string
}
