/*
Файл для отправки запросов на бэкенд
(вход, получение ии-агентов, отпрака сообщений)
*/
const BASE_URL = '/api';
export async function login(email, password) {
    const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}
export async function getMyEmployees() {
    const response = await fetch(`${BASE_URL}/my-employees/`);
    return response.json();
}
export async function getReadyEmployees() {
    const response = await fetch(`${BASE_URL}/ready-employees/`);
    return response.json();
}
export async function sendMessageToBot(message) {
    const response = await fetch(`${BASE_URL}/chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    });
    return response.json();
}
