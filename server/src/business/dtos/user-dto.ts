export class UserDto {
    login: string;
    id: number;
    role: string;

    constructor(model: any) {
        this.id = model.userID;
        this.login = model.login;
        this.role = model.role
    }
}