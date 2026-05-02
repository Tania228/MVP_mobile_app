/*
Файл для отправки запросов на бэкенд
(вход, получение ии-агентов, отпрака сообщений)
*/
const BASE_URL = 'http://localhost:8000/api';
export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
