export interface SystemPermissions {
    is_admin: boolean;
}

export class User {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    permissions: SystemPermissions;

    public isAdmin(): boolean {
        return this.permissions.is_admin;
    }
}
