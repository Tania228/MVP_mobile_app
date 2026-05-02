/* 
Файл для работы с localStorage
(сохранение пользователя, сообщений, 
/очистка кэша)
*/

import type { User } from './api_client.js';

export function saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(): User | null {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
}

export function clearCache(): void {
    localStorage.clear();
}