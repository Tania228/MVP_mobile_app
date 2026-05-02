/*
Файл для работы с localStorage
(сохранение пользователя, сообщений,
/очистка кэша)
*/
export function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}
export function getUser() {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
}
export function clearCache() {
    localStorage.clear();
}
