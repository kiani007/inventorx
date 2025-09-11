export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
}

export class UserEntity implements User {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public role: UserRole = UserRole.USER,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  isAdmin(): boolean {
    return this.role === UserRole.ADMIN;
  }

  updateProfile(name: string, email: string): void {
    this.name = name;
    this.email = email;
    this.updatedAt = new Date();
  }

  changeRole(newRole: UserRole): void {
    this.role = newRole;
    this.updatedAt = new Date();
  }
}