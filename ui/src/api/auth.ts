import $http from './http';
export enum UserRole{
  ADMIN = 'ADMIN',
  USER = 'USER'
}
export interface LoginData {
  token: string;
  email: string;
  role: UserRole;
  displayName: string;
}
export async function login(email: string):Promise<LoginData> {
  return await $http.post('/users/login', {
    data: {
      email
    }
  })
}

export async function ifAuthThenRenew():Promise<LoginData> {
  return await $http.get('/users/if-auth-then-renew')
}