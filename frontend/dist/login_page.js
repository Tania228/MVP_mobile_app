/*
Файл с логикой для входа
*/
import { login } from './api_client.js';
import { saveUser } from './storage.js';
export default class LoginPage {
    constructor() {
        this.form = null;
        this.emailInput = null;
        this.passwordInput = null;
    }
    render() {
        const template = document.getElementById('login-template');
        const app = document.getElementById('app');
        app.innerHTML = '';
        const clone = template.content.cloneNode(true);
        app.appendChild(clone);
        this.form = document.querySelector('.container-for-login');
        this.emailInput = document.querySelector('.email-mobile');
        this.passwordInput = document.querySelector('.password-mobile');
        this.attachEvents();
    }
    attachEvents() {
        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
    }
    clearError() {
        const oldError = this.form?.querySelector('.error-message');
        if (oldError) {
            oldError.remove();
        }
    }
    showError(message) {
        this.clearError();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        this.form?.appendChild(errorDiv);
    }
    async handleLogin() {
        const email = this.emailInput?.value.trim() || '';
        const password = this.passwordInput?.value.trim() || '';
        if (!email || !password) {
            this.showError('Для входа заполните все поля!');
            return;
        }
        try {
            const data = await login(email, password);
            if (data.success && data.user) {
                saveUser(data.user);
                console.log('Вход выполнен.');
            }
            else {
                this.showError(data.error || 'Неверный логин или пароль.');
            }
        }
        catch (e) {
            this.showError(`Произошла ошибка: ${e}`);
            console.error(e);
        }
    }
}
